import { FaWhatsapp } from "react-icons/fa";

import React, { useState } from 'react';
import styles from '../Contato/Contato.module.css';

const Contato = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const texto = `Olá, meu nome é ${nome}.
Mensagem: ${mensagem}
Email: ${email}`;

    const url = `https://wa.me/5511915371799?text=${encodeURIComponent(texto)}`;

    window.open(url, "_blank");
  };

  return (
    <section id="contato" className={styles.contato}>
      <div className={styles.container}>
        <h2>Entre em Contato</h2>
<p>Solicite um orçamento rápido via WhatsApp</p>

        <form onSubmit={handleSubmit} className={styles.formulario}>

          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <textarea
            placeholder="Digite sua mensagem"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            required
          ></textarea>

          <button type="submit">
  <FaWhatsapp size={20}/>
  Enviar via WhatsApp
</button>

        </form>
      </div>
    </section>
  );
};

export default Contato;