import React from 'react';
import Layout from '../layout';
import Sidebar from '../../../components/Sidebar/Sidebar';
import styles from './dashboard.module.css';

const DashLayout = ({ children }) => {
  return (
    <Layout>
      <section className="grow flex justify-between relative w-full">
        <Sidebar />
        {children}
      </section>
    </Layout>
  );
};

export default DashLayout;
