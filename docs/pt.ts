const pt = {
  common: {
    languageSwitcher: "Idioma",
    loading: "Carregando...",
  },
  nav: {
    home: "Início",
    about: "Sobre",
    contact: "Contato",
  },
  home: {
    title: "Bem-vindo ao nosso site",
    subtitle: "Construído com Next.js e arquitetura limpa",
    cta: "Saiba mais",
    features: {
      title: "Funcionalidades",
      i18n: "Internacionalização completa",
      cleanCode: "Código limpo e tipado",
      performance: "Performance otimizada",
    },
  },
  about: {
    title: "Sobre nós",
    description: "Uma empresa focada em soluções digitais de alta qualidade.",
  },
} as const;

export type Dictionary = typeof pt;
export default pt;
