import React, { useEffect, useState, useRef } from 'react';
import DashLayout from './layout';
import styles from './dashboard.module.css';
import Panel from '../../../components/Panel/Panel';
import { FC } from 'react';

const Metrics: FC = () => {
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [urlSrc, setUrlSrc] = useState('');

  const srcRef = useRef(null);

  // fetches data from /api/panels.ts. Next.js does not recommend fetching like this, but in order to get responsive state and complete our read/write operations to our JSON file, this is the best approach.
  const getData = async (): Promise<void> => {
    const res = await fetch('/api/panels', {
      method: 'GET',
      headers: { 'Content-Type': 'Application/JSON' },
    });
    const data = await res.json();
    // NOTE: we are using a .json file as our storage, so we also need to parse the file contents using JSON.parse()
    const panelUrls: string[] = JSON.parse(data);
    setUrls(panelUrls);
    setIsLoading(false);
  };

  // runs on initial page render
  useEffect(() => {
    setIsLoading(true);
    getData();
  }, []);

  const addPanel = async (): Promise<void> => {
    // console.log(srcRef.current.value);
    const body = {
      newUrl: srcRef.current.value,
    };

    try {
      await fetch('/api/panels', {
        method: 'POST',
        headers: { 'Content-Type': 'Application/JSON' },
        body: JSON.stringify(body),
      });
      getData();
    } catch (err) {
      throw new Error('Unable to add iframe src.');
    }
  };

  const deletePanel = async (id: any): Promise<void> => {
    const body = {
      urlIndex: Number(id),
    };

    try {
      await fetch('/api/panels', {
        method: 'DELETE',
        headers: { 'Content-Type': 'Application/JSON' },
        body: JSON.stringify(body),
      });
    } catch (err) {}
  };

  return (
    <DashLayout>
      <main className={styles.metricsContainer}>
        <section className={styles.info}>
          <h1 className={styles.pageTitle}>Live System Metrics:</h1>
          <p className={styles.credit}>Courtesy of Grafana &copy;</p>

          <label className={styles.addPanelLabel}>
            Add Grafana Metric Panel:
          </label>
          <input
            ref={srcRef}
            className={`${styles.panelSrcInput}`}
            type="text"
            placeholder="Grafana iframe 'src' attribute"
          />
          <button
            onClick={() => addPanel()}
            className={`${styles.btnAddPanel}`}
          >
            Add Panel
          </button>
        </section>

        {isLoading ? (
          <h1>Loading metrics...</h1>
        ) : (
          urls.map((url: string, index: number) => {
            return (
              <Panel
                key={index.toString()}
                url={url}
                index={index}
                deletePanel={deletePanel}
              />
            );
          })
        )}
      </main>
    </DashLayout>
  );
};

export default Metrics;

/*
[
  "http://localhost:4000/d-solo/rYdddlPWj/node-exporter-full?orgId=1&refresh=1m&from=1678802384870&to=1678813184870&panelId=77",
  "http://localhost:4000/d-solo/rYdddlPWj/node-exporter-full?orgId=1&refresh=1m&from=1678715094713&to=1678725894713&panelId=9",
  "http://localhost:4000/d-solo/rYdddlPWj/node-exporter-full?from=1678732293535&to=1678743093535&orgId=1&panelId=60"
]

*/
