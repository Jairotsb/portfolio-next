import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/pt";

const dictionaries: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  pt: () => import("./dictionaries/pt"),
  en: () => import("./dictionaries/en"),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const mod = await dictionaries[locale]();
  return mod.default;
}
