import en from "./dictionaries/en";
import pt from "./dictionaries/pt";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = { en, pt };

export function getDictionarySync(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
