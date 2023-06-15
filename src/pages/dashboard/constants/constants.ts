//layout information that is utilized by Plotly to generate line plot
export const plotLayout = {
  title: {
    text: 'Response Latency',
    font: {
      color: 'white',
    },
  },
  xaxis: {
    title: {
      text: 'Percentile',
      font: {
        color: 'white',
      },
    },
    tickmode: 'array',
    tickvals: [0, 90, 99],
    ticktext: ['0%', '90%', '99%'],
    tickfont: {
      color: '#fff',
    },
    font: {
      color: 'white',
    },
  },
  yaxis: {
    title: {
      text: 'Latency (milliseconds)',
      font: {
        color: 'white',
      },
    },
    tickfont: {
      color: '#fff',
    },
  },
  legend: {
    bgcolor: 'rgba(119, 119, 119, .05)',
    x: 0,
    y: -0.15,
    font: {
      color: 'white',
    },
    orientation: 'h',
  },
  modebar: {
    bgcolor: 'rgba(119, 119, 119, .05)',
    color: 'white',
    orientation: 'v',
  },
  plot_bgcolor: 'transparent',
  paper_bgcolor: 'transparent',
  responsive: true,
  height: 800,
};