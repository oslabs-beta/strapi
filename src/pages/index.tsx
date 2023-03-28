import Head from 'next/head';
import Layout from './layout';
import styles from './home/home.module.css';
import Image from 'next/image';

export default function Home() {
  return (
    <Layout>
      {/* <main className={styles.homeContainer}> */}
      <main className=" flex flex-col items-center p-18 h-full w-full max-w-screen-2xl">
        <div className = "relative">
          <div className= "absolute inset-0 bg-orange-300 rounded-full blur-3xl"></div>
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
        <h1 className="text-5xl pt-8">
          Welcome to Str<span className=" text-amber-600 font-normal">API</span>
          !
        </h1>

        <p className=" text-2xl m-8">
          Stress test your application, to destress your occupation.
        </p>
        <p className=" text-2xl m-8">Click "Dashboard" to get started!</p>
        <p className="text-2xl m-8">
          The free and open-source stress-test app that helps you keep your API
          routes running efficiently, without breaking the bank!
        </p>
      </main>
    </Layout>
  );
}
