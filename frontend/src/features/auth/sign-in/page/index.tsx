import { SignIn } from "@clerk/clerk-react"

import { AuthPaths } from "@/routes/constants/paths"

export default function SignInPage() {
    return (
        <div className="">
            <SignIn path={AuthPaths.LOGIN} />
        </div>
    )
}
