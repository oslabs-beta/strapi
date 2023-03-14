import React from 'react';
import Head from 'next/head';
import styles from './dashboard.module.css';
import DashLayout from './layout';
import { useState } from 'react';

const index = () => {
  const [tests, setTests] = useState([]);
  return (
    <DashLayout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className={styles.inputContainer}>
        <h1 className={styles.h1}>Input Required Data:</h1>
        <form id="testing-constants" className={styles.inputDataForm}>
          <h1 className={styles.h1}>Testing Constants:</h1>
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
        </form>

        <form id="testing-params" className={styles.inputDataForm}>
          <h1>Testing Parameters</h1>
          <label>HTTP 'GET' Request URL:</label>
          <input
            id="http-url"
            className={styles.input}
            type="text"
            placeholder="http://localhost:<PORT>/api/route"
          />
          <label>Primary HTTP Request Method:</label>
          <select className={styles.input} name="choose-method" id="method">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
          </select>
          <button style={{ color: 'black' }}>
            Add Another Testing URL and Method
          </button>
          {/* <label>Secondary HTTP Request Method:</label>
          <select className={styles.input} name="choose-method" id="method">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
          </select> */}
        </form>
      </main>
    </DashLayout>
  );
};

export default index;
