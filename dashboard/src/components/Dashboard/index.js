import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './Dashboard.module.scss';
import fstyles from '../loginForm/LoginForm.module.scss';
import bstyles from '../../box.module.scss';

class Blend {
  constructor(type, add1, add2, add3) {
    this._type = type;
    this._add1 = add1;
    this._add2 = add2;
    this._add3 = add3;
  }

  get type() {
    return this._type;
  }

  get add1() {
    return this._add1;
  }

  get add2() {
    return this._add2;
  }

  get add3() {
    return this._add3;
  }

  get total() {
    return this.add1 + this.add2 + this.add3;
  }
}

const blends = [
  new Blend('None', 0, 0, 0),
  new Blend('Sewer', 2, 3, 4),
  new Blend('U-PVC', 4, 3, 5),
  new Blend('M-PVC', 3, 5, 1),
  new Blend('Conduit', 5, 4, 3),
  new Blend('HDPE', 1, 6, 3),
];

const Dashboard = ({ logoutHandler }) => {
  const [pvc, setPvc] = useState(0);
  const [servos, setServos] = useState([false, false, false]);
  const [weight, setWeight] = useState(0);
  const [ReqPvc, setReqPvc] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pvcRes = await axios.get('http://localhost:5000/pvc');
        setPvc(pvcRes.data);

        const servRes = await axios.get('http://localhost:5000/servo');
        setServos(servRes.data);

        const weightRes = await axios.get('http://localhost:5000/weight');
        setWeight(weightRes.data);
      } catch (err) {
        console.error(`Failed to fetch data from server:\n\t\t${err}`);
      }
    };

    const fetchDataPeriodically = setInterval(() => fetchData(), 500);

    return () => {
      clearInterval(fetchDataPeriodically);
    };
  }, []);

  return (
    <div className={styles.Dashboard}>
      <header
        style={{
          backgroundColor: 'black',
          color: 'white',
          padding: '1rem 2rem',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <h1 style={{ textTransform: 'uppercase' }}>
          Automated Weighing & Feeding System For PVC Additives
        </h1>
        <button
          onClick={() => logoutHandler()}
          style={{
            position: 'absolute',
            top: '1.1rem',
            right: '2rem',
            padding: '0.2rem',
            cursor: 'pointer',
          }}
        >
          LOGOUT
        </button>
      </header>
      <main className={styles.container}>
        {/* PVC BLEND SELECTION */}
        <section className={styles.sectionContainer}>
          <h1>PVC BLEND SELECTION</h1>
          <form
            className={fstyles.LoginForm}
            onSubmit={async (e) => {
              e.preventDefault();

              const isLoadingCompleteRes = await axios.get(
                'http://localhost:5000/complete'
              );
              const isLoadingComplete = isLoadingCompleteRes.data;

              const retry = async () => {
                for (let i = 0; i < 5; i++) {
                  const pvcReq = await axios.post('http://localhost:5000/pvc', {
                    data: ReqPvc,
                  });
                  if (pvcReq.status === 200) {
                    setPvc(ReqPvc);
                    break;
                  }
                }
              };

              if (isLoadingComplete) {
                await retry();
              } else {
                window.alert('Loading in progress.\nPlease wait');
              }
            }}
          >
            <div className={fstyles.formGroup}>
              <label htmlFor='blend' className={fstyles.offscreen}>
                Select PVC blend
              </label>
              <select
                name='blend'
                id='blend'
                placeholder='PVC blend'
                value={ReqPvc}
                onChange={(e) => setReqPvc(e.target.value)}
                required
              >
                {blends.map((blend, index) => (
                  <option value={index} key={blend.type}>
                    {blend.type}
                  </option>
                ))}
              </select>
            </div>
            <article>
              <ul>
                <li>
                  <span>ADDITIVE 1:</span> <span>{blends[ReqPvc].add1} KG</span>
                </li>
                <li>
                  <span>ADDITIVE 2:</span> <span>{blends[ReqPvc].add2} KG</span>
                </li>
                <li>
                  <span>ADDITIVE 3:</span> <span>{blends[ReqPvc].add3} KG</span>
                </li>
                <li>
                  <span>TOTAL:</span> <span>{blends[ReqPvc].total} KG</span>
                </li>
              </ul>
            </article>
            <br />
            <br />
            <input type='submit' value='load' />
          </form>
        </section>
        {/* PVC BLEND BEING LOADED */}
        <section className={styles.sectionContainer}>
          <h1>PVC BLEND LOADING</h1>
          <form className={fstyles.LoginForm}>
            <article>
              <ul>
                <li>
                  <h3>
                    <span>blend:</span> <span>{blends[pvc].type}</span>
                  </h3>
                </li>
                <li>
                  <span>current weight:</span>{' '}
                  <span>{(weight + Math.random()).toFixed(2)}</span>
                </li>
                <li>
                  <span>target weight:</span> <span>{blends[pvc].total}</span>
                </li>
                <li>
                  <span>Conveyor 1:</span>{' '}
                  <span
                    className={`${bstyles.box} ${
                      servos[0] ? bstyles.success : bstyles.default
                    }`}
                  ></span>
                </li>
                <li>
                  <span>Conveyor 2:</span>{' '}
                  <span
                    className={`${bstyles.box} ${
                      servos[1] ? bstyles.success : bstyles.default
                    }`}
                  ></span>
                </li>
                <li>
                  <span>Conveyor 3:</span>{' '}
                  <span
                    className={`${bstyles.box} ${
                      servos[2] ? bstyles.success : bstyles.default
                    }`}
                  ></span>
                </li>
              </ul>
            </article>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
