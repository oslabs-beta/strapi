import React, { useEffect, useState, createContext } from 'react';
import Head from 'next/head';
import DashLayout from './layout';
import { InputData } from './indexComponents/inputData';
import { CurrentMethods } from './indexComponents/currentMethods';
import { PlotlyChart } from './indexComponents/plotlyChart';
import { testingConstants, params, methods } from './types/types';
import { plotLayout } from './constants/constants';

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
  



  return (
    <DashLayout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className="grow flex flex-col items-start w-full">
        {/* <div className="text-center grid-rows-6 grid-flow-col gap-4"> */}
        <h1 className=" text-3xl">Input Required Data:</h1>

        <InputDataContext.Provider value={{ constants, setConstants, params, setParams, isPost, setIsPost, ratioSum, setRatioSum, methods, setMethods }}>
          <InputData />
        </InputDataContext.Provider>

        <CurrentMethodsContext.Provider value = {{ methods, setMethods, ratioSum, setRatioSum }}>
          <CurrentMethods />
        </CurrentMethodsContext.Provider>

        <PlotlyChartContext.Provider value = {{ plotData, setPlotData, setIsLoading, plotLayout, showDropdown, setShowDropdown }}>
          <PlotlyChart />
        </PlotlyChartContext.Provider>

      </main>
    </DashLayout>
  );
};
export default index;
