import styles from "./Header.module.css";
import Link from "next/dist/client/app-dir/link";
import React from "react";

const Header=()=>{
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/" className={styles.logoLink}>
                    My TaSkS
                </Link>
            </div>
            <div className={styles.nav}>
                <Link href="/review" className={styles.link}>
                    Ревью
                </Link>
                <Link href="/settings" className={styles.link}>
                    Настройки
                </Link>
            </div>
        </header>
    );
};
export default Header;
