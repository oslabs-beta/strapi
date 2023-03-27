// import Plotly from 'plotly.js-dist';
// import fs from 'fs';
import React from 'react';
// import Plot from 'react-plotly.js';
// const Plot = require('react-plotly.js').default;
// const Plot = createPlotlyComponent(Plotly);

// import {PlotParams} from 'react-plotly.js';

// const xValues = [
//   0, 10, 20, 30, 40, 50, 55.00000000000001, 60, 65, 70, 75, 77.5, 80, 82.5, 85,
//   87.5, 88.75, 90, 91.25, 92.5, 93.75, 94.375, 95, 95.625, 96.25, 96.875,
//   97.1875, 97.5, 97.8125, 98.125, 98.4375, 98.5938, 98.75, 98.9062, 99.0625,
//   99.2188, 99.2969, 99.375, 99.4531, 99.5313, 99.60940000000001,
//   99.64840000000001, 99.6875, 99.7266, 99.76559999999999, 99.8047,
// ];
// const yValues = [
//   1.011, 20.063, 30.783, 37.791, 43.263, 51.135, 55.999, 67.903, 71.807, 84.799,
//   116.735, 139.391, 149.759, 154.879, 167.551, 177.151, 185.215, 204.671,
//   210.559, 224.511, 238.079, 249.087, 264.703, 359.935, 481.279, 488.447,
//   493.567, 494.591, 497.663, 531.455, 537.599, 539.135, 544.767, 549.887,
//   549.887, 550.399, 550.399, 557.055, 557.055, 557.055, 608.255, 608.255,
//   608.255, 608.255, 608.255, 659.455,
// ];

// const plotData = [
//   {
//     x: xValues,
//     y: yValues,
//     type: 'scatter',
//     mode: 'lines+markers',
//     marker: { color: 'red' },
//   },
// ];
// const layout = {
//   title: 'My Line Plot',
//   xaxis: {
//     title: 'Percentile',
//     tickvals: [0, 90, 99, 99.9],
//     ticktext: ['%'],
//   },
//   yaxis: {
//     title: 'Latency (milliseconds)',
//   },
// };

// import plot and layour from creatHistogram.ts in api folder
// import { plotData, layout } from '../api/createHistogram.ts';
export const getHistogramData = async () => {
  let plotData = [];
  let layout = {};
  const response = await fetch('/api/createHistogram')
    .then((res) => res.json())
    .then((data) => {
      console.log('data: ', data);
      plotData = data.plot;
      // layout = data.layout;
      console.log('plotData: ', plotData);
      // console.log('layout: ', layout);
    })
    .catch((err) => console.log('Error in fetching plot data from api', err));

  return {
    plotData: plotData,
    // layout: layout,
  };
};

// console.log('response: ', response);
// export const MyChart = () => {
//   {plotData, layout} = getHistogramData();
//   return (
//     <Plot
//       data={plotData}
//       layout={layout}
//       style={{ width: '100%', height: '100%' }}
//     />
//   );
// };

// fetches data from /api/panels.ts. Next.js does not recommend fetching like this, but in order to get responsive state and complete our read/write operations to our JSON file, this is the best approach.
// const getData = async (): Promise<void> => {
// const res = await fetch('/api/panels', {
//     method: 'GET',
//     headers: { 'Content-Type': 'Application/JSON' },
// });
// const data = await res.json();
// // NOTE: we are using a .json file as our storage, so we also need to parse the file contents using JSON.parse()
// const panelUrls: string[] = JSON.parse(data);
// setUrls(panelUrls);
// setIsLoading(false);
// };
