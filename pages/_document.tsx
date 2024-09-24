import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const meta = {
    title: "Jairo Tunisse | Desenvolvedor Full Stack",
    description: "Olá, me chamo Jairo, Tenho 23 anos. Sou programador há mais de 4 anos e atuo como desenvolvedor full-stack. Trabalho com desenvolvimento de sites, aplicativos, banco de dado e API Rest",
    image: "https://github.com/Jairotsb.png",
  };

  return (
    <Html lang="pt-br">
      <Head>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@jairotunisse" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <meta property="og:type" content="website"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
