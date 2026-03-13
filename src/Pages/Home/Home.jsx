
import styles from "./Home.module.css";

function Home() {
  return (
    <section className={styles.sectionTop} id="home">

      <div className={styles.content}>
        <h1>Arte em Crochê com Amor</h1>

        <p>
          Tapetes, conjuntos para banheiro e mesa feitos à mão,
          trazendo aconchego e elegância para seu lar.
        </p>

        <a 
          href="Modelos/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          Ver Produtos
        </a>

      </div>

    </section>
  );
}

export default Home;




