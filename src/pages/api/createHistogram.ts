import type { NextApiRequest, NextApiResponse } from 'next';
import Histogram from '../../../wrk_lua/histogramData';
import fs from 'fs';

export default async function histogram(
  req: NextApiRequest,
  res: NextApiResponse
) {
  fs.readFile('result.txt', (err, data) => {
    if (err) throw err;
    const yValues = [];
    const xValues = [];
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
      console.log(values);
      yValues.push(parseFloat(values[0]));
      xValues.push(parseFloat(values[1]) * 100);
      // totalCount.push(parseFloat(values[2]));
      // percentileRank.push(parseFloat(values[3]));
    });
    console.log('xValues: ', xValues);
    console.log('yValues: ', yValues);
    // console.log('totalCount: ', totalCount);
    // console.log('percentileRank: ', percentileRank);

    // // Create the histogram chart
    const trace =[{
      x: xValues,
      y: yValues,
      type: 'scatter',
    }];

    const layout = {
      title: 'My Line Plot',
      xaxis: {
        title: 'X Axis Label',
        tickvals: [0, 90, 99, 99.9],
        ticktext: ['%'],
      },
      yaxis: {
        title: 'Y Axis Label',
      },
    };
    // const chartLayout = {
    //   title: 'Latency by Percentile Distribution',
    //   xaxis: { title: 'Percentile' },
    //   yaxis: { title: 'Latency (ms)' },
    // };
    Plotly.newPlot('myPlotDiv', trace, layout);
    // Plotly.newPlot(chartRef.current, chartData, chartLayout);
  });
}
