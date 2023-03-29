import React from 'react';
import Layout from '../layout';
import Link from 'next/link';
import Image from 'next/image';

const index = () => {
  const aboutText = 'm-6 text-xl';

  return (
    <Layout>
      <main className="grid grid-cols-2">
        <div className="p-10 ">
          <h1 className="text-center text-5xl">
            About Str<span className="text-amber-600">API</span>
          </h1>
          <p className={aboutText}>
            StrAPI is designed to be a free and open-source alternative to
            load-test your API routes.
          </p>
          <p className={aboutText}>
            Testing API routes and monitoring the health of the containers does
            not need to be difficult. In fact, it should be relatively easy.
          </p>
          <p className={aboutText}>
            That's where StrAPI comes in! StrAPI is a light-weight program that
            allows you to visualize and test your API routes, free of charge
            with peace of mind that everything is working as intended!
          </p>
        </div>
        <div className="mt-10">
          <h1 className="text-center text-5xl">
            Why Str<span className="text-amber-600">API</span> stands out
          </h1>
          <ul className="columns-2">
            <li className="p-10 text-center">
              <h3 className="text-amber-600">Cost Optimization</h3>
              <p>
                Quick cost estimates and insights to stay within budget
                constraints.
              </p>
            </li>
            <li className="p-10 text-center">
              <h3 className="text-amber-600">Data Visualization</h3>
              <p>
                Clear and interactive visual representation of cluster metric
                data.
              </p>
            </li>
            <li className="p-10 text-center">
              <h3 className="text-amber-600">User-friendly Interface</h3>
              <p>Easy to use interface for quick access to information.</p>
            </li>
            <li className="p-10 text-center">
              <h3 className="text-amber-600">Efficiency</h3>
              <p>Streamlines and improves the overall deployment process.</p>
            </li>
          </ul>
        </div>

        <div className="p-8">
          <h1 className="text-center text-5xl m-4">Installation</h1>
          <div className="relative flex justify-center gap-5 items-center">
            {/* <h4>Github Read Me</h4> */}
            <Image
              src="/github-mark.png"
              alt="github logo"
              width={50}
              height={50}
            />
            <Link
              className="text-blue-300 text-xl"
              href="https://github.com/oslabs-beta/strapi"
              target="_blank"
            >
              GitHub ReadMe
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default index;
