import React, { createContext, useState } from 'react';

export const TodosAppContext = createContext();

const TodosAppContextProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState(undefined);

  const getCookie = (cname) => {
    const name = `${cname}=`;
    // eslint-disable-next-line no-undef
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  };

  const getTokenFromCookies = () => {
    const foundToken = getCookie('todosAppToken');
    if (foundToken === '') {
      return false;
    }

    return foundToken;
  };

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

  const setUser = (user) => {
    setUserData(user);
  };

  const setUserToken = (userToken) => {
    setToken(userToken);
  };

  return (
    <TodosAppContext.Provider value={{
      showLogin,
      openLogin,
      showRegister,
      openRegister,
      isLoggedIn,
      setLoggedIn,
      userData,
      setUser,
      getTokenFromCookies,
      token,
      setUserToken,
    }}
    >
      {
         children
      }
    </TodosAppContext.Provider>
  );
};

export default TodosAppContextProvider;
