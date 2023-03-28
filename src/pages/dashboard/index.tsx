import React from 'react';
import Head from 'next/head';
import DashLayout from './layout';
import { useState } from 'react';

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

  const initialMethods: InitialMethods = [];

  const initialRatioSum: ratioSum = 0;

  const [constants, setConstants] = useState(initialConstants);
  const [params, setParams] = useState(initialParams);
  const [isPost, setIsPost] = useState(false);
  const [methods, setMethods] = useState(initialMethods);
  const [ratioSum, setRatioSum] = useState(initialRatioSum);

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

    const runScript = await fetch('/api/execScript', {
      method: 'GET',
    });
  };

  // const rawOrEncoded = (button: any) => {
  //   console.log(button);
  // };

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
                <li id={index.toString()} className="w-full grid grid-cols-5">
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
        {/* </div> */}
      </main>
    </DashLayout>
  );
};

const urlParameters = 'param1=data1&param2=data2&param3=data3';
export default index;
