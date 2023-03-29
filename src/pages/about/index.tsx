import React from 'react';
import Layout from '../layout';
import styles from './about.module.css';

const index = () => {
  return (
    <Layout>
      <main className="grid grid-cols-2">
        <div className="p-10 ">
          <h1 className="text-center text-5xl">About Strapi</h1>
          <p className={styles.aboutText}>
            StrAPI is designed to be a free and open-source alternative to
            load-test your API routes within Docker Containers
          </p>
          <p className={styles.aboutText}>
            Testing API routes within Docker containers and monitoring the
            health of the containers does not need to be difficult. In fact, it
            should be relatively easy.
          </p>
          <p className={styles.aboutText}>
            That's where StrAPI comes in! StrAPI is a light-weight program that
            allows you to visualize and test your Docker API routes, free of
            charge with peace of mind that everything is working as intended!
          </p>
        </div>
        <div className="mt-10">
          <h1 className="text-center text-5xl">Why StrAPI stands out</h1>
          <ul className="columns-2">
            <li className="p-10 text-center">
              <h3 className="text-amber-400">Cost Optimization</h3>
              <p>
                Quick cost estimates and insights to stay within budget
                constraints.
              </p>
            </li>
            <li className="p-10 text-center">
              <h3 className="text-amber-400">Data Visualization</h3>
              <p>
                Clear and interactive visual representation of cluster metric
                data.
              </p>
            </li>
            <li className="p-10 text-center">
              <h3 className="text-amber-400">User-friendly Interface</h3>
              <p>Easy to use interface for quick access to information.</p>
            </li>
            <li className="p-10 text-center">
              <h3 className="text-amber-400">Efficiency</h3>
              <p>Streamlines and improves the overall deployment process.</p>
            </li>
          </ul>
        </div>

        <div className="p-8">
          <h1 className="text-center text-5xl m-4">Installation</h1>
          <div className=" grid grid-cols-2">
            <div className="bg-gray-300 h-32 w-32">
              <h4 className="text-black">Youtube Video</h4>
              <div className="bg-black h-24 w-24"></div>
            </div>
            <div className="bg-gray-300 h-32 w-32">
              <h4 className="text-black">Github Read Me</h4>
              <div className="bg-black h-24 w-24"></div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default index;
