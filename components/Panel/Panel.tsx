import React from 'react';

type PanelProps = {
  url: string;
  index: number;
  deletePanel: (id: any) => Promise<void>;
};

const Panel = ({ url, index, deletePanel }: PanelProps): JSX.Element => {
  return (
    <div>
      <button
        id={index.toString()}
        onClick={(e: any) => deletePanel(e.target.id)}
        className={
          'p-2 mt-3 mb-6 rounded cursor-pointer text-red-300 hover:text-white hover:scale-105 font-medium transition-all shadow shadow-sky-300'
        }
      >
        Remove Panel
      </button>
      <iframe
        src={url}
        className=" w-full h-96 border-none rounded-xl"
      ></iframe>
    </div>
  );
};

export default Panel;
