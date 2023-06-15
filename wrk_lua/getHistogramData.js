export const getHistogramData = async () => {
  let plotData = [];
  // fetch data from the database through the api
  await fetch('/api/createHistogram')
    .then((res) => res.json())
    .then((data) => {
      if (data.plot.length === 0 || !data) {
        throw new Error('The file is empty');
      }
      plotData = data.plot;
    })
    .catch((err) => console.log('Error in fetching plot data from api', err));
  // return the plot data for the chart, this is a single trace
  return {
    plotData: plotData,
  };
};
