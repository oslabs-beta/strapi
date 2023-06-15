//executes stress test run by Wrk2
export const startTest = async (constants, methods): Promise<void> => {
  //creates bash file through utilizing constants to create wrk2 bash command run in terminal
  await fetch('/api/createBash', {
    method: 'POST',
    body: JSON.stringify(constants),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  //creates lua file that is the blueprint for the wrk2 script
  await fetch('/api/createLua', {
    method: 'POST',
    body: JSON.stringify(methods),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  //executes bash file once lua file is generated
  await fetch('/api/execScript');
};
  