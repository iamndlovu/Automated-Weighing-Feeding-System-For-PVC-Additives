import React from 'react';
import GuageChart from 'react-gauge-chart';

import styles from './ConductivityContainer.module.scss';
import boxStyles from '../../box.module.scss';

const ConductivityContainer = ({ id, waterPump, conductivityVal }) => {
  return (
    <article className={styles.ConductivityContainer}>
      <div className={styles.conductivityTxt}>
        <span className={styles.conductivityHead}>Conductivity:</span>
        <span className={styles.conductivityVal}>{conductivityVal}</span>
      </div>
      <GuageChart
        id={id}
        nrOfLevels={10}
        arcPadding={0.1}
        cornerRadius={3}
        colors={['#00FF00', '#c30010']}
        percent={conductivityVal / 15000}
        textColor='transparent'
        style={{ marginBottom: '3rem' }}
        animate={false}
      />
      <div className={styles.conductivityAction}>
        <div>
          <span>Water Pump</span>
          <span
            className={
              waterPump
                ? `${boxStyles.box} ${boxStyles.success}`
                : `${boxStyles.box} ${boxStyles.default}`
            }
          ></span>
        </div>
      </div>
    </article>
  );
};

export default ConductivityContainer;
