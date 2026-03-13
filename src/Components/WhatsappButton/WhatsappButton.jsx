

import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import styles from "./WhatsappButton.module.css";

const WhatsappButton = () => {

  const numero = "5511915371799";
  const mensagem = "Olá! Gostaria de um orçamento.";

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

  return (
    <a
      href={url}
      className={styles.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsappButton;