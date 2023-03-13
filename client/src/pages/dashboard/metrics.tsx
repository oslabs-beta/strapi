import React from 'react';
import DashLayout from './layout';
import styles from './dashboard.module.css';

const Metrics = () => {
  return (
    <DashLayout>
      <main className={styles.metricsContainer}>
        <h1 className={`${styles.h1Metrics} ${styles.bigText}`}>
          Live System Metrics:
        </h1>
        <p className={`${styles.h1Metrics}`}>Courtesy of Grafana &copy;</p>
        <iframe
          src="http://localhost:4000/d-solo/rYdddlPWj/node-exporter-full?orgId=1&refresh=1m&from=1678715094713&to=1678725894713&panelId=9"
          className={styles.panel}
        ></iframe>
        <iframe
          src="http://localhost:4000/d-solo/rYdddlPWj/node-exporter-full?from=1678732293535&to=1678743093535&orgId=1&panelId=60"
          className={styles.panel}
        ></iframe>
        <iframe
          src="http://localhost:4000/d-solo/rYdddlPWj/node-exporter-full?from=1678732379376&to=1678743179376&orgId=1&panelId=3"
          className={styles.panel}
        ></iframe>
        <iframe
          src="http://localhost:4000/d-solo/rYdddlPWj/node-exporter-full?from=1678732420554&to=1678743220554&orgId=1&panelId=84"
          className={styles.panel}
        ></iframe>
      </main>
    </DashLayout>
  );
};

export default Metrics;
