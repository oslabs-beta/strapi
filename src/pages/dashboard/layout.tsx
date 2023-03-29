import React from 'react';
import Layout from '../layout';
import Sidebar from '../../../components/Sidebar/Sidebar';

const DashLayout = ({ children }) => {
  return (
    <Layout>
      <section className="grow flex justify-between relative w-full pb-20">
        <Sidebar />
        {children}
      </section>
    </Layout>
  );
};

export default DashLayout;
