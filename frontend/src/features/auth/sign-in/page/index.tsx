import {
    SignIn,
    // useSignIn
} from "@clerk/clerk-react"

import { AuthPaths } from "@/routes/constants/paths"

export default function SignInPage() {
    return (
        <div className="flex flex-1 min-h-screen  items-center justify-center m-auto">
            <SignIn path={AuthPaths.LOGIN} />
        </div>
    )
}
