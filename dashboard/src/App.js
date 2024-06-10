import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import LoginForm from './components/loginForm/LoginForm';

const Login = ({ handler, tempHandle, logout, user }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100vh',
    }}
  >
    <header
      style={{
        backgroundColor: 'black',
        color: 'white',
        padding: '1rem 2rem',
        textAlign: 'center',
      }}
    >
      <h1 style={{ textTransform: 'uppercase' }}>
        Automated Weighing & Feeding System For PVC Additives
      </h1>
    </header>

    <main
      style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <section
        style={{
          width: '45rem',
          margin: 'auto',
        }}
      >
        <LoginForm
          handler={handler}
          tempHandle={tempHandle}
          logout={logout}
          user={user}
        />
      </section>
    </main>

    <footer
      style={{
        padding: '1rem 2rem',
        borderTop: '1px solid #333',
      }}
    >
      <p
        style={{
          textAlign: 'center',
        }}
      >
        &copy; {new Date().getFullYear()} CompanyName. All Rights Reserved
      </p>
    </footer>
  </div>
);

const App = () => {
  const [user, setUser] = useState(null);
  const [temp, setTemp] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem(
      'automated-weighing-feeding-sysm-4-pvc-additives-user'
    );
    setTemp(false);
    setUser(null);
  };

  const loginHandler = (user) => {
    localStorage.setItem(
      'automated-weighing-feeding-sysm-4-pvc-additives-user',
      JSON.stringify(user)
    );
    setUser(user);
    tempHandle(user.temp);
  };

  const tempHandle = (val = true) => {
    setTemp(val);
  };

  useEffect(() => {
    const localUser = localStorage.getItem(
      'automated-weighing-feeding-sysm-4-pvc-additives-user'
    );

    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  return (
    <div className='App'>
      {user && !user.temp && !temp ? (
        <Dashboard user={user} logoutHandler={logoutHandler} />
      ) : (
        <Login
          handler={loginHandler}
          tempHandle={tempHandle}
          user={user}
          logout={logoutHandler}
        />
      )}
    </div>
  );
};

export default App;
