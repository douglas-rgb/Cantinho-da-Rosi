import styles from "./Products.module.css";

function Products() {
  return (
    <section className={styles.products} id="products">
      
      <h2 className={styles.title}>Nossos Produtos</h2>

      <div className={styles.container}>

        <div className={`${styles.card} ${styles.card1}`}>
          <h3>Tapetes de Crochê</h3>
          <p>Peças artesanais feitas com carinho para decorar seu lar.</p>

          <a
            href="Modelos/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            Ver mais
          </a>
        </div>

        <div className={`${styles.card} ${styles.card2}`}>
          <h3>Trilho de Mesa</h3>
          <p>Conjuntos elegantes que deixam seu banheiro mais bonito.</p>

          <a
            href="Modelos/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            Ver mais
          </a>
        </div>

        <div className={`${styles.card} ${styles.card3}`}>
          <h3>Conjunto para Banheiro</h3>
          <p>Peças delicadas para decorar e valorizar sua mesa.</p>

          <a
            href="Modelos/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            Ver mais
          </a>
        </div>

      </div>
    </section>
  );
}

export default Products;