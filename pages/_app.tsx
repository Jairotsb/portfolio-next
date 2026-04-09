import "nextra-theme-blog/style.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "../styles/main.css";
import { getDictionarySync, isValidLocale, I18N_CONFIG } from "@/i18n";
import type { Locale } from "@/i18n";
import { DictionaryProvider } from "../context/DictionaryContext";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

export default function App({ Component, pageProps, router }: AppProps) {
  const pathLocale = router.asPath.split("/")[1];
  const locale: Locale = isValidLocale(pathLocale)
    ? pathLocale
    : I18N_CONFIG.defaultLocale;
  const dictionary = getDictionarySync(locale);

  const [navContainer, setNavContainer] = useState<Element | null>(null);

  useEffect(() => {
    const themeBtn = document.querySelector('[aria-label="Toggle Dark Mode"]');
    if (themeBtn?.parentElement) {
      const existing = themeBtn.parentElement.querySelector("[data-lang-switcher]");
      if (existing) return;
      const container = document.createElement("div");
      container.setAttribute("data-lang-switcher", "");
      container.style.display = "contents";
      themeBtn.parentElement.insertBefore(container, themeBtn);
      setNavContainer(container);
    }
  }, [router.asPath]);

  return (
    <DictionaryProvider dictionary={dictionary}>
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/feed.xml"
        />
        <link
          rel="preload"
          href="/fonts/Inter-roman.latin.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      {navContainer && createPortal(<LanguageSwitcher />, navContainer)}
      <Component {...pageProps} />
    </DictionaryProvider>
  );
}
