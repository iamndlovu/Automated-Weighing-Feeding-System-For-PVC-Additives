import React from 'react';

import styles from './DissolvedContainer.module.scss';
import boxStyles from '../../box.module.scss';

const DissolvedContainer = ({ heater, dissolvedVal, buzzer }) => {
  if (dissolvedVal == null) dissolvedVal = '';
  return (
    <article className={styles.DissolvedContainer}>
      <div className={styles.dissolvedTxt}>
        <span className={styles.dissolvedHead}>
          Dissolved O<sub>2</sub>:
        </span>
        <span className={styles.dissolvedVal}>
          {dissolvedVal.toUpperCase()}
        </span>
      </div>
      <div className={styles.dissolvedScale}>
        <span className={styles.dissolvedScaleCenterMark}></span>
        <span
          className={styles.dissolvedScaleFill}
          style={
            dissolvedVal.toUpperCase() === 'NORMAL'
              ? { backgroundColor: 'rgb(12, 245, 12)', width: '50%' }
              : { backgroundColor: 'rgb(255, 10, 12)', width: '100%' }
          }
        ></span>
        <div className={styles.normalTxt}>NORMAL</div>
        <div className={styles.highTxt}>HIGH</div>
      </div>
      <div className={styles.dissolvedAction}>
        <div>
          <span>Heater</span>
          <span
            className={
              heater
                ? `${boxStyles.box} ${boxStyles.success}`
                : `${boxStyles.box} ${boxStyles.default}`
            }
          ></span>
        </div>
        <div>
          <span>Buzzer</span>
          <span
            className={
              buzzer
                ? `${boxStyles.box} ${boxStyles.success}`
                : `${boxStyles.box} ${boxStyles.default}`
            }
          ></span>
        </div>
      </div>
    </article>
  );
};

export default DissolvedContainer;
