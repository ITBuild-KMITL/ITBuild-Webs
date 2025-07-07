import { auth } from "@/../../better-auth.config";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    basePath: process.env.BETTER_AUTH_URL,
    plugins: [inferAdditionalFields<typeof auth>()]
})