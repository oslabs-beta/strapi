import fs from 'fs';
import { useEffect, useRef } from 'react';
// import {Plotly} from 'plotly.js-dist';
// import bla from '../../result.txt';
// export default function Histogram() {
  // const chartRef = useRef(null);
  // useEffect(() => {
    fs.readFile('result.txt', (err, data) => {
      if (err) throw err;
      console.log(data);
      // Split the data into an array of lines
      const dataStr = data.toString();
      console.log(dataStr);
      const lines = dataStr.split('\n');
      console.log(lines);
      // Find the column headings
      const headingLineIndex = lines.findIndex((line) =>
        line.startsWith('       Value ')
      );
      console.log('headingLineIndex: ', headingLineIndex);
      const headings = lines[headingLineIndex].trim().split(/\s+/);
      console.log('headings: ', headings);

      const endOfValuesIndex = lines.findIndex((line) =>
        line.startsWith('#[Mean')
      );
      console.log('endOfValuesIndex: ', endOfValuesIndex);
      // // Find the data rows and extract the values
      const postValues = lines[endOfValuesIndex].trim().split(/\s+/);
      // console.log('dataLines: ', postValues);

      // // Find the data rows and extract the values
      const dataLines = lines.slice(headingLineIndex + 2, endOfValuesIndex - 1);
      console.log('dataLines: ', dataLines);
      const value = [];
      const percentile = [];
      const totalCount = [];
      const percentileRank = [];
      const histogramData = dataLines.map((line) => {
        const values = line.trim().split(/\s+/);
        console.log(values)
        value.push(parseFloat(values[0]));
        percentile.push(parseFloat(values[1]));
        totalCount.push(parseFloat(values[2]));
        percentileRank.push(parseFloat(values[3]));
      });
      console.log('value: ', value);
      console.log('percentile: ', percentile);
      console.log('totalCount: ', totalCount);
      console.log('percentileRank: ', percentileRank);

      // // Create the histogram chart
      const chartData = [
        {
          x: histogramData,
          type: 'histogram',
        },
      ];
      console.log('chartData: ', chartData);

      const chartLayout = {
        title: 'Latency Histogram',
        xaxis: { title: 'Latency (ms)' },
        yaxis: { title: 'Frequency' },
      };

      // Plotly.newPlot(chartRef.current, chartData, chartLayout);
    });
  // }, []);
  // console.log(chartRef);
  // return chartRef;
// }
