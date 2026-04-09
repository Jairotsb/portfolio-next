import { NextRequest, NextResponse } from "next/server";
import { I18N_CONFIG, isValidLocale } from "@/i18n/config";

function getPreferredLocale(request: NextRequest): string {
  // 1. Check cookie preference
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) return cookieLocale;

  // 2. Parse Accept-Language header
  const acceptLang = request.headers.get("accept-language");
  if (acceptLang) {
    const preferred = acceptLang
      .split(",")
      .map((entry) => {
        const [lang, q] = entry.trim().split(";q=");
        return { lang: lang.split("-")[0].toLowerCase(), q: parseFloat(q ?? "1") };
      })
      .sort((a, b) => b.q - a.q)
      .find(({ lang }) => isValidLocale(lang));

    if (preferred) return preferred.lang;
  }

  return I18N_CONFIG.defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal paths
  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // Check if pathname already has a valid locale prefix
  const segments = pathname.split("/");
  const pathnameLocale = segments[1];

  if (isValidLocale(pathnameLocale)) {
    return NextResponse.next();
  }

  // Redirect to locale-prefixed path
  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
