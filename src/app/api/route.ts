
export async function GET() {
    return Response.json({ status: 'ok', environment: process.env.NEXTJS_ENV });
}

export const runtime = 'edge'; // Use edge runtime for better performance