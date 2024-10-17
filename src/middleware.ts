import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./lib/session";

const AUTH_REDIRECTS = ["/auth/login", "/auth/signup", "/auth/forgot-password"];

const AUTH_REQUIRED = ["/account", "/rate-my-po/new"];

export async function middleware(request: NextRequest) {
  if (AUTH_REQUIRED.includes(request.nextUrl.pathname)) {
    const user = await getUser();
    if (!user) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (AUTH_REDIRECTS.includes(request.nextUrl.pathname)) {
    const user = await getUser();
    if (user) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: "/((?!api|_next/static|favicon.ico|images).*)",
};
