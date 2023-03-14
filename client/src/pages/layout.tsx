import React from 'react';
import Header from '../../components/Header/Header';
import Head from 'next/head';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>strAPI</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <div className="container">
        <Header />
        {children}
      </div>
    </>
  );
};

export default Layout;