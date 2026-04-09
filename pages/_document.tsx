import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from "next/document";
import { isValidLocale } from "@/i18n";

const metaByLocale: Record<string, { title: string; description: string }> = {
  en: {
    title: "Jairo Tunisse - Full Stack Developer | 8 years JavaScript",
    description:
      "Full Stack Developer with 8 years of experience in React, Next.js and TypeScript. Founder of ESHGO Software House. Specialist in IT infrastructure and large-scale network monitoring.",
  },
  pt: {
    title: "Jairo Tunisse - Full Stack Developer | 8 anos JavaScript",
    description:
      "Desenvolvedor Full Stack com 8 anos de experiência em React, Next.js e TypeScript. Fundador da ESHGO Software House. Especialista em infraestrutura de TI e monitoramento de redes.",
  },
};

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const urlSegments = ctx.req?.url?.split("/") ?? [];
    const pathLocale = urlSegments[1] ?? "";
    const locale = isValidLocale(pathLocale) ? pathLocale : "en";
    return { ...initialProps, locale };
  }

  render() {
    const { locale = "en" } = this.props as DocumentInitialProps & { locale: string };
    const meta = metaByLocale[locale] ?? metaByLocale.en;
    const image = "https://jairotunisse.dev/og-image.jpg";
    const url = "https://jairotunisse.dev/";

    return (
      <Html lang={locale}>
        <Head>
          {/* Primary Meta Tags */}
          <meta name="robots" content="follow, index" />
          <meta name="description" content={meta.description} />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={url} />
          <meta property="og:title" content={meta.title} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:image" content={image} />
          <meta property="og:site_name" content={meta.title} />

          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={url} />
          <meta property="twitter:title" content={meta.title} />
          <meta property="twitter:description" content={meta.description} />
          <meta property="twitter:image" content={image} />
          <meta name="twitter:site" content="@jairotunisse" />

          {/* Schema.org for Person */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Jairo Tunisse",
                jobTitle: "Full Stack Developer",
                url: "https://jairotunisse.dev",
                sameAs: [
                  "https://github.com/Jairotsb",
                  "https://twitter.com/JairoTunisse",
                  "https://instagram.com/jairotunisse",
                ],
                worksFor: {
                  "@type": "Organization",
                  name: "ESHGO Software House",
                },
              }),
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
