import styles from "./About.module.css";

function About() {
  return (
    <section className={styles.about} id="about">

      <div className={styles.container}>

        <h2 className={styles.title}>
          Sobre Nossa Empresa
        </h2>

        <p className={styles.text}>
          Somos uma empresa especializada em crochê artesanal, com 3 anos
          de experiência no mercado. Trabalhamos com dedicação e carinho
          na produção de tapetes, conjuntos para banheiro e conjuntos para mesa.
        </p>

        <p className={styles.text}>
          Cada peça é feita manualmente, com atenção aos detalhes e
          utilizando materiais selecionados, garantindo qualidade,
          beleza e durabilidade.
        </p>

        <p className={styles.text}>
          Nosso objetivo é levar aconchego, elegância e personalidade
          para cada ambiente, transformando fios em verdadeiras obras de arte.
        </p>

      </div>

    </section>
  );
}

export default About;