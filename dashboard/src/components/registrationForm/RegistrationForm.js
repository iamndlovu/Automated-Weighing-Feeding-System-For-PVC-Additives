import React, { useState } from 'react';
import axios from 'axios';

import styles from '../loginForm/LoginForm.module.scss';

const RegistrationForm = ({ handler }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const onChangeFirstName = (e) => setFirstName(e.target.value);
  const onChangeLastName = (e) => setLastName(e.target.value);
  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);
  const onChangeConfirm = (e) => setConfirm(e.target.value);

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert('Passwords do not match');
      return;
    }
    const fullName = `${firstName} ${lastName}`;
    const newUser = { email, password, fullName };
    axios
      .post('http://localhost:5000/users/add', newUser)
      .then((res) => res.data)
      .then((data) => console.log(data))
      .then(() => alert('User added'))
      .then(() => window.document.location.reload(true))
      .catch((error) => alert(error));
  };

  return (
    <form
      className={styles.LoginForm}
      onSubmit={onSubmitForm}
      style={{
        margin: '1.3rem 0',
        flexBasis: '500px',
      }}
    >
      <div className={styles.formGroup}>
        <label htmlFor='firstname' className={styles.offscreen}>
          Your First Name
        </label>
        <input
          type='text'
          name='firstname'
          id='firstname'
          placeholder='First Name'
          value={firstName}
          onChange={onChangeFirstName}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='lastname' className={styles.offscreen}>
          Your Last Name(s)
        </label>
        <input
          type='text'
          name='lastname'
          id='lastname'
          placeholder='Last Name(s)'
          value={lastName}
          onChange={onChangeLastName}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='email' className={styles.offscreen}>
          Your email address
        </label>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='Email'
          value={email}
          onChange={onChangeEmail}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='password' className={styles.offscreen}>
          Your password
        </label>
        <input
          type='password'
          name='password'
          id='password'
          placeholder='Password'
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='confirm' className={styles.offscreen}>
          Confirm password
        </label>
        <input
          type='password'
          name='confirm'
          id='confirm'
          placeholder='Confirm Password'
          value={confirm}
          onChange={onChangeConfirm}
          required
        />
      </div>
      <input type='submit' value='Submit' />
    </form>
  );
};

export default RegistrationForm;
