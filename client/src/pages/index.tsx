import Head from 'next/head';
import Layout from './layout';
import styles from './home/home.module.css';
import Image from 'next/image';

export default function Home() {
  return (
    <Layout>
      {/* <main className={styles.homeContainer}> */}
      <main className=" border-4 flex flex-col items-center p-14 bg-slate-600 h-full w-full max-w-screen-2xl">
        <Image
          src="/logo.png"
          alt="strAPI logo"
          height={250}
          width={250}
          className=""
        />
        {/* <h1 className={styles.welcomeText}>Welcome to strAPI!</h1> */}
        {/* <h1 className=" text-5xl cursor-pointer hover:text-blue-400"> */}
        <h1 className="text-5xl h1 cursor-pointer hover:text-blue-400">
          Welcome to strAPI!
        </h1>

        <p className=" text-2xl m-8">
          Stress test your application, to destress your occupation.
        </p>
        <p className="text-2xl m-8">
          The free and open-source stress-test app that helps you keep your API
          routes and Docker containers running efficiently, without breaking the
          bank!
        </p>
      </main>
    </Layout>
  );
}
