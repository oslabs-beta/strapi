import React from 'react';
import Link from 'next/link';
import utilStyles from '../../src/styles/utils.module.css';

const Sidebar = () => {
  return (
    <nav className=" grow p-4 shrink-0 h-full w-1/5 max-w-xs flex flex-col items-start gap-4 bg-stone-500/[.2] rounded-3xl m-8 outline outline-1 outline-slate-700 bg-opacity-50 shadow-cyan-500/10x">
      <p className=" text-2xl font-light">Navigation Panel</p>
      <Link
        className=""
        href="/dashboard"
      >
        <button className="cursor-pointer hover:text-sky-300 hover:scale-110 hover:underline decoration-amber-600 transition-all">New Test</button>
      </Link>
      <Link
        className=""
        href="dashboard/metrics"
      >
        <button className="cursor-pointer hover:text-sky-300 hover:scale-110 hover:underline decoration-amber-600 transition-all">Grafana Metrics</button>
      </Link>
    </nav>
  );
};

export default Sidebar;
