import React, { useContext } from "react";
import { InputDataContext } from "../index";

export const InputData = () => {
  //tailwind styling
  const inputStyle = 'h-10 text-lg bg-slate-800 text-white p-3 rounded-md border border-slate-700 shadow shadow-slate-500';
  
  const { constants, setConstants, params, setParams, isPost, setIsPost, ratioSum, setRatioSum, methods, setMethods, startTest } = useContext(InputDataContext);

  //add params into methods array
  const addMethod = () => {
    setRatioSum(Number(ratioSum) + Number(params.ratio));
    setMethods(methods.concat(params));
  };

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 w-full gap-8 p-4 max-w-7xl">
      <form id="testing-constants" className="flex flex-col gap-3">
        <h1 className="text-2xl">Testing Constants:</h1>
        <label>Root URL:</label>
        <input
          onChange={(e: any) =>
            setConstants({ ...constants, rootUrl: e.target.value })
          }
          value={constants.rootUrl}
          id="root-url"
          className={inputStyle}
          type="text"
          placeholder="http://localhost:<PORT>"
        />
        <label>Number of threads:</label>
        <input
          onChange={(e: any) =>
            setConstants({ ...constants, numOfThreads: e.target.value })
          }
          value={constants.numOfThreads}
          id="number-of-threads"
          className={inputStyle}
          type="text"
          placeholder="2"
        />
        <label>Total Test Duration (seconds):</label>
        <input
          onChange={(e: any) =>
            setConstants({ ...constants, testDuration: e.target.value })
          }
          value={constants.testDuration}
          id="test-duration"
          className={inputStyle}
          type="text"
          placeholder="60"
        />
        <label>Number Of Users/Connections:</label>
        <input
          onChange={(e: any) =>
            setConstants({ ...constants, numOfUsers: e.target.value })
          }
          value={constants.numOfUsers}
          id="connections"
          className={inputStyle}
          type="text"
          placeholder="50"
        />
        <label>Throughput (requests/sec):</label>
        <input
          onChange={(e: any) =>
            setConstants({ ...constants, throughput: e.target.value })
          }
          value={constants.throughput}
          id="throughput"
          className={inputStyle}
          type="text"
          placeholder="100"
        />
      </form>

      <form id="testing-params" className="flex flex-col gap-3">
        <h1 className="text-2xl">Testing Parameters</h1>

        <label>Route:</label>
        <input
          onChange={(e: any) =>
            setParams({ ...params, route: e.target.value })
          }
          value={params.route}
          id="route"
          className={inputStyle}
          type="text"
          placeholder="/api/route"
        />
        <label>HTTP Method:</label>
        <select
          onChange={(e: any) => {
            setParams({ ...params, method: e.target.value });
            setIsPost((prev) => !prev);
          }}
          className={`${inputStyle} text-sm`}
          name="choose-method"
          id="method"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
        </select>
        <label>Ratio:</label>
        <input
          onChange={(e: any) =>
            setParams({ ...params, ratio: e.target.value })
          }
          value={params.ratio}
          id="ratio"
          className={inputStyle}
          type="text"
          placeholder="1"
        />

        {isPost ? (
          <div className="">
            <h3>POST Request Body:</h3>
            <p>(Must be in JSON format)</p>
            <textarea
              onChange={(e: any) =>
                setParams({
                  ...params,
                  body: e.target.value,
                })
              }
              placeholder={`{ "key": "value", "firstName": "Steven" }`}
              className={`${inputStyle} w-full h-24`}
              name="body"
              id="body"
              cols={5}
              rows={10}
            ></textarea>
          </div>
        ) : null}

        <button
          onClick={() => addMethod()}
          className="bg-gradient-to-r from-slate-800 via-slate-500 to-slate-800 p-2 mt-9 mb-3 rounded-md cursor-pointer text-sky-300 hover:text-white hover:scale-105 font-medium transition-all shadow-md shadow-amber-600"
          type="button"
        >
          Add Method
        </button>
        <button
          onClick={() => startTest(constants, methods)}
          className="bg-gradient-to-r from-slate-800 via-slate-500 to-slate-800 p-2 mt-6 mb-3 rounded-md cursor-pointer text-sky-300 hover:text-white hover:scale-105 font-medium transition-all shadow-md shadow-amber-600"
          type="button"
        >
          Start Test
        </button>
      </form>
    </section>
  )
}