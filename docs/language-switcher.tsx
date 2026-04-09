"use client";

import { usePathname, useRouter } from "next/navigation";
import { I18N_CONFIG, LOCALE_LABELS, LOCALE_FLAGS, isValidLocale } from "@/i18n";
import type { Locale } from "@/i18n";

type Props = {
  currentLocale: Locale;
};

function setLocaleCookie(locale: Locale) {
  document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000;SameSite=Lax`;
}

function buildLocalizedPath(pathname: string, newLocale: Locale): string {
  const segments = pathname.split("/");
  if (isValidLocale(segments[1])) {
    segments[1] = newLocale;
  } else {
    segments.splice(1, 0, newLocale);
  }
  return segments.join("/") || "/";
}

export function LanguageSwitcher({ currentLocale }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value as Locale;
    if (newLocale === currentLocale) return;

    setLocaleCookie(newLocale);
    router.push(buildLocalizedPath(pathname, newLocale));
  }

  return (
    <select
      value={currentLocale}
      onChange={handleChange}
      aria-label="Select language"
      style={{ padding: "0.4rem 0.8rem", cursor: "pointer" }}
    >
      {I18N_CONFIG.locales.map((locale) => (
        <option key={locale} value={locale}>
          {LOCALE_FLAGS[locale]} {LOCALE_LABELS[locale]}
        </option>
      ))}
    </select>
  );
}
