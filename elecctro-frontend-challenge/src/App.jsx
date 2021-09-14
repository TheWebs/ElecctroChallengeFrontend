import { React, useContext } from 'react';
import axios from 'axios';

import Login from './components/login';
import Register from './components/register';
import Todos from './components/todos';
import { TodosAppContext } from './contexts/todosAppContext';

axios.defaults.baseURL = 'http://localhost:4000/';

function App() {
  const { showLogin, isLoggedIn, showRegister } = useContext(TodosAppContext);
  return (
    <div>
      {showLogin && !isLoggedIn && (
        <Login />
      )}
      {showRegister && !isLoggedIn && (
        <Register />
      )}
      {isLoggedIn && (
        <Todos />
      )}
    </div>
  );
}

export default App;
