import { useRouter } from "next/router";
import { I18N_CONFIG, LOCALE_FLAGS, isValidLocale } from "@/i18n";
import type { Locale } from "@/i18n";

function setLocaleCookie(locale: Locale) {
  document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000;SameSite=Lax`;
}

export function LanguageSwitcher() {
  const router = useRouter();
  const pathLocale = router.asPath.split("/")[1];
  const currentLocale: Locale = isValidLocale(pathLocale)
    ? pathLocale
    : I18N_CONFIG.defaultLocale;

  const nextLocale: Locale = currentLocale === "en" ? "pt" : "en";

  function handleToggle() {
    setLocaleCookie(nextLocale);

    const segments = router.asPath.split("/");
    if (isValidLocale(segments[1])) {
      segments[1] = nextLocale;
    } else {
      segments.splice(1, 0, nextLocale);
    }
    router.push(segments.join("/") || "/");
  }

  return (
    <button
      onClick={handleToggle}
      aria-label="Switch language"
      title={`Switch to ${nextLocale === "en" ? "English" : "Português"}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.25rem",
        padding: "0.35rem 0.5rem",
        cursor: "pointer",
        borderRadius: "0.375rem",
        fontSize: "0.8rem",
        fontWeight: 500,
        background: "transparent",
        border: "none",
        color: "inherit",
        opacity: 0.8,
        lineHeight: 1,
      }}
    >
      {LOCALE_FLAGS[currentLocale]} {currentLocale.toUpperCase()}
    </button>
  );
}
