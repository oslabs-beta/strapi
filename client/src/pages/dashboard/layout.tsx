import React from 'react';
import Layout from '../layout';
import Sidebar from '../../../components/Sidebar/Sidebar';
import styles from './dashboard.module.css';

const DashLayout = ({ children }) => {
  return (
    <Layout>
      <section className={styles.dashContainer}>
        <Sidebar />
        {children}
      </section>
    </Layout>
  );
};

export default DashLayout;
