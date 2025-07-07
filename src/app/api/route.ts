import { getRequestContext } from "@cloudflare/next-on-pages";

export async function GET() {
    const { env } = getRequestContext();
    return Response.json({ status: 'ok', environment: env.NEXTJS_ENV });
}

export const runtime = "edge";
