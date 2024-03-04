import React, { useEffect, useState, createContext } from 'react';
import Head from 'next/head';
import DashLayout from './layout';
import { InputData } from './indexComponents/inputData';
import { CurrentMethods } from './indexComponents/currentMethods';
import { PlotlyChart } from './indexComponents/plotlyChart';
import { testingConstants, params, methods } from './types/types';
import { plotLayout } from './constants/constants';
import { getHistogramData } from '../../../methods/getHistogramData';

export const InputDataContext = createContext(null);
export const CurrentMethodsContext = createContext(null);
export const PlotlyChartContext = createContext(null);

const index = () => {

  //initializing constants to their default values
  const initialConstants: testingConstants = {
    rootUrl: '',
    numOfThreads: 2,
    testDuration: 5,
    numOfUsers: 50,
    throughput: 100,
  };

  //iniitalizing parameters to default values
  const initialParams: params = {
    route: '',
    method: 'GET',
    body: '',
    contentType: 'application/json',
    ratio: 1,
  };

  const initialPlotData = [];
  const initialMethods: methods = [];

  const [constants, setConstants] = useState(initialConstants);
  const [params, setParams] = useState(initialParams);
  const [isPost, setIsPost] = useState(false);
  const [methods, setMethods] = useState(initialMethods);
  const [ratioSum, setRatioSum] = useState(0);
  const [plotData, setPlotData] = useState(initialPlotData);
  const [, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  //executes stress test run by Wrk2
  const startTest = async (constants:testingConstants, methods:[params]): Promise<void> => {
    //creates bash file through utilizing constants to create wrk2 bash command run in terminal
    await fetch('/api/createBash', {
      method: 'POST',
      body: JSON.stringify(constants),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    //creates lua file that is the blueprint for the wrk2 script
    await fetch('/api/createLua', {
      method: 'POST',
      body: JSON.stringify(methods),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    //executes bash file once lua file is generated
    await fetch('/api/execScript');

    //starts async function retryGetHistogramData() after setTimeout
    setTimeout(async () => {
      await retryGetHistogramData();
    }, constants.testDuration * 1000);
  };

  //after test has been executed, the result.txt file will be read and scrape the necessary data to be input in plotly. will test once every second for 30 seconds until success.
  async function retryGetHistogramData(maxRetries = 300, delay = 1000) {
    let currentRetry = 0;
  
    while (currentRetry <= maxRetries) {
      try {
        const response = await getHistogramData();
        if (response.plotData.length > 0) {
          addTrace(response.plotData[0]);
          return;
        }
      } catch (error) {
        currentRetry++;
        if (currentRetry >= maxRetries) {
          throw new Error(`Failed after ${maxRetries} retries`);
        }
      }
  
      // Wait for the specified delay before retrying
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  const addTrace = async (trace): Promise<void> => {
    const body = {
      newTrace: trace,
    };
  
    try {
      await fetch('/api/histogramCache', {
        method: 'POST',
        headers: { 'Content-Type': 'Application/JSON' },
        body: JSON.stringify(body),
      });
      // Fetches the updated list of traces from the server
      getTraces();
    } catch (err) {
      throw new Error('Unable to add trace.');
    }
  };
  
  // fetches data from /api/histogramCache.ts
  const getTraces = async (): Promise<void> => {
    const res = await fetch('/api/histogramCache', {
      method: 'GET',
      headers: { 'Content-Type': 'Application/JSON' },
    });
    const data = await res.json();

    // NOTE: we are using a .json file as our storage, so we also need to parse the file contents using JSON.parse()
    const graphTraces: Number[] = JSON.parse(data);
    setPlotData(graphTraces);
    setIsLoading(false);
  };

  // runs on initial page render to render plotter
  useEffect(() => {
    setIsLoading(true);
    getTraces();
  }, []);


  return (
    <DashLayout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className="grow flex flex-col items-start w-full">
        {/* <div className="text-center grid-rows-6 grid-flow-col gap-4"> */}
        <h1 className=" text-3xl">Input Required Data:</h1>

        <InputDataContext.Provider value={{ constants, setConstants, params, setParams, isPost, setIsPost, ratioSum, setRatioSum, methods, setMethods, startTest }}>
          <InputData />
        </InputDataContext.Provider>

        <CurrentMethodsContext.Provider value = {{ methods, setMethods, ratioSum, setRatioSum }}>
          <CurrentMethods />
        </CurrentMethodsContext.Provider>

        <PlotlyChartContext.Provider value = {{ plotData, plotLayout, showDropdown, setShowDropdown, addTrace, getTraces }}>
          <PlotlyChart />
        </PlotlyChartContext.Provider>

      </main>
    </DashLayout>
  );
};
export default index;
