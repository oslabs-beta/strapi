import fs from 'fs';
import { useEffect, useRef, useState} from 'react';
// import Plotly from 'plotly-nodejs';

export default function Histogram() {
  // const [plotData, setPlotData] = useState(null);
  const layout = {
    title: 'My Line Plot',
    xaxis: {
      title: 'X Axis Label',
      tickvals: [90, 99, 99.9],
      ticktext: ['90%','99%','99.9%',],
    },
    yaxis: {
      title: 'Y Axis Label',
    },
  };
  // const chartRef = useRef(null);
  fs.readFile('result.txt', (err, data) => {
    if (err) throw err;
    if (!data.length) throw err;
    const yValues = [];
    const xValues = [];
    const dataStr = data.toString();
    console.log(dataStr)
    // Split the data into an array of lines
    const lines = dataStr.split('\n');
    console.log('lines: ', lines);
    // Find the column headings
    const headingLineIndex = lines.findIndex((line) =>
      line.startsWith('       Value ')
    );
    // const headings = lines[headingLineIndex].trim().split(/\s+/);

    const endOfValuesIndex = lines.findIndex((line) =>
      line.startsWith('#[Mean')
    );
    // Find the data rows and extract the values
    const postValues = lines[endOfValuesIndex].trim().split(/\s+/);
    // console.log('dataLines: ', postValues);

    // Find the data rows and extract the values
    const dataLines = lines.slice(headingLineIndex + 2, endOfValuesIndex - 1);

    const histogramData = dataLines.map((line) => {
      const values = line.trim().split(/\s+/);
      console.log(values);
      yValues.push(parseFloat(values[0]));
      xValues.push(parseFloat(values[1]));
      // totalCount.push(parseFloat(values[2]));
      // percentileRank.push(parseFloat(values[3]));
    });
    console.log('xValues: ', xValues);
    console.log('yValues: ', yValues);
    // console.log('totalCount: ', totalCount);
    // console.log('percentileRank: ', percentileRank);

    // // Create the histogram chart
    const plotData = [
      {
        x: xValues,
        y: yValues,
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: 'red'},
      },
    ];
  });
  // console.log(chartRef);
  // return chartRef;
}
const result = Histogram();



// Next, create a trace object with the x and y values

// Create a data array with the trace object

// Finally, create a layout object with any additional styling or configuration options
