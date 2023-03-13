import React from 'react';
import Head from 'next/head';
import styles from './dashboard.module.css';
import DashLayout from './layout';

const index = ({ children }) => {
  return (
    <DashLayout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className={styles.inputContainer}>
        <h1 className={styles.h1}>Input Required Data:</h1>
        <form id="prometheus-form" className={styles.inputDataForm}>
          <h1>Prometheus Data:</h1>
          <label>Prometheus Port Number:</label>
          <input
            id="prom-port"
            className={styles.input}
            type="text"
            placeholder="http://localhost:9090"
          />
          <label>Database URI:</label>
          <input
            id="db-uri"
            className={styles.input}
            type="text"
            placeholder="mongodb+srv://username:<password>@dbnamecluster.ab1c2de.mongodb.net/?retryWrites=true&w=majority"
          />
          <label>HTTP Ports:</label>
          <input
            id="http-port"
            className={styles.input}
            type="text"
            placeholder="http://localhost:3000, http://localhost:PORT, etc."
          />
        </form>

        <form id="testing-params" className={styles.inputDataForm}>
          <h1>Testing Parameters</h1>
          <label>Number of threads:</label>
          <input
            id="number-of-threads"
            className={styles.input}
            type="text"
            placeholder="1"
          />
          <label>Total Test Duration (seconds):</label>
          <input
            id="test-duration"
            className={styles.input}
            type="text"
            placeholder="60"
          />
          <label>HTTP Request Density (req/sec):</label>
          <input
            id="req-density"
            className={styles.input}
            type="text"
            placeholder="10"
          />
          <label>Number Of Users/Connections:</label>
          <input
            id="connections"
            className={styles.input}
            type="text"
            placeholder="1"
          />
          <label>HTTP Request Method:</label>
          <select className={styles.input} name="choose-method" id="method">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
          </select>
        </form>
      </main>
    </DashLayout>
  );
};

export default index;
