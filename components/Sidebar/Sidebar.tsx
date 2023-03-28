import React from 'react';
import Link from 'next/link';
import styles from './sidebar.module.css';
import utilStyles from '../../src/styles/utils.module.css';

const Sidebar = () => {
  return (
    <nav className=" p-4 shrink-0 h-full w-1/5 max-w-xs flex flex-col items-start gap-4">
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
