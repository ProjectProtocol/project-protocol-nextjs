import { NextRequest, NextResponse } from "next/server";
import { NOPREFIX_HEADER } from "./i18n/config";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing.public";

const prefixRoutes = ["/en-US", "/es-MX", "/content", "/auth", "/rate-my-po"];

function matchPrefixRoutes(pathname: string) {
  if (pathname === "/") {
    return true;
  }

  for (const prefix of prefixRoutes) {
    if (pathname.startsWith(prefix)) {
      return true;
    }
  }
  return false;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isNextCookieRoute = !matchPrefixRoutes(pathname);

  const intlMiddleware = createMiddleware(routing);

  if (isNextCookieRoute) {
    request.headers.set(NOPREFIX_HEADER, "true");
    return NextResponse.next({ request: { headers: request.headers } });
  } else {
    return intlMiddleware(request);
  }
}
