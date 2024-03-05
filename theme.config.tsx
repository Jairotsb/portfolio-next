const YEAR = new Date().getFullYear();


export default {
  darkMode: true,
  readMore: "Ver Mais",
  dateFormatter: date => `Criado em ${date.toLocaleDateString()}`, 
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
