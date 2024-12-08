import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { getUser } from "./lib/session";

const AUTH_REDIRECTS = ["/auth/login", "/auth/signup", "/auth/forgot-password"];
const AUTH_REQUIRED = ["/account", "/rate-my-po/new"];

function removeLocalePrefix(pathname: string) {
  return pathname.replace(/^\/(en-US|es-MX)/, "");
}

const intlMiddleware = createMiddleware(routing);
export async function middleware(request: NextRequest) {
  const strippedPathname = removeLocalePrefix(request.nextUrl.pathname);
  if (AUTH_REQUIRED.includes(strippedPathname)) {
    const user = await getUser();
    if (!user) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (AUTH_REDIRECTS.includes(strippedPathname)) {
    const user = await getUser();
    if (user) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher:
    "/((?!api|_next/static|favicon.ico|images|monitoring|sitemap|opengraph-image|manifest|icon).*)",
};
