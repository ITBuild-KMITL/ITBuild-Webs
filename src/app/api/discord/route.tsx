import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers"
import axios from "axios";
import { db } from "@/lib/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

interface DiscordUser {
    id?: string;
    username?: string;
    avatar?: string | null;
    discriminator?: string;
    public_flags?: number;
    flags?: number;
    banner?: string | null;
    accent_color?: number | null;
    global_name?: string | null;
    avatar_decoration_data?: any | null;
    collectibles?: any | null;
    display_name_styles?: any | null;
    banner_color?: string | null;
    clan?: {
        identity_guild_id?: string;
        identity_enabled?: boolean;
        tag?: string;
        badge?: string;
    } | null;
    primary_guild?: {
        identity_guild_id?: string;
        identity_enabled?: boolean;
        tag?: string;
        badge?: string;
    } | null;
    mfa_enabled?: boolean;
    locale?: string;
    premium_type?: number;
    email?: string;
    verified?: boolean;
}

export async function GET() {
    try {
        const { accessToken } = await auth.api.getAccessToken({
            body: {
                providerId: "discord",
            },
            headers: await headers()
        });

        const session = await auth.api.getSession({
            headers: await headers()
        })

        if(!session){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { user : userSession } = session
        const { id } = userSession

        const findUser = await db.select().from(user).where(eq(user.id, id))
        if(!findUser){
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        const response = await axios
        .get("https://discord.com/api/users/@me",
            {
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            }
        )
        const data : DiscordUser = response.data

        await db.update(user).set({
            discordId: data.id,
            discordAvaterImage: data.avatar,
            discordUsername: data.username,
            discordName: data.global_name,
            discordEmail:data.email,
            isDiscordConnect: true
        }).where(eq(user.id, findUser[0].id))

        return NextResponse.json({ success : true , accessToken })
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export const runtime = "edge"