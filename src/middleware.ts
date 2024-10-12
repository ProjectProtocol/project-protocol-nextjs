import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./lib/session";
import { NOPREFIX_HEADER } from "./i18n/config";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isNextCookieRoute = pathname !== "/beebee";

  const intlMiddleware = createMiddleware(routing);

  if (isNextCookieRoute) {
    request.headers.set(NOPREFIX_HEADER, "true");
    return NextResponse.next({ request: { headers: request.headers } });
  } else {
    return intlMiddleware(request);
  }
}
