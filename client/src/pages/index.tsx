import Head from 'next/head';
import Layout from './layout';
import styles from './home/home.module.css';
import Image from 'next/image';

export default function Home() {
  return (
    <Layout>
      <main className={styles.homeContainer}>
        <Image
          src="/logo.png"
          alt="strAPI logo"
          height={250}
          width={250}
          className={styles.logo}
        />
        <h1 className={styles.welcomeText}>Welcome to strAPI!</h1>
        <p className={styles.stressTest}>
          Stress test your application, to destress your occupation.
        </p>
        <p className={styles.about}>
          The free and open-source stress-test app that helps you keep your API
          routes and Docker containers running efficiently, without breaking the
          bank!
        </p>
      </main>
    </Layout>
  );
}
