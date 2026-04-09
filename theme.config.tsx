const YEAR = new Date().getFullYear();
export default {
  darkMode: true,
  readMore: "Read More",
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
        <time>{YEAR}</time> © Jairo Tunisse.
      </small>
      <style jsx>{`
        footer {
          text-align: center;
          margin-top: 4rem;
        }
        a {
          float: right;
        }
      `}</style>
    </footer>
  ),
};
