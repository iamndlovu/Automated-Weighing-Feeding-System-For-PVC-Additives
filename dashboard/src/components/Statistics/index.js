import React from 'react';

import styles from './Statistics.module.scss';

const Statistics = ({
  avgPH,
  minPH,
  maxPH,
  avgConductivity,
  minConductivity,
  maxConductivity,
}) => {
  return (
    <article className={styles.Statistics}>
      <h1>statistics</h1>
      <div>
        <article>
          <h2>pH</h2>
          <ul>
            <li>
              <span>Average</span>
              <span>{avgPH}</span>
            </li>
            <div className={styles.line}></div>
            <li>
              <span>Minimum</span>
              <span>{minPH}</span>
            </li>
            <div className={styles.line}></div>
            <li>
              <span>Maximum</span>
              <span>{maxPH}</span>
            </li>
            <div className={styles.line}></div>
          </ul>
        </article>
        <article>
          <h2>Conductivity</h2>
          <ul>
            <li>
              <span>Average</span>
              <span>{avgConductivity}</span>
            </li>
            <div className={styles.line}></div>
            <li>
              <span>Minimum</span>
              <span>{minConductivity}</span>
            </li>
            <div className={styles.line}></div>
            <li>
              <span>Maximum</span>
              <span>{maxConductivity}</span>
            </li>
            <div className={styles.line}></div>
          </ul>
        </article>
      </div>
    </article>
  );
};

export default Statistics;
