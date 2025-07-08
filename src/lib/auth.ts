import { neon } from "@neondatabase/serverless";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/neon-http"
import { account, session, user, verification } from "@/db/schema";


const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)
export const auth = betterAuth({
        user: {
            additionalFields: {
                firstNameTH: {
                    type: "string",
                    required:false
                },
                lastNameTH: {
                    type: "string",
                    required:false
                },
                firstNameEN: {
                    type: "string",
                    required:false
                },
                lastNameEN: {
                    type: "string",
                    required:false
                },
                role: {
                    type: "string",
                    defaultValue: "member",
                    input:false
                },
                stdId: {
                    type: "string",
                    required:false
                },
                major: {
                    type: "string",
                    required:false
                },
                registered: {
                    type: "boolean",
                    defaultValue: false
                },
                year: {
                    type: "number",
                    required:false
                },
                phone: {
                    type: "string",
                    required:false
                },
            }
        },
        emailAndPassword: {
            enabled: false
        },
        baseURL: process.env.BETTER_AUTH_URL,
        secret: process.env.BETTER_AUTH_SECRET,
        database: drizzleAdapter(db, {
            provider: "pg",
            schema: {
                user,
                account,
                session,
                verification
            }
        }),
        socialProviders: {
            google: {
                clientId: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                mapProfileToUser: (profile) => {
                    const regex = /^\d{2}07\d{4}@kmitl\.ac\.th$/;
                    if (!regex.test(profile.email)) {
                        return {
                            stdId: null,
                            role: "guest",
                        }
                    }
                    return {
                        stdId: profile.email.split("@kmitl.ac.th")[0],
                        role: "member",
                        firstNameEN: profile.given_name,
                        lastNameEN: profile.family_name,
                    }
                },
            },
        },
    });

