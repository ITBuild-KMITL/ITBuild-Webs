
export async function GET() {
    return Response.json({ status: 'ok', environment: process.env.NEXTJS_ENV });
}
