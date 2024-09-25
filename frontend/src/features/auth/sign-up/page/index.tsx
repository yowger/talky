import { AuthPaths } from "@/routes/constants/paths"

import { SignUp } from "@clerk/clerk-react"

export default function SignUpPage() {
    return <SignUp path={AuthPaths.REGISTER} />
}
