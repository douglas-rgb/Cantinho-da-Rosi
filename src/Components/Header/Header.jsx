

import styles from './Header.module.css'

function Header() {
    return (
        <header className={styles.header} >

            <div className={styles.contato}>
                <p className={styles.email}>Email: rosilene-black@outlook.com</p>
            </div>
            <div className={styles.contato}>
                <p className={styles.phone}>Telefone: (11) 91537-1799</p>
            </div>
            <div className={styles.imagem}>
                <a href="#contato">
                   Whatsapp 
                </a>
            </div>
        </header>
    );
}

export default Header;