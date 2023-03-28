import dynamic from 'next/dynamic';
import React from 'react';
import {PlotParams} from 'react-plotly.js';
import { getHistogramData } from '../../wrk_lua/getHistogramData';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

type ChartProps = {
  data: number[];
  layout: any;
}

const MyChart: React.FC<ChartProps> = ({ data, layout }) => {
  return (
    <div>
      <Plot  
        data = {data}
        layout = {layout}
        style = {{ width: '100%', height: '100%' }}
      />
    </div>
  );
};
export default MyChart;