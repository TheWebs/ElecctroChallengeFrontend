import { React, useState } from 'react';
// import UserContext from './contexts/user';
import './App.css';
import Login from './components/login';
import Register from './components/register';
import UserContext from './contexts/userContext';

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const openRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const setLoggedIn = (value) => {
    setIsLoggedIn(value);
    if (value) {
      setShowRegister(false);
      setShowLogin(false);
    } else {
      setShowLogin(true);
    }
  };

  return (
    <UserContext.Provider
      value={{ openLogin, openRegister, setLoggedIn }}
    >
      <div className="App">
        {showLogin && !isLoggedIn && (
          <Login />
        )}
        {showRegister && !isLoggedIn && (
          <Register />
        )}
        {isLoggedIn && (
          <Register />
        )}
      </div>
    </UserContext.Provider>
  );
}

export default App;
