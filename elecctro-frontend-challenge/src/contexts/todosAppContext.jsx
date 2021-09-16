import React, { createContext, useState } from 'react';
import Swal from 'sweetalert2';

export const TodosAppContext = createContext();

const TodosAppContextProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
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

  const openProfile = () => {
    setShowProfile(true);
  };

  const closeProfile = () => {
    setShowProfile(false);
  };

  const setLoggedIn = (value) => {
    setIsLoggedIn(value);
    if (value) {
      setShowRegister(false);
      setShowLogin(false);
    } else {
      setShowProfile(false);
      setShowLogin(true);
    }
  };

  const setUser = (user) => {
    setUserData(user);
  };

  const setUserToken = (userToken) => {
    setToken(userToken);
  };

  const validateEmail = (emailToValidate) => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailToValidate)) {
      return true;
    }
    return false;
  };

  const handleServerErrors = async (error) => {
    if (error.response.status === 401) {
      Swal.fire('Ups ...', 'A sua sessão expirou!', 'error');
      setLoggedIn(false);
    } else {
      Swal.fire('Ups ...', error.response.data.error, 'error');
    }
  };

  return (
    <TodosAppContext.Provider value={{
      showLogin,
      openLogin,
      showRegister,
      openRegister,
      openProfile,
      closeProfile,
      showProfile,
      isLoggedIn,
      setLoggedIn,
      userData,
      setUser,
      getTokenFromCookies,
      token,
      setUserToken,
      handleServerErrors,
      validateEmail,
    }}
    >
      {
         children
      }
    </TodosAppContext.Provider>
  );
};

export default TodosAppContextProvider;
