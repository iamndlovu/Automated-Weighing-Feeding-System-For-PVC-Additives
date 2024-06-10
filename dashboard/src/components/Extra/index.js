import React from 'react';

import styles from './Extra.module.scss';

const ExtraInfo = ({ user, logoutHandler, toggle }) => {
  let { fullName } = user;
  fullName ? console.log(fullName) : (fullName = 'unknown');

  return (
    <article className={styles.Extra}>
      <header>
        <h1>intelligent condenser monitoring & control system</h1>
        <p>
          <span>
            Logged in as: <span>{fullName.toLowerCase()}</span>
          </span>
          <span>
            <button onClick={() => logoutHandler()}>logout</button>
          </span>
        </p>
      </header>
      <menu>
        <nav>
          <ul>
            <li>
              <button onClick={() => toggle()}>historical data</button>
            </li>
            <li>
              <button>system users</button>
            </li>
            <li>
              <button>add user</button>
            </li>
          </ul>
        </nav>
      </menu>
    </article>
  );
};

export default ExtraInfo;
