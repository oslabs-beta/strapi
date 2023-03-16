import React from 'react';
import styles from './panel.module.css';

type PanelProps = {
  url: string;
  index: number;
  deletePanel: (id: any) => Promise<void>;
};

const Panel = ({ url, index, deletePanel }: PanelProps): JSX.Element => {
  return (
    <div>
      <button
        id={index.toString()}
        onClick={(e: any) => deletePanel(e.target.id)}
        className={styles.btnDelete}
      >
        X
      </button>
      <iframe src={url} className={styles.panel}></iframe>
    </div>
  );
};

export default Panel;
