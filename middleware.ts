import { NextRequest, NextResponse } from "next/server";
import { I18N_CONFIG, isValidLocale } from "@/i18n/config";

function getPreferredLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) return cookieLocale;
  return I18N_CONFIG.defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  const segments = pathname.split("/");
  const pathnameLocale = segments[1];

  if (isValidLocale(pathnameLocale)) {
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
    if (pathnameLocale !== cookieLocale) {
      const response = NextResponse.next();
      response.cookies.set("NEXT_LOCALE", pathnameLocale, {
        path: "/",
        maxAge: 31536000,
        sameSite: "lax",
      });
      return response;
    }
    return NextResponse.next();
  }

  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon\\.ico).*)"],
};
