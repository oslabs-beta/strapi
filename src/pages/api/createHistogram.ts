import type { NextApiRequest, NextApiResponse } from 'next';
import Histogram from '../../../components/Histogram/histogramData';
import fs from 'fs';

export default async function histogram(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const plot = [];
  try {
    fs.readFile('result.txt', (err, data) => {
      if (err) throw err;

      const yValues = [];
      const xValues = [];

      // Split the data into an array of lines
      const dataStr = data.toString();
      if (!dataStr || dataStr.length === 0) {
        return res.status(200).json({ plot });
      }
      const lines = dataStr.split('\n');

      // Find the column headings index
      const headingLineIndex = lines.findIndex((line) =>
        line.startsWith('       Value ')
      );

      // Find the column endings index
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
        xValues.push(parseFloat(values[1]) * 100);
      });

      // random rgb color generator
      function randomColor() {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        while (r > 220 && g > 220 && b > 220) {
          r = Math.floor(Math.random() * 255);
          g = Math.floor(Math.random() * 255);
          b = Math.floor(Math.random() * 255);
        }
        return `rgb(${r}, ${g}, ${b})`;
      }

      const obj = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        mode: 'lines+markers',
        hovertemplate: 'X: %{x}%<br>Y: %{y}ms',
        marker: { color: randomColor() },
      };

      plot.push(obj);

      res.status(200).json({ plot });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred', error: error.message });
  }
}
