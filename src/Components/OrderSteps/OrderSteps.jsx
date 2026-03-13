

import styles from "./OrderSteps.module.css";

function OrderSteps() {
  return (
    <section className={styles.order}>
      <h2>Como Fazer seu Pedido</h2>

      <div className={styles.steps}>

        <div className={styles.card}>
          <h3>1</h3>
          <p>Escolha um modelo em nosso catálogo.</p>
        </div>

        <div className={styles.card}>
          <h3>2</h3>
          <p>Envie uma foto ou referência pelo WhatsApp.</p>
        </div>

        <div className={styles.card}>
          <h3>3</h3>
          <p>Defina cores, tamanho e detalhes.</p>
        </div>

        <div className={styles.card}>
          <h3>4</h3>
          <p>Produzimos seu crochê artesanal com carinho.</p>
        </div>

      </div>
    </section>
  );
}

export default OrderSteps;