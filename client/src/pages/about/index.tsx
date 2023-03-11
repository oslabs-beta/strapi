import React from 'react';
import Layout from '../layout';
import styles from './about.module.css';

const index = () => {
  return (
    <Layout>
      <main className={styles.aboutContainer}>
        <h1 className={styles.h1}>About Strapi:</h1>
        <p className={styles.aboutText}>
          Strapi is designed to be a free and open-source alternative to
          load-test your API routes within Docker Containers
        </p>
        <p className={styles.aboutText}>
          Testing API routes within Docker containers and monitoring the health
          of the containers does not need to be difficult. In fact, it should be
          relatively easy.
        </p>
        <p className={styles.aboutText}>
          That's where strAPI comes in! strAPI is a light-weight program that
          allows you to visualize and test your Docker API routes, free of
          charge with peace of mind that everything is working as intended!
        </p>
      </main>
    </Layout>
  );
};

export default index;
