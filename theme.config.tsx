const YEAR = new Date().getFullYear();

export default {
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