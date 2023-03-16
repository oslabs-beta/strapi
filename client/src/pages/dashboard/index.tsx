import React from 'react';
import Head from 'next/head';
import styles from './dashboard.module.css';
import utilStyles from '../../styles/utils.module.css';
import DashLayout from './layout';
import { useState } from 'react';

type InitialConstants = {
  rootUrl: string;
  numOfThreads: number;
  testDuration: number;
  numOfUsers: number;
};

type InitialParams = {
  route: string;
  method: 'GET' | 'POST';
  body?: string;
  contentType: 'application/json';
  ratio: number;
};

const index = () => {
  const initialConstants: InitialConstants = {
    rootUrl: '',
    numOfThreads: 1,
    testDuration: 60,
    numOfUsers: 1,
  };

  const initialParams: InitialParams = {
    route: '',
    method: 'GET',
    body: '',
    contentType: 'application/json',
    ratio: 1,
  };
  const [constants, setConstants] = useState(initialConstants);
  const [params, setParams] = useState(initialParams);
  const [isPost, setIsPost] = useState(false);

  const startTest = (): void => {
    console.log('constants: ', constants);
    console.log('params: ', params);
  };

  const rawOrEncoded = (button: any) => {
    console.log(button);
  };

  return (
    <DashLayout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className={styles.inputContainer}>
        <h1 className={styles.h1}>Input Required Data:</h1>
        <button onClick={() => startTest()} className={styles.btnStartTest}>
          Submit
        </button>
        <form id="testing-constants" className={styles.inputDataForm}>
          <h1 className={styles.h1}>Testing Constants:</h1>
          <label>Root URL:</label>
          <input
            onChange={(e: any) =>
              setConstants({ ...constants, rootUrl: e.target.value })
            }
            value={constants.rootUrl}
            id="root-url"
            className={styles.input}
            type="text"
            placeholder="http://localhost:<PORT>"
          />
          <label>Number of threads:</label>
          <input
            onChange={(e: any) =>
              setConstants({ ...constants, numOfThreads: e.target.value })
            }
            value={constants.numOfThreads}
            id="number-of-threads"
            className={styles.input}
            type="text"
            placeholder="1"
          />
          <label>Total Test Duration (seconds):</label>
          <input
            onChange={(e: any) =>
              setConstants({ ...constants, testDuration: e.target.value })
            }
            value={constants.testDuration}
            id="test-duration"
            className={styles.input}
            type="text"
            placeholder="60"
          />
          <label>Number Of Users/Connections:</label>
          <input
            onChange={(e: any) =>
              setConstants({ ...constants, numOfUsers: e.target.value })
            }
            value={constants.numOfUsers}
            id="connections"
            className={styles.input}
            type="text"
            placeholder="1"
          />
        </form>

        <form id="testing-params" className={styles.inputDataForm}>
          <h1>Testing Parameters</h1>

          <label>Route:</label>
          <input
            onChange={(e: any) =>
              setParams({ ...params, route: e.target.value })
            }
            value={params.route}
            id="route"
            className={styles.input}
            type="text"
            placeholder="/api/route"
          />
          <label>HTTP Method:</label>
          <select
            onChange={(e: any) => {
              setParams({ ...params, method: e.target.value });
              setIsPost((prev) => !prev);
            }}
            className={styles.input}
            name="choose-method"
            id="method"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
          </select>
          <label>Ratio:</label>
          <input
            onChange={(e: any) =>
              setParams({ ...params, ratio: e.target.value })
            }
            value={params.ratio}
            id="ratio"
            className={styles.input}
            type="text"
            placeholder="1"
          />

          {isPost ? (
            <div className={styles.textArea}>
              {/* <div className={styles.urlEncoded}>
                <label>x-www-form-urlencoded</label>
                <input
                  onClick={(e: any) => rawOrEncoded(e.target)}
                  type="radio"
                  value="x-www-form-urlencoded"
                />
                <label>raw</label>
                <input type="radio" value="raw" />
              </div> */}
              {/* <div className={styles.urlEncoded}></div> */}
              <h3>POST Request Body:</h3>
              <p>(Must be in JSON format)</p>
              <textarea
                onChange={(e: any) =>
                  setParams({
                    ...params,
                    body: encodeURI(e.target.value),
                  })
                }
                placeholder={`{ "key": "value", "firstName": "Steven" }`}
                name="body"
                id="body"
                cols={5}
                rows={10}
              ></textarea>
            </div>
          ) : null}

          <button className={`${styles.btnAddParam} ${utilStyles.bgTeal}`}>
            Add Method
          </button>
        </form>
      </main>
    </DashLayout>
  );
};

const urlParameters = 'param1=data1&param2=data2&param3=data3';
export default index;
