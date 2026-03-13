import { useState } from "react"
import logo from "../../assets/Rosilene-logo.webp"
import styles from "./Navbar.module.css"
import { IoLocationOutline } from "react-icons/io5";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className={styles.navbar}>

            {/* LOGO */}
            <div className={styles.logo}>
                <a href="#home">
                    <img src={logo} alt="Logo Rosilene Crochê" />
                </a>
            </div>

            {/* BOTÃO HAMBURGER */}
            <div 
                className={styles.hamburger}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

            {/* MENU */}
            <ul className={`${styles.menu} ${menuOpen ? styles.active : ""}`}>
                <li><a href="#home" className={styles.activeLink}>Home</a></li>
                <li><a href="#about">Sobre</a></li>
                <li><a href="#products">Produtos</a></li>
                <li><a href="#contato">Contato</a></li>
                <li><a href="#localizacao">
                    <IoLocationOutline />
                    Ver Localização
                    </a></li>
            </ul>

        </nav>
    )
}

export default Navbar;