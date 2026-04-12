
import style from "./Location.module.css";

function Localizacao() {
  return (
    <section className={style.localizacaoSection} id="localizacao">
      <span>Localização</span>

      <div className={style.localizacaoContainer}>
        <h2>Onde Estamos</h2>
        <p>Entre em contato pelo WhatsApp.</p>

        <div className={style.mapa}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.140684933492!2d-46.27525902542477!3d-23.491441659025764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce79710b36bf03%3A0x9b5a07dff4956c43!2sR.%20Margarida%20de%20Oliveira%20Costa%20-%20Jardim%20S%C3%A3o%20Bernadino%2C%20Suzano%20-%20SP%2C%2008695-760!5e0!3m2!1spt-BR!2sbr!4v1773264581736!5m2!1spt-BR!2sbr"  
          loading="lazy" 
          referrerPolicy="no-referrer"></iframe>
        </div>

        <div className={style.infoLocal}>
          <p>📍 Suzano - SP</p>
          <p>📞 (11)915371799</p>
          <p>🕒 Segunda a Sexta - 08h às 18h</p>
        </div>
      </div>
    </section>
  );
}

export default Localizacao;