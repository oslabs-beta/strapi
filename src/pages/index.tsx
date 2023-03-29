import Head from 'next/head';
import Layout from './layout';
import styles from './home/home.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      {/* <main className={styles.homeContainer}> */}
      <main className=" flex flex-col items-center p-18 h-full w-full max-w-screen-2xl mt-20">
        <div className="relative">
          <div className="absolute inset-0 bg-orange-300 rounded-full blur-3xl"></div>
          <Image
            src="/logo-removebg-preview.png"
            alt="strAPI logo"
            height={250}
            width={250}
            className="relative border-none bg-none"
          />
        </div>
        {/* <h1 className={styles.welcomeText}>Welcome to strAPI!</h1> */}
        {/* <h1 className=" text-5xl cursor-pointer hover:text-blue-400"> */}
        <h1 className="text-6xl pt-8">
          Welcome to Str<span className=" text-amber-600 font-normal">API</span>
          !
        </h1>

        <p className=" text-2xl m-3">
          <i className="font-thin">
            Stress test your application to destress your occupation.
          </i>
        </p>
        <p className=" text-2xl m-3">
          Click <Link href="/dashboard">Dashboard</Link> to get started!
        </p>
      </main>
    </Layout>
  );
}
