import { auth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";
import { getCloudflareContext } from "@opennextjs/cloudflare"

const { env} = getCloudflareContext();


export const { POST, GET } = toNextJsHandler(auth(env));

export const runtime = "edge"; // Use edge runtime for Cloudflare Workers