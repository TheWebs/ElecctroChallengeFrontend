import { React, useContext } from 'react';
import axios from 'axios';

import Login from './components/login';
import Register from './components/register';
import Todos from './components/todos';
import { TodosAppContext } from './contexts/todosAppContext';
import Profile from './components/profile';

axios.defaults.baseURL = 'http://localhost:4000/';

function App() {
  const {
    showLogin, isLoggedIn, showRegister, showProfile,
  } = useContext(TodosAppContext);
  return (
    <div>
      {showLogin && !isLoggedIn && (
        <Login />
      )}
      {showRegister && !isLoggedIn && (
        <Register />
      )}
      {isLoggedIn && !showProfile && (
        <Todos />
      )}
      {isLoggedIn && showProfile && (
        <Profile />
      )}
    </div>
  );
}

export default App;
