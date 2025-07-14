import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);

	const { pathname } = request.nextUrl
	if(pathname === "/account"){
		return NextResponse.next()
	}
	if (!sessionCookie) {
		return NextResponse.redirect(new URL("/account", request.url));
	}
}

export const config = {
	matcher: ["/account/:path*"],
}