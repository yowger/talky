import logger from "@/config/logger"
import webhook from "@/config/webhook"

import {
    BadRequestError,
    ConflictError,
    NotFoundError,
} from "@/handler/api-errors"

import {
    createUser,
    deleteUser,
    updateUser,
    updateUserStatus,
} from "@/service/user-service"

import { UserStatus } from "@/types/user-types"

import type { Request, Response } from "express"
import type { WebhookEvent } from "@clerk/clerk-sdk-node"

type ExtendedRequest = Request<{}, {}, WebhookEvent>

export async function clerkWebHooksHandler(
    req: ExtendedRequest,
    res: Response
) {
    const headers = req.headers
    const payload = req.body

    const svixId = headers["svix-id"] as string
    const svixTimestamp = headers["svix-timestamp"] as string
    const svixSignature = headers["svix-signature"] as string

    if (!svixId || !svixTimestamp || !svixSignature) {
        throw new BadRequestError("No svix headers")
    }

    let evt: WebhookEvent

    try {
        evt = webhook.verify(JSON.stringify(payload), {
            "svix-id": svixId,
            "svix-timestamp": svixTimestamp,
            "svix-signature": svixSignature,
        }) as WebhookEvent
    } catch (err) {
        logger.error(
            {
                error: {
                    message: err.message,
                    stack: err.stack,
                },
                webhook: {
                    payload,
                    svix: {
                        id: svixId,
                        timestamp: svixTimestamp,
                    },
                },
            },
            `Error verifying webhook for id: ${svixId}`
        )

        throw new BadRequestError("Failed to verify webhook")
    }

    const eventType = evt.type

    switch (eventType) {
        case "user.created": {
            const { id, username, image_url } = evt.data

            try {
                await createUser({
                    clerkId: id,
                    username,
                    imageUrl: image_url,
                })
            } catch (error) {
                throw new ConflictError(
                    "Failed to create user. User already exists"
                )
            }

            break
        }
        case "user.updated": {
            const { id, username, image_url } = evt.data

            const updatedUser = await updateUser(id, {
                username,
                imageUrl: image_url,
            })

            if (!updatedUser) {
                throw new NotFoundError("Failed to update user. User not found")
            }

            break
        }
        case "user.deleted": {
            const { id } = evt.data

            const deletedUser = await deleteUser(id)

            if (!deletedUser) {
                throw new NotFoundError("Failed to delete user. User not found")
            }

            break
        }
        case "session.created": {
            const { id } = evt.data

            const updatedUserSession = await updateUserStatus(
                id,
                UserStatus.ONLINE
            )

            if (!updatedUserSession) {
                throw new NotFoundError(
                    "Failed to update user session. User not found"
                )
            }

            break
        }
        case "session.ended":
        case "session.removed":
        case "session.revoked": {
            const { id } = evt.data

            const updatedUserSession = await updateUserStatus(
                id,
                UserStatus.OFFLINE
            )

            if (!updatedUserSession) {
                throw new NotFoundError(
                    "Failed to update user session. User not found"
                )
            }

            break
        }
        default:
            logger.warn(
                {
                    webhook: {
                        event: eventType,
                        payload: evt.data,
                    },
                },
                `Webhook event type not supported: ${eventType} received`
            )

            break
    }

    return res.status(200).json({
        message: "Webhook received",
    })
}

// might cached with redis in future probably.. ?
