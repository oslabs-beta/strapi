import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from './dashboard.module.css';
import utilStyles from '../../styles/utils.module.css';
import DashLayout from './layout';
// import { useState } from 'react';
// import { MyChart } from '../../../wrk_lua/sample_data';
import { getHistogramData } from '../../../wrk_lua/getHistogramData';
import MyChart from '../../../components/Chart/chart';

// const plotData = [
//   {
//     x: xValues,
//     y: yValues,
//     type: 'scatter',
//     mode: 'lines+markers',
//     marker: {color: 'red'},
//   },
// ];
// import dynamic from 'next/dynamic';
// const PlotlyGraph = dynamic(
//     () =>
//         import(
//             '../graphs/graph.component'
//         ),
//     {
//         ssr: false,
//         loading: () => <>Loading...</>,
//     },
// );

type InitialConstants = {
  rootUrl: string;
  numOfThreads: number;
  testDuration: number;
  numOfUsers: number;
  throughput: number;
};

type InitialParams = {
  route: string;
  method: 'GET' | 'POST';
  body?: string;
  contentType: 'application/json';
  ratio: number;
};

type InitialMethods = InitialParams[];
type ratioSum = number;

const index = () => {
  const initialConstants: InitialConstants = {
    rootUrl: '',
    numOfThreads: 2,
    testDuration: 5,
    numOfUsers: 50,
    throughput: 100
  };

  const initialParams: InitialParams = {
    route: '',
    method: 'GET',
    body: '',
    contentType: 'application/json',
    ratio: 1,
  };
  
  const initialPlotLayout = {
    title: 'Response Latency',
    xaxis: {
      title: 'Percentile',
      tickmode: 'array',
      tickvals: [0, 90, 99],
      ticktext: ['0%', '90%', '99%'],

    },
    yaxis: {
      title: 'Latency (milliseconds)',
    }
  }

  // equal bin size
  // const initialPlotData = [{x: [], 
  //   y: [],
  //   type: 'scatter',
  //   mode: 'lines+markers',
  //   marker: {color: 'red'},
  // }];
  const initialPlotData = [];

  const initialMethods: InitialMethods = [];

  const initialRatioSum: ratioSum = 0;

  const [constants, setConstants] = useState(initialConstants);
  const [params, setParams] = useState(initialParams);
  const [isPost, setIsPost] = useState(false);
  const [methods, setMethods] = useState(initialMethods);
  const [ratioSum, setRatioSum] = useState(initialRatioSum);
  const [plotData, setPlotData] = useState(initialPlotData);
  const [layout, setLayout] = useState(initialPlotLayout);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // fetches data from /api/histogramCache.ts.
  const getTraces = async (): Promise<void> => {
    const res = await fetch('/api/histogramCache', {
      method: 'GET',
      headers: { 'Content-Type': 'Application/JSON' },
    });
    const data = await res.json();
    console.log('data from getTraces: ', data);
    // NOTE: we are using a .json file as our storage, so we also need to parse the file contents using JSON.parse()
    const graphTraces: Number[] = JSON.parse(data);
    setPlotData(graphTraces);
    setIsLoading(false);
  };

  // runs on initial page render
  useEffect(() => {
    setIsLoading(true);
    getTraces();
  }, []);

  const addTrace = async (trace): Promise<void> => {
    const body = {
      newTrace : trace,
    };

    try {
      await fetch('/api/histogramCache', {
        method: 'POST',
        headers: { 'Content-Type': 'Application/JSON' },
        body: JSON.stringify(body),
      });
      getTraces();
    } catch (err) {
      throw new Error('Unable to add trace.');
    }
  };

  const deleteTrace = async (id: Number): Promise<void> => {
    const body = {
      traceIndex: Number(id),
    };

    try {
      await fetch('/api/histogramCache', {
        method: 'DELETE',
        headers: { 'Content-Type': 'Application/JSON' },
        body: JSON.stringify(body),
      });
      getTraces();
    } catch (err) {
      throw new Error('Unable to delete traces.');
    }
  };

  const startTest = async (): Promise<void> => {
    console.log('constants: ', constants);
    console.log('params: ', params);
    const responseBash = await fetch('/api/createBash', {
      method: 'POST',
      body: JSON.stringify(constants),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseLua = await fetch('/api/createLua', {
      method: 'POST',
      body: JSON.stringify(methods),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const runScript = await fetch('/api/execScript');
    // addTrace(response.plotData[0]);
    setTimeout((async () => {
      const response = await retryGetHistogramData();
      // const response = await getHistogramData();
      // addTrace(response.plotData[0]);
      // const newplotData = [...plotData];
      // newplotData.push(response.plotData[0]);
      // setPlotData(newplotData);
    }),(constants.testDuration + .5) * 1000)
    // newplotData.push(response.plotData[0]);
  //   setTimeout(async ()=> {
  //     let counter = 0;
  //     await new Promise((resolve) => setTimeout(resolve, (constants.testDuration + 1) * 1000));
  //     const response = await asyncFunction();
  //     console.log(response);
  //     const newplotData = [...plotData];
  //     newplotData.push(response.plotData[0]);
  //   });
  // }
  // const rawOrEncoded = (button: any) => {
  //   console.log(button);
  };
  async function retryGetHistogramData(maxRetries = 60, delay = 1000){
    let currentRetry = 0;
    console.log('currentRetry: inner', currentRetry);
    while (currentRetry < maxRetries) {
      console.log('currentRetry: outer', currentRetry);
      try {
        const response = await getHistogramData();
        if (response.plotData.length > 0) {
          console.log('response: ', response);
          addTrace(response.plotData[0]);
          return;
        }
        // return;
      } catch (error) {
        console.error(`Error on retry ${currentRetry + 1}:`, error);
        currentRetry++;
        if (currentRetry >= maxRetries) {
          throw new Error(`Failed after ${maxRetries} retries`);
        }
      }
  
      // Wait for the specified delay before retrying
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  async function manuallyRequestPlotData() {
    const response = await getHistogramData();
    addTrace(response.plotData[0]);
  }
  
  // const asyncFunction = () => {
  //   return new Promise((resolve, reject) => {
  //     getHistogramData();
  //     setTimeout(() => {
  //       resolve(data);
  //     }, 2000)
  //   })
  // }
  
  const addMethod = () => {
    setRatioSum(Number(ratioSum) + Number(params.ratio));
    setMethods(methods.concat(params));
  };

  const deleteMethod = (el: any) => {
    const idx = el.id;
    setRatioSum(Number(ratioSum) - Number(methods[idx].ratio));
    const newMethods = methods;
    newMethods.splice(idx, 1);
    setMethods([...newMethods]);
  };
  const revealDropdownOptions = () => {
    setShowDropdown(!showDropdown);
  }

  const handleOptionClick = (option) => {
    deleteTrace(option);
  };
  return (
    <DashLayout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className={`${styles.inputContainer} overflow-y-scroll`}>
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
          <label>Throughput (requests/sec):</label>
          <input
            onChange={(e: any) =>
              setConstants({ ...constants, throughput: e.target.value })
            }
            value={constants.throughput}
            id="connections"
            className={styles.input}
            type="text"
            placeholder="100"
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
                style={{
                  color: 'black',
                  fontSize: '1rem',
                }}
                onChange={(e: any) =>
                  setParams({
                    ...params,
                    body: e.target.value,
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

          <button
            onClick={() => addMethod()}
            className=" bg-slate-500 w-24 p-3 rounded-md hover:scale-110 transition-all shadow-lg shadow-slate-200"
            type="button"
          >
            Add Method
          </button>
        </form>
        <section className={styles.currentMethods}>
          <h1>Current Methods:</h1>
          <ul className={styles.methodLst}>
            {methods.map((method, index) => {
              return (
                <li key = {index} id={index.toString()} className={styles.listItem}>
                  <p className={styles.routeDisplay}>{method.route}</p>
                  <p>{method.method}</p>
                  {/* <p>{method.method === 'POST' ? method.body : null}</p> */}
                  {method.method === 'POST' ? <p>{method.body}</p> : null}
                  <p>
                    {method.ratio}:{ratioSum}
                  </p>
                  <button
                    id={index.toString()}
                    onClick={(e) => deleteMethod(e.target)}
                    className={styles.deleteMethod}
                  >
                    X
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
        <div><MyChart
        data={plotData}
        layout={layout}
        /></div>
        <div className="dropdown">
        <button onClick={manuallyRequestPlotData}>
          <b>Request Plot Data Manually</b>
        </button>
        <br />
        <button className="dropbtn" onClick={revealDropdownOptions}>
          <b>Remove Traces</b>
          </button>
          {showDropdown && (
            <div className="dropdown-content">
              {plotData.map((option, index) => (
                <div>
                <a
                  key={index}
                  href="#"
                  onClick={() => handleOptionClick(index)}
                >
                  Delete trace: {index}
                </a>
                </div>
              ))}
              <div>
                <a
                  key={-1}
                  href="#"
                  onClick={() => handleOptionClick(-1)}
                >
                  Delete All Traces
                </a>
            </div>
          </div>
        )}
    </div>
      </main>
    </DashLayout>
  );
};

const urlParameters = 'param1=data1&param2=data2&param3=data3';
export default index;
