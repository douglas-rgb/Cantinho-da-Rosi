import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from "./Depoimentos.module.css";

export default function Depoimentos() {
  const depoimentos = [
    {
      nome: "Ana Paula",
      texto: "Comprei um kit de banheiro em crochê e fiquei apaixonada! Muito bem feito.",
      avaliacao: 5,
      foto: "https://i.pravatar.cc/100?img=1",
    },
    {
      nome: "Juliana Mendes",
      texto: "Os tapetes são lindos, deixou minha casa mais aconchegante!",
      avaliacao: 5,
      foto: "https://i.pravatar.cc/100?img=2",
    },
    {
      nome: "Carlos Souza",
      texto: "Produto perfeito e entrega rápida. Recomendo muito!",
      avaliacao: 4,
      foto: "https://i.pravatar.cc/100?img=3",
    },
    {
      nome: "Fernando Lima",
      texto: "Acabamento impecável, muito capricho!",
      avaliacao: 5,
      foto: "https://i.pravatar.cc/100?img=4",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
  };

  const renderStars = (num) => "⭐".repeat(num);

  return (
    <section className={styles.section} id="depoimentos">
      <div className="container text-center">
        <h2 className={styles.title}>Avaliações dos Clientes</h2>

        <Slider {...settings}>
          {depoimentos.map((dep, index) => (
            <div key={index} className={styles.slide}>
              <div className={styles.card}>
                
                {/* FOTO + NOME */}
                <div className={styles.header}>
                  <img src={dep.foto} alt={dep.nome} className={styles.foto} />
                  <h5 className={styles.nome}>{dep.nome}</h5>
                </div>

                {/* TEXTO */}
                <p className={styles.texto}>“{dep.texto}”</p>

                {/* ESTRELAS */}
                <p className={styles.stars}>
                  {renderStars(dep.avaliacao)}
                </p>

              </div>
            </div>
          ))}
          {depoimentos.map((dep, index) => (
            <div key={index} className={styles.slide}>
              <div className={styles.card}>
                
                {/* FOTO + NOME */}
                <div className={styles.header}>
                  <img src={dep.foto} alt={dep.nome} className={styles.foto} />
                  <h5 className={styles.nome}>{dep.nome}</h5>
                </div>

                {/* TEXTO */}
                <p className={styles.texto}>“{dep.texto}”</p>

                {/* ESTRELAS */}
                <p className={styles.stars}>
                  {renderStars(dep.avaliacao)}
                </p>

              </div>
            </div>
          ))}
          {depoimentos.map((dep, index) => (
            <div key={index} className={styles.slide}>
              <div className={styles.card}>
                
                {/* FOTO + NOME */}
                <div className={styles.header}>
                  <img src={dep.foto} alt={dep.nome} className={styles.foto} />
                  <h5 className={styles.nome}>{dep.nome}</h5>
                </div>

                {/* TEXTO */}
                <p className={styles.texto}>“{dep.texto}”</p>

                {/* ESTRELAS */}
                <p className={styles.stars}>
                  {renderStars(dep.avaliacao)}
                </p>

              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}