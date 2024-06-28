import { type NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
	if (!req.nextUrl.pathname.startsWith("/api")) {
		// This logic is only applied to /about
		return NextResponse.next();
	}

	const basicAuth = req.headers.get("authorization");
	if (basicAuth) {
		const auth = basicAuth.split(" ")[1];
		const [user, pwd] = atob(auth).split(":");

		if (user === process.env.ADMIN_USER && pwd === process.env.ADMIN_PASSWD) {
			return NextResponse.next();
		}
	}

	return NextResponse.json({ message: "Auth required" }, { status: 401 });
}
