import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import DashLayout from './layout';
import { getHistogramData } from '../../../wrk_lua/getHistogramData';
import MyChart from '../../../components/Chart/chart';


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
  const inputStyle =
    'h-10 text-lg text-slate-900 p-3 rounded-md border border-slate-100 shadow-md shadow-slate-500';

  const initialConstants: InitialConstants = {
    rootUrl: '',
    numOfThreads: 2,
    testDuration: 5,
    numOfUsers: 50,
    throughput: 100,
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
    setTimeout((async () => {
      const response = await retryGetHistogramData();
    }),(constants.testDuration + .5) * 1000)
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
      <main className="grow flex flex-col items-start w-full">
        {/* <div className="text-center grid-rows-6 grid-flow-col gap-4"> */}
        <h1 className=" text-3xl">Input Required Data:</h1>
        <button
          onClick={() => startTest()}
          className=" bg-sky-900 p-3 mt-3 mb-3 rounded-md cursor-pointer text-sky-300 hover:text-white hover:scale-105 font-medium transition-all shadow shadow-amber-600"
        >
          Start Test
        </button>

        <section className="grid grid-cols-2 w-full gap-8 p-4 max-w-7xl">
          <form id="testing-constants" className="flex flex-col gap-3">
            <h1 className="text-2xl">Testing Constants:</h1>
            <label>Root URL:</label>
            <input
              onChange={(e: any) =>
                setConstants({ ...constants, rootUrl: e.target.value })
              }
              value={constants.rootUrl}
              id="root-url"
              className={inputStyle}
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
              className={inputStyle}
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
              className={inputStyle}
              type="text"
              placeholder="5"
            />
            <label>Number Of Users/Connections:</label>
            <input
              onChange={(e: any) =>
                setConstants({ ...constants, numOfUsers: e.target.value })
              }
              value={constants.numOfUsers}
              id="connections"
              className={inputStyle}
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
              className={inputStyle}
              type="text"
              placeholder="100"
            />
          </form>

          <form id="testing-params" className="flex flex-col gap-3">
            <h1 className="text-2xl">Testing Parameters</h1>

            <label>Route:</label>
            <input
              onChange={(e: any) =>
                setParams({ ...params, route: e.target.value })
              }
              value={params.route}
              id="route"
              className={inputStyle}
              type="text"
              placeholder="/api/route"
            />
            <label>HTTP Method:</label>
            <select
              onChange={(e: any) => {
                setParams({ ...params, method: e.target.value });
                setIsPost((prev) => !prev);
              }}
              className={`${inputStyle} text-sm`}
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
              className={inputStyle}
              type="text"
              placeholder="1"
            />

            {isPost ? (
              <div className="">
                <h3>POST Request Body:</h3>
                <p>(Must be in JSON format)</p>
                <textarea
                  onChange={(e: any) =>
                    setParams({
                      ...params,
                      body: e.target.value,
                    })
                  }
                  placeholder={`{ "key": "value", "firstName": "Steven" }`}
                  className={`${inputStyle} w-full h-24`}
                  name="body"
                  id="body"
                  cols={5}
                  rows={10}
                ></textarea>
              </div>
            ) : null}

            <button
              onClick={() => addMethod()}
              className="bg-sky-900 p-3 mt-3 mb-3 rounded-md cursor-pointer text-sky-300 hover:text-white hover:scale-105 font-medium transition-all shadow shadow-amber-600"
              type="button"
            >
              Add Method
            </button>
          </form>
        </section>
        <section className="mt-6 mb-40 w-full max-w-7xl relative">
          <h1 className="text-2xl mt-3 mb-3">Current Methods:</h1>
          <div className="text-lg text-center w-full grid grid-cols-5 border-b border-b-amber-500">
            <p>Route</p>
            <p>HTTP Method</p>
            <p>Request Body</p>
            <p>Ratio</p>
            <p className="">Delete Method</p>
          </div>
          <ul className=" flex flex-col text-center gap-4 w-full">
            {methods.map((method, index) => {
              return (
                <li key={index} id={index.toString()} className="w-full grid grid-cols-5">
                  <p className="mt-1">{method.route}</p>
                  <p className="mt-1">{method.method}</p>
                  {method.method === 'POST' ? (
                    <p className="mt-1 overflow-hidden text-center ">
                      {method.body}
                    </p>
                  ) : (
                    'N/A'
                  )}
                  <p className="mt-1">
                    {method.ratio}:{ratioSum}
                  </p>
                  <div className="">
                    <button
                      id={index.toString()}
                      onClick={(e) => deleteMethod(e.target)}
                      className=" self-center w-20 bg-sky-900 mt-1 mb-1 rounded-md cursor-pointer text-sky-300 hover:text-white hover:scale-105 font-medium transition-all shadow shadow-amber-600"
                    >
                      DELETE
                    </button>
                  </div>
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
