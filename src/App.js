import React, { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => { //whenever you have an action that should execute in response to some other action that is a side effect
    const storedUserLoggedInformation = localStorage.getItem('isLoggedIn')
    if(storedUserLoggedInformation === '1') {
      setIsLoggedIn(true)
    }
  }, []) //runs only when the app starts, becz dependencies haven't changed

  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn', '1')
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogout: logoutHandler}}>
        <MainHeader />
        <main>
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;
