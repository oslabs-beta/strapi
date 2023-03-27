import type { NextApiRequest, NextApiResponse } from 'next';
import Histogram from '../../../components/Histogram/histogramData';
import fs from 'fs';

export default async function histogram(
  req: NextApiRequest,
  res: NextApiResponse
) {

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
  const plot = [];
  fs.readFile('result.txt', (err, data) => {
    const yValues = [];
    const xValues = [];
    if (err) throw err;
    // Split the data into an array of lines
    const dataStr = data.toString();
    const lines = dataStr.split('\n');
    // Find the column headings
    const headingLineIndex = lines.findIndex((line) =>
      line.startsWith('       Value ')
    );
    const headings = lines[headingLineIndex].trim().split(/\s+/);

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
      // console.log(values);
      yValues.push(parseFloat(values[0]));
      xValues.push(parseFloat(values[1]) * 100);
      // totalCount.push(parseFloat(values[2]));
      // percentileRank.push(parseFloat(values[3]));
    });
    // console.log('xValues: ', xValues);
    // console.log('yValues: ', yValues);

    // random rgb color generator
    function randomColor () {
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      while(r > 220 && g > 220 && b > 220) {
        console.log("r g b: ", r,g,b);
        r = Math.floor(Math.random() * 255);
        g = Math.floor(Math.random() * 255);
        b = Math.floor(Math.random() * 255);
      }
      return `rgb(${r}, ${g}, ${b})`;
    }
    
    // const randomColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
    //   Math.random() * 255
    // )}, ${Math.floor(Math.random() * 255)})`;
    const obj = {
      x: xValues,
      y: yValues,
      type: 'scatter',
      mode: 'lines+markers',
      hovertemplate: 'X: %{x}%<br>Y: %{y}ms',
      marker: { color: randomColor() },
    };
    
    plot.push(obj);
    console.log('plot: ', plot);
    res.status(200).json({plot});
  });
}
