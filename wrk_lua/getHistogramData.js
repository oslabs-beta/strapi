import React from 'react';

// import plot and layour from creatHistogram.ts in api folder
// import { plotData, layout } from '../api/createHistogram.ts';
export const getHistogramData = async () => {
  let plotData = [];
  let layout = {};
  const response = await fetch('/api/createHistogram')
    .then((res) => res.json())
    .then((data) => {
      if (data.plot.length === 0 || !data) {
        throw new Error('The file is empty');
      }
      console.log('data.plot: ', data.plot);
      plotData = data.plot;
    })
    .catch((err) => console.log('Error in fetching plot data from api', err));

  return {
    plotData: plotData,
    // layout: layout,
  };
};
