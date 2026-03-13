import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>

      <div className={styles.container}>

        <div className={styles.footerSection}>
          <h3>Cantinho da Rosi</h3>
          <p>
            Trabalhos artesanais feitos com carinho.
            Produzimos tapetes, conjuntos para banheiro
            e conjuntos para mesa.
          </p>
        </div>

        <div className={styles.footerSection}>
          <h3>Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#about">Sobre</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Contato</h3>
          <p>📧 rosilene-black@outlook.com</p>
          <p>📱 (11) 91537-1799</p>
        </div>

      </div>

      <div className={styles.copy}>
        <p>© 2026 Cantinho da Rosi - Todos os direitos reservados</p>
      </div>

      <div className={styles.legal}>
        <a href="/Legal/privacidade.html" target="_blank" rel="noopener noreferrer">Privacidade</a>
        <a href="/Legal/termos.html" target="_blank" rel="noopener noreferrer">Termos</a>
        <a href="/Legal/faq.html" target="_blank" rel="noopener noreferrer">FAQ</a>
      </div>

    </footer>
  );
}

export default Footer;