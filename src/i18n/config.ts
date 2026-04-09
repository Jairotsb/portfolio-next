export const I18N_CONFIG = {
  defaultLocale: "en",
  locales: ["en", "pt"],
} as const;

export type Locale = (typeof I18N_CONFIG.locales)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  pt: "Português",
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  en: "🇺🇸",
  pt: "🇧🇷",
};

export function isValidLocale(value: string): value is Locale {
  return (I18N_CONFIG.locales as readonly string[]).includes(value);
}
