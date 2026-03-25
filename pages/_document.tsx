import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const meta = {
    title: "Jairo Tunisse - Full Stack Developer | 8 anos JavaScript",
    description: "Desenvolvedor Full Stack com 8 anos de experiência em React, Next.js e TypeScript. Fundador da ESHGO Software House. Especialista em infraestrutura de TI e monitoramento de redes.",
    image: "https://jairotunisse.dev/og-image.jpg",
    url: "https://jairotunisse.dev/"
  };

  return (
    <Html lang="pt-BR">
      <Head>
        {/* Primary Meta Tags */}
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={meta.url} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:site_name" content={meta.title} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={meta.url} />
        <meta property="twitter:title" content={meta.title} />
        <meta property="twitter:description" content={meta.description} />
        <meta property="twitter:image" content={meta.image} />
        <meta name="twitter:site" content="@jairotunisse" />

        {/* Schema.org for Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Jairo Tunisse",
              "jobTitle": "Full Stack Developer",
              "url": "https://jairotunisse.dev",
              "sameAs": [
                "https://github.com/Jairotsb",
                "https://twitter.com/JairoTunisse",
                "https://instagram.com/jairotunisse"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "ESHGO Software House"
              }
            })
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
