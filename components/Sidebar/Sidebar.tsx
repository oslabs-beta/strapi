import React from 'react';
import Link from 'next/link';
import styles from './sidebar.module.css';
import utilStyles from '../../src/styles/utils.module.css';

const Sidebar = () => {
  return (
    <nav
      className={`${styles.nav} ${utilStyles.bgDarkest} ${utilStyles.navBoxShadow}`}
    >
      <p>Navigation Panel</p>
      <Link className={`${styles.link}`} href="/dashboard">
        <button
          className={`${styles.btnNav} ${utilStyles.bgDarkgreen} ${utilStyles.navBtnBoxShadow}`}
        >
          New Test
        </button>
      </Link>
      <Link className={`${styles.link}`} href="dashboard/metrics">
        <button
          className={`${styles.btnNav} ${utilStyles.bgDarkgreen} ${utilStyles.navBtnBoxShadow}`}
        >
          Grafana Metrics
        </button>
      </Link>
    </nav>
  );
};

export default Sidebar;
