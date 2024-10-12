import { NextRequest, NextResponse } from "next/server";
import { NOPREFIX_HEADER } from "./i18n/config";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing.public";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isNextCookieRoute =
    pathname !== "/" &&
    !pathname.startsWith("/en-US") &&
    !pathname.startsWith("/es-MX");

  const intlMiddleware = createMiddleware(routing);

  if (isNextCookieRoute) {
    request.headers.set(NOPREFIX_HEADER, "true");
    return NextResponse.next({ request: { headers: request.headers } });
  } else {
    return intlMiddleware(request);
  }
}
