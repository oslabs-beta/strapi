import React, { useContext } from "react";
import { CurrentMethodsContext } from "../index";

export const CurrentMethods = () => {

  const { methods, setMethods, ratioSum, setRatioSum } = useContext(CurrentMethodsContext);
  //delete params from methods array
  const deleteMethod = (el: any) => {
    const idx = el.id;
    setRatioSum(Number(ratioSum) - Number(methods[idx].ratio));
    const newMethods = methods;
    newMethods.splice(idx, 1);
    setMethods([...newMethods]);
  };
  return(
    <section className="mt-6 mb-40 w-full max-w-7xl relative">
          <h1 className="text-2xl mt-3 mb-3">Current Methods:</h1>
          <div className="text-lg text-center w-full grid grid-cols-5 border-b border-b-amber-500">
            <p>Route</p>
            <p>HTTP Method</p>
            <p>Request Body</p>
            <p>Ratio</p>
            <p className="">Delete Method</p>
          </div>
          <ul className=" flex flex-col text-center gap-4 w-full">
            {methods.map((method, index) => {
              return (
                <li
                  key={index}
                  id={index.toString()}
                  className="w-full grid grid-cols-5"
                >
                  <p className="mt-1 overflow-x-hidden">{method.route}</p>
                  <p className="mt-1">{method.method}</p>
                  {method.method === 'POST' ? (
                    <p className="mt-1 overflow-hidden text-center ">
                      {method.body}
                    </p>
                  ) : (
                    'N/A'
                  )}
                  <p className="mt-1">
                    {method.ratio}:{ratioSum}
                  </p>
                  <div className="">
                    <button
                      id={index.toString()}
                      onClick={(e) => deleteMethod(e.target)}
                      className=" self-center w-20 mt-1 mb-1 rounded-md bg-gradient-to-r from-slate-800 cursor-pointer text-sky-300 hover:text-white hover:scale-105 font-medium transition-all shadow shadow-amber-600"
                    >
                      DELETE
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
  )
}