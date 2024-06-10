import React from 'react';

import styles from './PhContainer.module.scss';
import boxStyles from '../../box.module.scss';

const PhContainer = ({ phVal, alkalinePump, acidPump }) => {
  const phFillColor = (phVal) => {
    if (phVal === 7) return 'rgb(255, 0, 255)';
    if (phVal < 7) return `rgb(255, 10, ${(50 * phVal) / 7})`;
    if (phVal > 7) return `rgb(${100 - (50 * phVal) / 7}, 100, 255)`;
  };

  const phFillStyle = {
    // backgroundColor: `rgb(${100 - (50 * phVal) / 7}, 0, ${(50 * phVal) / 7})`,
    backgroundColor: phFillColor(phVal),
    height: `${(100 * phVal) / 14}%`,
  };

  return (
    <article className={styles.PhContainer}>
      <div className={styles.phTxt}>
        <span className={styles.phHead}>PH:</span>
        <span className={styles.phVal}>{phVal}</span>
      </div>
      <div className={styles.phScale}>
        <span className={styles.phScaleCenterMark}></span>
        <span className={styles.phScaleFill} style={phFillStyle}></span>
      </div>
      <div className={styles.phAction}>
        <div>
          <span>Acid Pump</span>
          <span
            className={
              acidPump
                ? `${boxStyles.box} ${boxStyles.success}`
                : `${boxStyles.box} ${boxStyles.default}`
            }
          ></span>
        </div>
        <br />
        <div>
          <span>Alkaline Pump</span>
          <span
            className={
              alkalinePump
                ? `${boxStyles.box} ${boxStyles.success}`
                : `${boxStyles.box} ${boxStyles.default}`
            }
          ></span>
        </div>
      </div>
    </article>
  );
};

export default PhContainer;
