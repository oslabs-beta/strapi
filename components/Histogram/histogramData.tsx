import fs from 'fs';
import { useEffect, useRef, useState } from 'react';
// import Plotly from 'plotly-nodejs';

export default function Histogram() {
  // const [plotData, setPlotData] = useState(null);
  const layout = {
    title: 'My Line Plot',
    xaxis: {
      title: 'X Axis Label',
      tickvals: [90, 99, 99.9],
      ticktext: ['90%', '99%', '99.9%'],
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

    // Split the data into an array of lines
    const lines = dataStr.split('\n');

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

    // Find the data rows and extract the values
    const dataLines = lines.slice(headingLineIndex + 2, endOfValuesIndex - 1);

    const histogramData = dataLines.map((line) => {
      const values = line.trim().split(/\s+/);

      yValues.push(parseFloat(values[0]));
      xValues.push(parseFloat(values[1]));
    });

    // Create the histogram chart
    const plotData = [
      {
        x: xValues,
        y: yValues,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'red' },
      },
    ];
  });
}
const result = Histogram();
