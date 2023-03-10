import React from 'react';
import styles from './header.module.css';
import utilStyles from '../../src/styles/utils.module.css';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className={`${styles.header} ${utilStyles.bgDarkest}`}>
      <Link href="/" className={`${styles.hero} ${styles.link}`}>
        <Image src="/logo.png" width={50} height={50} />
        <h1>strAPI</h1>
      </Link>
      <nav className={styles.nav}>
        <Link className={styles.link} href="/about">
          About
        </Link>
        <Link className={styles.link} href="/tutorial">
          Tutorial
        </Link>
        <Link className={styles.link} href="/dashboard">
          Dashboard
        </Link>
        <Link className={styles.link} href="/login">
          <button
            className={`${styles.signin} ${utilStyles.bgDarkgreen} ${utilStyles.btnBoxShadow}`}
          >
            Sign In or Sign Up
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;

// client / public / logo.png;
