import React from 'react';
import Link from 'next/link';
import styles from './sidebar.module.css';
import utilStyles from '../../src/styles/utils.module.css';

const Sidebar = () => {
  return (
    <nav className=" p-4 shrink-0 h-full w-1/5 max-w-xs flex flex-col items-start gap-4">
      <p className=" text-2xl font-light">Navigation Panel</p>
      <Link
        className="cursor-pointer hover:text-sky-300 hover:scale-110 hover:underline decoration-amber-600 transition-all"
        href="/dashboard"
      >
        <button className="">New Test</button>
      </Link>
      <Link
        className="cursor-pointer hover:text-sky-300 hover:scale-110 hover:underline decoration-amber-600 transition-all"
        href="dashboard/metrics"
      >
        <button className="">Grafana Metrics</button>
      </Link>
    </nav>
  );
};

export default Sidebar;
