export const I18N_CONFIG = {
  defaultLocale: "pt",
  locales: ["pt", "en"],
} as const;

export type Locale = (typeof I18N_CONFIG.locales)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  pt: "Português",
  en: "English",
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  pt: "🇧🇷",
  en: "🇺🇸",
};

export function isValidLocale(value: string): value is Locale {
  return I18N_CONFIG.locales.includes(value as Locale);
}
