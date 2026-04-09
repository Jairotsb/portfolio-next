# i18n Implementation SPEC — Portfolio Jairo Tunisse

**Version**: 1.0  
**Date**: 2026-04-06  
**Status**: Approved — ready for implementation

---

## 1. Overview

This document specifies the complete internationalization (i18n) implementation for the portfolio. The goal is to support English (EN) and Portuguese (PT) with:

- **English as the default language**
- A **PT/EN language-switcher button** in the header navigation
- A **clean, typed dictionary system** organized in `src/i18n/`
- **Dynamic language switching** across the entire application
- **Auto-detection** from browser preferences and persistent cookie storage

The portfolio runs on Next.js 15 with Nextra 3.3.1 (`nextra-theme-blog`), Pages Router. All content is currently in Portuguese only.

---

## 2. Architecture Decision

### The Problem

The `docs/` reference patterns are written for the **App Router** (`[locale]` dynamic segment, `next/navigation`, `getDictionary` as a server-side async function). The project currently uses the **Pages Router** — which is what `nextra-theme-blog@3.3.1` targets. Migrating to App Router would require rewriting all `.mdx` pages, the blog listing, tags routing, and the RSS generator, with high risk of breaking Nextra blog features.

### Decision: Pages Router + Next.js built-in i18n

**Recommended approach**: Keep Pages Router + add the `i18n` block to `next.config.mjs`.

```
Rationale:
✓ Nextra 3.3.1 handles the i18n block natively (reads it, sets NEXTRA_LOCALES env vars)
✓ The dictionary layer (config.ts, dictionaries, get-dictionary) is router-agnostic — reusable as-is
✓ Middleware logic is identical to docs/middleware.ts
✓ LanguageSwitcher only needs router imports swapped: next/navigation → next/router
✓ No MDX pages rewritten — zero risk to Nextra blog infrastructure
```

**Important Nextra caveat**: Nextra 3.x internally strips the `i18n` field from the config it passes to Next.js and manages locale routing via its own middleware. This means `router.locale` from `next/router` may be `undefined`. **Always read the locale from `router.asPath` or use `useRouter` from `nextra/hooks`**.

---

## 3. Final Folder Structure

```
portfolio-next/
├── middleware.ts                          ← NEW: locale detection + redirect
├── next.config.mjs                        ← MODIFIED: add i18n block
├── theme.config.tsx                       ← MODIFIED: localize readMore, dateFormatter
│
├── src/
│   └── i18n/
│       ├── config.ts                      ← NEW: I18N_CONFIG, Locale type, flags/labels
│       ├── index.ts                       ← NEW: barrel exports
│       ├── get-dictionary.ts              ← NEW: async dynamic loader (code-splitting)
│       ├── get-dictionary-sync.ts         ← NEW: synchronous loader (Pages Router pattern)
│       └── dictionaries/
│           ├── en.ts                      ← NEW: English dict — source of Dictionary type
│           └── pt.ts                      ← NEW: Portuguese dict — typed against Dictionary
│
├── context/
│   └── DictionaryContext.tsx              ← NEW: React context + useDictionary hook
│
├── components/
│   └── LanguageSwitcher/
│       └── index.tsx                      ← NEW: Pages Router language switcher
│
├── pages/
│   ├── _app.tsx                           ← MODIFIED: DictionaryProvider + switcher overlay
│   ├── _document.tsx                      ← MODIFIED: dynamic lang attribute + localized meta
│   ├── index.mdx                          ← MODIFIED: extract bio + CV button to HomeContent.tsx
│   ├── carreira.mdx                       ← MODIFIED: thin shell → delegate to components
│   ├── cursos.mdx                         ← MODIFIED: thin shell
│   ├── projects.mdx                       ← MODIFIED: thin shell
│   ├── stack.mdx                          ← MODIFIED: thin shell
│   ├── blog/index.mdx                     ← MODIFIED: localize "Últimos Posts"
│   └── tags/[tag].mdx                     ← MODIFIED: localize tag label
│
└── components/
    ├── Timeline/index.tsx                  ← MODIFIED: dict lookups for section labels
    ├── Education/index.tsx                 ← MODIFIED: dict lookups for labels + status badges
    ├── Projects/index.tsx                  ← MODIFIED: dict lookups for section titles + links
    ├── Stack/index.tsx                     ← MODIFIED: dict lookups for title + category names
    ├── Stack/data.ts                       ← MODIFIED: use id as dictionary key, remove name
    └── CourseGallery/index.tsx             ← MODIFIED: dict lookups for filter labels
```

> `tsconfig.json` already maps `@/*` → `./src/*`, so `@/i18n` resolves to `src/i18n/` with no changes needed.

---

## 4. i18n Configuration

### 4.1 `next.config.mjs`

```js
import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-blog',
  themeConfig: './theme.config.tsx',
})

const nextConfig = {
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'en',
  },
}

export default withNextra(nextConfig)
```

### 4.2 `src/i18n/config.ts`

```ts
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
```

Changes from `docs/config.ts`: `defaultLocale` is `"en"`, locales order is `["en", "pt"]`.

### 4.3 `src/i18n/index.ts`

```ts
export { I18N_CONFIG, LOCALE_LABELS, LOCALE_FLAGS, isValidLocale } from "./config";
export type { Locale } from "./config";
export type { Dictionary } from "./dictionaries/en";
export { getDictionary } from "./get-dictionary";
export { getDictionarySync } from "./get-dictionary-sync";
```

### 4.4 `src/i18n/get-dictionary.ts`

```ts
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/en";

const dictionaries: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  en: () => import("./dictionaries/en"),
  pt: () => import("./dictionaries/pt"),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const mod = await dictionaries[locale]();
  return mod.default;
}
```

### 4.5 `src/i18n/get-dictionary-sync.ts`

For Pages Router (no React Server Components), use synchronous imports. The dictionaries are small (<2KB each) — no meaningful performance impact.

```ts
import en from "./dictionaries/en";
import pt from "./dictionaries/pt";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = { en, pt };

export function getDictionarySync(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
```

---

## 5. Dictionary Structure

### Type safety guarantee

`en.ts` exports the `Dictionary` type (inferred from the `const` object). `pt.ts` is typed as `Dictionary`. TypeScript will fail to compile if any key is missing or has the wrong shape — identical to the pattern in `docs/`.

### 5.1 `src/i18n/dictionaries/en.ts` — source of truth

```ts
const en = {
  common: {
    languageSwitcher: "Language",
    loading: "Loading...",
    readMore: "Read More",
    viewMore: "View More",
    current: "Enrolled",
    completed: "Completed",
    download: "Download",
    repositories: "Repositories",
  },
  nav: {
    home: "Home",
    career: "Career",
    courses: "Courses",
    projects: "Projects",
    stack: "Stack",
    blog: "Blog",
  },
  home: {
    bio: "Full Stack Developer with 8 years of experience in JavaScript and the React ecosystem, combining a solid background in Computer Engineering with 6 years of IT infrastructure experience in the Brazilian Air Force.",
    roles: "CTO | ESHGO Software House | IT Section — Brazilian Air Force | Large-scale network monitoring specialist (+3,000 assets) | Computer Engineering (Uniamérica, 2027)",
    downloadCV: "My Resume",
  },
  career: {
    pageTitle: "Career",
    experience: "Professional Experience",
    education: "Academic Background",
    present: "Present",
  },
  courses: {
    pageTitle: "Courses",
    filterInstitution: "Institution:",
    filterCategory: "Category:",
    all: "All",
  },
  projects: {
    pageTitle: "Projects",
    completedProjects: "Completed Projects",
    institutionalProjects: "Institutional Projects (FAB)",
    repositories: "Repositories",
    viewMore: "View More",
  },
  stack: {
    pageTitle: "Technical Stack",
    categories: {
      frontend: "Front-end",
      backend: "Back-end",
      mobile: "Mobile",
      database: "Database",
      devops: "DevOps & Infrastructure",
      network: "Networks & Security",
      methodologies: "Methodologies & Soft Skills",
    },
  },
  blog: {
    pageTitle: "Blog",
    latestPosts: "Latest Posts",
    taggedWith: 'Posts tagged with "',
    taggedWithClose: '"',
  },
  meta: {
    title: "Jairo Tunisse - Full Stack Developer | 8 years JavaScript",
    description:
      "Full Stack Developer with 8 years of experience in React, Next.js and TypeScript. Founder of ESHGO Software House. Specialist in IT infrastructure and large-scale network monitoring.",
  },
  theme: {
    dateCreated: "Created on",
  },
} as const;

export type Dictionary = typeof en;
export default en;
```

### 5.2 `src/i18n/dictionaries/pt.ts` — typed against Dictionary

```ts
import type { Dictionary } from "./en";

const pt: Dictionary = {
  common: {
    languageSwitcher: "Idioma",
    loading: "Carregando...",
    readMore: "Ver Mais",
    viewMore: "Ver mais",
    current: "Cursando",
    completed: "Concluído",
    download: "Baixar",
    repositories: "Repositórios",
  },
  nav: {
    home: "Início",
    career: "Carreira",
    courses: "Cursos",
    projects: "Projetos",
    stack: "Stack",
    blog: "Blog",
  },
  home: {
    bio: "Desenvolvedor Full Stack com 8 anos de experiência em JavaScript e ecossistema React, aliando sólida formação em Engenharia da Computação a 6 anos de atuação em infraestrutura de TI na Força Aérea Brasileira.",
    roles: "CTO | ESHGO Software House | Seção de tecnologia da informação — Força Aérea Brasileira | Especialista em monitoramento de redes em larga escala (+3.000 Ativos) | Engenharia da Computação (Uniamérica, 2027)",
    downloadCV: "Meu Currículo",
  },
  career: {
    pageTitle: "Carreira",
    experience: "Experiência Profissional",
    education: "Formação Acadêmica",
    present: "Presente",
  },
  courses: {
    pageTitle: "Cursos",
    filterInstitution: "Instituição:",
    filterCategory: "Categoria:",
    all: "Todos",
  },
  projects: {
    pageTitle: "Projetos",
    completedProjects: "Projetos Realizados",
    institutionalProjects: "Projetos Institucionais (FAB)",
    repositories: "Repositórios",
    viewMore: "Ver mais",
  },
  stack: {
    pageTitle: "Stack Técnico",
    categories: {
      frontend: "Front-end",
      backend: "Back-end",
      mobile: "Mobile",
      database: "Banco de Dados",
      devops: "DevOps & Infraestrutura",
      network: "Redes & Segurança",
      methodologies: "Metodologias & Soft Skills",
    },
  },
  blog: {
    pageTitle: "Blog",
    latestPosts: "Últimos Posts",
    taggedWith: 'Post com a tag "',
    taggedWithClose: '"',
  },
  meta: {
    title: "Jairo Tunisse - Full Stack Developer | 8 anos JavaScript",
    description:
      "Desenvolvedor Full Stack com 8 anos de experiência em React, Next.js e TypeScript. Fundador da ESHGO Software House. Especialista em infraestrutura de TI e monitoramento de redes.",
  },
  theme: {
    dateCreated: "Criado em",
  },
};

export default pt;
```

---

## 6. Middleware Specification

**File**: `middleware.ts` (project root)

The middleware runs before every page request to redirect URLs without a locale prefix to the user's preferred locale.

### Option A — Nextra built-in (try first)

```ts
// middleware.ts
export { middleware } from "nextra/locales";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon\\.ico).*)"],
};
```

Nextra's middleware reads the `NEXTRA_LOCALES` and `NEXTRA_DEFAULT_LOCALE` env vars injected at build time, negotiates locale from cookie → `Accept-Language` header → default, and redirects.

### Option B — Manual (mirrors docs/middleware.ts exactly, use if Option A fails)

```ts
// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { I18N_CONFIG, isValidLocale } from "@/i18n/config";

function getPreferredLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) return cookieLocale;

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
```

> `@/i18n/config` is safe in the Edge runtime — only pure TypeScript, no Node.js APIs.

**Start with Option A. If Nextra's `@formatjs/intl-localematcher` dependency fails in the edge bundle, switch to Option B.**

---

## 7. DictionaryContext — Pages Router Pattern

Pages Router does not support React Server Components. The dictionary must be provided via React context. Because the dictionaries are small, a synchronous approach avoids async complexity entirely.

### `context/DictionaryContext.tsx`

```tsx
import React, { createContext, useContext } from "react";
import type { Dictionary } from "@/i18n";

const DictionaryContext = createContext<Dictionary | null>(null);

export function DictionaryProvider({
  dictionary,
  children,
}: {
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary(): Dictionary {
  const ctx = useContext(DictionaryContext);
  if (!ctx) throw new Error("useDictionary must be used inside DictionaryProvider");
  return ctx;
}
```

### How to get the locale in components

```ts
import { useRouter } from "next/router";
import { isValidLocale, I18N_CONFIG } from "@/i18n";
import type { Locale } from "@/i18n";

// Inside a component:
const router = useRouter();
// Parse locale from URL path (Nextra may strip router.locale)
const pathLocale = router.asPath.split("/")[1];
const locale: Locale = isValidLocale(pathLocale)
  ? pathLocale
  : I18N_CONFIG.defaultLocale;
```

---

## 8. Language Switcher

### `components/LanguageSwitcher/index.tsx`

Pages Router adaptation of `docs/language-switcher.tsx` — same cookie + path logic, only router imports change.

```tsx
import { useRouter } from "next/router";
import { I18N_CONFIG, LOCALE_LABELS, LOCALE_FLAGS, isValidLocale } from "@/i18n";
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

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value as Locale;
    if (newLocale === currentLocale) return;

    setLocaleCookie(newLocale);

    const segments = router.asPath.split("/");
    if (isValidLocale(segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join("/") || "/");
  }

  return (
    <select
      value={currentLocale}
      onChange={handleChange}
      aria-label="Select language"
      style={{
        padding: "0.35rem 0.7rem",
        cursor: "pointer",
        borderRadius: "0.375rem",
        fontSize: "0.875rem",
        background: "transparent",
        border: "1px solid currentColor",
      }}
    >
      {I18N_CONFIG.locales.map((locale) => (
        <option key={locale} value={locale}>
          {LOCALE_FLAGS[locale]} {LOCALE_LABELS[locale]}
        </option>
      ))}
    </select>
  );
}
```

### Placement in `pages/_app.tsx`

Nextra's `nextra-theme-blog` does not support custom React components in the nav via `theme.config.tsx`. The switcher is injected as a fixed-position overlay in `_app.tsx`:

```tsx
// pages/_app.tsx — relevant addition
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

  return (
    <DictionaryProvider dictionary={dictionary}>
      <div
        style={{ position: "fixed", top: "1rem", right: "1.25rem", zIndex: 50 }}
      >
        <LanguageSwitcher />
      </div>
      <Component {...pageProps} />
    </DictionaryProvider>
  );
}
```

---

## 9. `theme.config.tsx` Localization

`theme.config.tsx` is a module (not a React component) and cannot call hooks. Use `document.documentElement.lang` for runtime locale detection:

```tsx
// theme.config.tsx — relevant changes
export default {
  darkMode: true,
  readMore: "Read More", // English default; PT users see this briefly before hydration
  dateFormatter: (date: Date) => {
    const lang =
      typeof document !== "undefined"
        ? document.documentElement.lang
        : "en";
    return date.toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  },
  footer: (
    <footer>
      <small>
        <time>{new Date().getFullYear()}</time> © Jairo Tunisse
      </small>
    </footer>
  ),
};
```

> `readMore` is a static string in Nextra's blog theme — it cannot be a component. EN default is appropriate since EN is the default locale.

---

## 10. `pages/_document.tsx` — Dynamic `lang` Attribute

```tsx
import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { isValidLocale } from "@/i18n";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const urlSegments = ctx.req?.url?.split("/") ?? [];
    const pathLocale = urlSegments[1] ?? "";
    const locale = isValidLocale(pathLocale) ? pathLocale : "en";
    return { ...initialProps, locale };
  }

  render() {
    const locale = (this.props as any).locale ?? "en";
    return (
      <Html lang={locale}>
        <Head>{/* existing meta tags */}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

---

## 11. Per-Component String Replacement Guide

Each component uses `useDictionary()` from context. Pattern:

```tsx
import { useDictionary } from "../../context/DictionaryContext";

export default function MyComponent() {
  const dict = useDictionary();
  return <h1>{dict.career.experience}</h1>;
}
```

### Strings to replace per component

| Component | Hardcoded string | Dictionary key |
|---|---|---|
| `Timeline/index.tsx` | "Experiência Profissional" | `dict.career.experience` |
| `Timeline/index.tsx` | "Presente" | `dict.career.present` |
| `Education/index.tsx` | "Formação Acadêmica" | `dict.career.education` |
| `Education/index.tsx` | "Cursando" | `dict.common.current` |
| `Education/index.tsx` | "Concluído" | `dict.common.completed` |
| `Projects/index.tsx` | "Projetos Realizados" | `dict.projects.completedProjects` |
| `Projects/index.tsx` | "Projetos Institucionais (FAB)" | `dict.projects.institutionalProjects` |
| `Projects/index.tsx` | "Repositórios" | `dict.projects.repositories` |
| `Projects/index.tsx` | "Ver mais" | `dict.projects.viewMore` |
| `Stack/index.tsx` | Page title | `dict.stack.pageTitle` |
| `Stack/data.ts` | Category `name` field | Replace with `id` as dict key → `dict.stack.categories[id]` |
| `CourseGallery/index.tsx` | "Instituição:" | `dict.courses.filterInstitution` |
| `CourseGallery/index.tsx` | "Categoria:" | `dict.courses.filterCategory` |
| `CourseGallery/index.tsx` | "Todos" | `dict.courses.all` |
| `pages/index.mdx` | Bio text, CV button | Extract to `HomeContent.tsx` → `dict.home.bio`, `dict.home.downloadCV` |
| `pages/blog/index.mdx` | "Últimos Posts" | Extract to component → `dict.blog.latestPosts` |
| `pages/tags/[tag].mdx` | "Post com a tag" | Extract to component → `dict.blog.taggedWith` |

### Stack category id mapping

Update `components/Stack/data.ts` to remove the `name` field (it becomes a dict lookup by `id`):

```ts
// Before:
{ id: "frontend", name: "Front-end", skills: [...] }

// After — name removed, looked up from dict:
{ id: "frontend", skills: [...] }

// In Stack/index.tsx:
const categoryName = dict.stack.categories[category.id as keyof typeof dict.stack.categories];
```

### MDX page pattern

Nextra MDX files cannot export `getStaticProps` directly. For pages with translatable content, create a `.tsx` content component and import it from the MDX:

```mdx
<!-- pages/carreira.mdx — thin shell -->
import { CareerContent } from '../components/CareerContent'

<CareerContent />
```

```tsx
// components/CareerContent.tsx
import { useDictionary } from "../context/DictionaryContext";
import { Timeline } from "./Timeline";
import { Education } from "./Education";

export function CareerContent() {
  const dict = useDictionary();
  return (
    <>
      <h1>{dict.career.pageTitle}</h1>
      <Timeline />
      <Education />
    </>
  );
}
```

---

## 12. How to Add a New Language

1. Create `src/i18n/dictionaries/es.ts` typed as `Dictionary`
2. Add `"es"` to the `locales` array in `src/i18n/config.ts`
3. Add label and flag in `LOCALE_LABELS` and `LOCALE_FLAGS`
4. Register the import in `get-dictionary.ts` and `get-dictionary-sync.ts`
5. Add `"es"` to the `locales` array in `next.config.mjs`

The middleware, switcher, and all routes update automatically.

---

## 13. How to Use Translations in a New Server Component (future App Router)

```tsx
import { getDictionary, type Locale } from "@/i18n";

export default async function MyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return <h1>{dict.home.bio}</h1>;
}
```

---

## 14. Implementation Steps — Ordered

### Phase 1: Foundation (no visible UI changes)

1. Create `src/i18n/` with `config.ts`, `dictionaries/en.ts`, `dictionaries/pt.ts`, `get-dictionary.ts`, `get-dictionary-sync.ts`, `index.ts`
2. Update `next.config.mjs` — add `i18n` block with `locales: ["en", "pt"], defaultLocale: "en"`
3. Create `middleware.ts` at project root — try Option A first
4. **Verify**: run `npm run dev`, confirm `localhost:3000` redirects to `localhost:3000/en/`; navigate to `/pt`, confirm stays at `/pt/`

### Phase 2: Shell + Language Switcher

5. Create `context/DictionaryContext.tsx`
6. Update `pages/_app.tsx` — wrap with `DictionaryProvider`, add `LanguageSwitcher` overlay
7. Create `components/LanguageSwitcher/index.tsx`
8. **Verify**: switcher visible in top-right; clicking PT switches URL to `/pt/current-path`; cookie is set

### Phase 3: Component Translation

9. Update `pages/_document.tsx` — dynamic `lang` attribute
10. Update `theme.config.tsx` — localized `readMore` and `dateFormatter`
11. Update `components/Timeline/index.tsx`
12. Update `components/Education/index.tsx`
13. Update `components/Projects/index.tsx`
14. Update `components/Stack/index.tsx` + `data.ts`
15. Update `components/CourseGallery/index.tsx`

### Phase 4: Page Content

16. Create `components/HomeContent.tsx`; update `pages/index.mdx`
17. Create `components/CareerContent.tsx`; update `pages/carreira.mdx`
18. Update `pages/cursos.mdx`, `pages/projects.mdx`, `pages/stack.mdx` — thin shells
19. Update `pages/blog/index.mdx` — localize "Últimos Posts"
20. Update `pages/tags/[tag].mdx` — localize tag label

### Phase 5: SEO + Build Verification

21. Localize `<meta>` title and description in `pages/_document.tsx` using `dict.meta.*`
22. Run `npm run build` — verify zero TypeScript errors
23. Run `npm start` — verify all routes accessible under `/en/` and `/pt/`

---

## 15. File Modification List

### New files

| File | Purpose |
|---|---|
| `middleware.ts` | Locale detection + redirect |
| `src/i18n/config.ts` | Single source of truth for locales |
| `src/i18n/index.ts` | Barrel exports |
| `src/i18n/get-dictionary.ts` | Async dynamic loader (code-splitting) |
| `src/i18n/get-dictionary-sync.ts` | Synchronous loader for Pages Router |
| `src/i18n/dictionaries/en.ts` | English dictionary + `Dictionary` type |
| `src/i18n/dictionaries/pt.ts` | Portuguese dictionary |
| `context/DictionaryContext.tsx` | React context + `useDictionary` hook |
| `components/LanguageSwitcher/index.tsx` | Language toggle UI |
| `components/HomeContent.tsx` | Translatable home page content |
| `components/CareerContent.tsx` | Translatable career page content |

### Modified files

| File | Change |
|---|---|
| `next.config.mjs` | Add `i18n` block |
| `theme.config.tsx` | Localize `readMore`, `dateFormatter` |
| `pages/_app.tsx` | `DictionaryProvider` + `LanguageSwitcher` overlay |
| `pages/_document.tsx` | Dynamic `lang` attribute + localized meta tags |
| `pages/index.mdx` | Import `HomeContent` component |
| `pages/carreira.mdx` | Import `CareerContent` component |
| `pages/cursos.mdx` | Import translated component |
| `pages/projects.mdx` | Import translated component |
| `pages/stack.mdx` | Import translated component |
| `pages/blog/index.mdx` | Localize "Últimos Posts" |
| `pages/tags/[tag].mdx` | Localize tag label |
| `components/Timeline/index.tsx` | Dictionary lookups |
| `components/Education/index.tsx` | Dictionary lookups |
| `components/Projects/index.tsx` | Dictionary lookups |
| `components/Stack/index.tsx` | Dictionary lookups |
| `components/Stack/data.ts` | Remove `name` field (use `id` as dict key) |
| `components/CourseGallery/index.tsx` | Dictionary lookups |

### Unchanged files

| File | Reason |
|---|---|
| `scripts/gen-rss.js` | Build-time RSS; blog posts remain in PT |
| `lib/api.ts` | No translatable strings |
| `components/CourseGallery/data.ts` | Course names are proper nouns |
| `tsconfig.json` | `@/*` alias already maps to `./src/*` |

---

## 16. Verification Checklist

### Routing
- [ ] `localhost:3000` redirects to `localhost:3000/en/`
- [ ] `localhost:3000/pt` renders pages in Portuguese
- [ ] `localhost:3000/en` renders pages in English
- [ ] Page navigation preserves the locale prefix
- [ ] `NEXT_LOCALE` cookie is set after visiting any locale-prefixed URL
- [ ] After setting `NEXT_LOCALE=pt` cookie, `localhost:3000` redirects to `/pt/`

### Language Switcher
- [ ] Visible in top-right on all pages including blog posts and tags
- [ ] Shows current locale as selected
- [ ] Clicking PT → URL becomes `/pt/[current-path]` (client-side, no full reload)
- [ ] Clicking EN → URL becomes `/en/[current-path]`
- [ ] `NEXT_LOCALE` cookie updated immediately on switch
- [ ] Refreshing after switch preserves the language

### Dictionary Coverage
- [ ] Home: bio text changes with locale
- [ ] Home: CV button — "My Resume" / "Meu Currículo"
- [ ] Career: "Professional Experience" / "Experiência Profissional"
- [ ] Career: "Present" / "Presente"
- [ ] Education: "Academic Background" / "Formação Acadêmica"
- [ ] Education: status — "Enrolled" / "Cursando", "Completed" / "Concluído"
- [ ] Projects: all three section headings localized
- [ ] Stack: page title + all category names localized
- [ ] Courses: all filter labels localized
- [ ] Blog: "Latest Posts" / "Últimos Posts"
- [ ] Tags: tag label localized

### TypeScript
- [ ] `npm run build` with zero TypeScript errors
- [ ] Removing a key from `pt.ts` causes a compile error
- [ ] `isValidLocale` correctly narrows to `Locale` type

### HTML & SEO
- [ ] `<html lang="en">` on English pages, `<html lang="pt">` on Portuguese
- [ ] `<meta name="description">` uses locale-specific text
- [ ] `<title>` uses locale-specific text

### Build
- [ ] `npm run build` succeeds (RSS generation included)
- [ ] `npm start` — all pages accessible under `/en/` and `/pt/`

---

## 17. Known Constraints

| Constraint | Impact | Workaround |
|---|---|---|
| Nextra strips `i18n` from config | `router.locale` from `next/router` is `undefined` | Always read locale from `router.asPath.split("/")[1]` |
| MDX files can't export `getStaticProps` | Can't do per-page async dict loading | Move content to `.tsx` components imported by MDX |
| `theme.config.tsx` accepts static `readMore` string | Can't use locale-aware component for "Read More" | Default to EN; `dateFormatter` uses `document.documentElement.lang` |
| Blog posts are Portuguese-only | Content not translated | UI strings only; post content is out of scope |
| `nextra/locales` may fail in edge runtime | If `@formatjs/intl-localematcher` is missing | Switch to manual Option B middleware |

---

## Principles Applied

| Principle | How |
|---|---|
| **Single Source of Truth** | `config.ts` defines locales, types, and validation |
| **Type Safety** | `en.ts` exports the `Dictionary` type; `pt.ts` is typed against it — missing keys fail at compile time |
| **Code Splitting** | `getDictionary()` uses dynamic import — loads only the needed locale bundle |
| **Synchronous Fallback** | `getDictionarySync()` enables Pages Router components without async |
| **Separation of Concerns** | Middleware (routing) / Config (domain) / Context (React) / Component (UI) are isolated |
| **Cookie + Header Detection** | Middleware: saved preference → `Accept-Language` header → default |
| **Zero Lock-in** | Dictionary and config layers are framework-agnostic — compatible with future App Router migration |
