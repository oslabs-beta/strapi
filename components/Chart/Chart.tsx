import dynamic from 'next/dynamic';
import React from 'react';
import { PlotParams } from 'react-plotly.js';

const Plot = dynamic(() => import('react-plotly.js'), { 
  ssr: false,
  loading: () => <p>Loading...</p>
});

type ChartProps = {
  data: PlotParams['data'];
  layout: PlotParams['layout'];
};
const config = {
  autosizable: true,
};
const MyChart: React.FC<ChartProps> = ({ data, layout }) => {
  return (
    <div>
      <Plot
        data={data}
        layout={layout}
        style={{ width: '100%', height: '100%' }}
        config={config}
      />
    </div>
  );
};
export default MyChart;
