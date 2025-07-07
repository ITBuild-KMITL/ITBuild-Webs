
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { betterAuth } from 'better-auth';
import { account, session, user, verification } from '@/db/schema';

const { DATABASE_URL, BETTER_AUTH_URL, BETTER_AUTH_SECRET } = process.env;

const sql = neon(DATABASE_URL!);
const db = drizzle(sql);

export const auth = betterAuth({
    database: drizzleAdapter(db, { provider: 'pg', schema: { user, account, session, verification } }),
    baseURL: BETTER_AUTH_URL,
    secret: BETTER_AUTH_SECRET,
    user: {
        additionalFields: {
            firstNameTH: {
                type: "string",
                required: false
            },
            lastNameTH: {
                type: "string",
                required: false
            },
            firstNameEN: {
                type: "string",
                required: false
            },
            lastNameEN: {
                type: "string",
                required: false
            },
            role: {
                type: "string",
                defaultValue: "member",
                input: false
            },
            stdId: {
                type: "string",
                required: false
            },
            major: {
                type: "string",
                required: false
            },
            registered: {
                type: "boolean",
                defaultValue: false
            }
        }
    },
});