import React, { useContext, useEffect } from "react";
import { getHistogramData } from '../../../../methods/getHistogramData';
import { PlotlyChartContext } from '../index';
import MyChart from '../../../../components/Chart/Chart';

export const PlotlyChart = () => {
  const { plotData, plotLayout, showDropdown, setShowDropdown, addTrace, getTraces } = useContext(PlotlyChartContext)

  //reveal dropdown options. toggle show/hide
  const revealDropdownOptions = () => {
    setShowDropdown(!showDropdown);
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
  //if test has run and graph did not generate, but result.txt was created, this function will manually generate the results to put into plotly. can also double as a color picker
  async function manuallyRequestPlotData() {
    const response = await getHistogramData();
    addTrace(response.plotData[0]);
  }
  return (
    <div className="w-10/12">
      <div>
        <MyChart data={plotData} layout={plotLayout} />
      </div>
      <br></br>
      <div className="dropdown">
        <button
          className="p-2 mt-6 mb-3 rounded-md cursor-pointer text-red-300 hover:text-white hover:scale-105 font-medium transition-all shadow shadow-sky-300"
          onClick={manuallyRequestPlotData}
        >
          Request Plot Data Manually
        </button>
        <br />
        <button
          className="p-2 mt-3 mb-6 rounded cursor-pointer text-red-300 hover:text-white hover:scale-105 font-medium transition-all shadow shadow-sky-300"
          onClick={revealDropdownOptions}
        >
          Remove Traces
        </button>
        {showDropdown && (
          <div className="flex flex-wrap">
            {Array.from(Array(plotData.length), (_,index) => (
              <div key={index} className="mb-7">
                <a
                  className="mr-3 p-2 mt-6 rounded-md cursor-pointer text-red-300 hover:text-white hover:scale-105 font-medium transition-all shadow shadow-sky-300"
                  href="#"
                  onClick={() => deleteTrace(index)}
                >
                  Delete trace: {index}
                </a>
              </div>
            ))}
            <div>
              <a
                className="p-2 mt-3 rounded-md cursor-pointer text-sky-300 hover:text-white font-medium transition-all shadow shadow-amber-600"
                key={-1}
                href="#"
                onClick={() => deleteTrace(-1)}
              >
                Delete All Traces
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}