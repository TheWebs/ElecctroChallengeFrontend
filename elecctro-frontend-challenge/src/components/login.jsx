import {
  React, useContext, useEffect, useState,
} from 'react';
import '../styles/style.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TodosAppContext } from '../contexts/todosAppContext';

function Login() {
  const {
    openRegister, getTokenFromCookies, setUser, setLoggedIn,
  } = useContext(TodosAppContext);

  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  const tryLogin = async () => {
    const token = getTokenFromCookies();
    if (token) {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
      try {
        const result = await axios.get('/me');
        if (result.status === 200) {
          /* console.log('Token found and valid'); */
          setUser(result.data);
          setLoggedIn(true);
        } else {
          /* console.log('Token found not valid'); */
          setLoading(false);
        }
      } catch (error) {
        if (!error.response) {
          return;
        }
        if (error.response.status === 401) {
          setLoggedIn(false);
          setLoading(false);
        }
      }
    } else {
      /* console.log('Token not found'); */
      setLoading(false);
    }
  };

  const login = () => {
    axios.post('/login', {
      email,
      password,
    }, {
      withCredentials: true,
    }).then((result) => {
      axios.defaults.headers.common = { Authorization: `Bearer ${result.data}` };
      tryLogin();
    }).catch(() => {
      Swal.fire('Ups ...', 'Dados de login inválidos!', 'error');
    });
  };

  useEffect(() => {
    tryLogin();
  }, []);

  return (
    <div>
      {!loading && (
        <div>
          <h1 className="text-white title">Login</h1>
          <div className="login-card card">
            <form>
              <input
                onChange={(event) => {
                  setEmail(event.currentTarget.value);
                }}
                className="form-field"
                placeholder="Email"
                id="email"
                type="text"
              />
              <input
                onChange={(event) => {
                  setPassword(event.currentTarget.value);
                }}
                onKeyUp={(event) => {
                  if (event.code === 'Enter') {
                    login();
                  }
                }}
                className="form-field password"
                placeholder="Password"
                id="password"
                type="password"
              />
              <button
                type="button"
                className="form-button text-white"
                onClick={(e) => {
                  e.preventDefault();
                  login();
                }}
              >
                Entrar
              </button>
              <small>
                Não tem uma conta?&nbsp;
                <a
                  href="register"
                  onClick={(e) => {
                    e.preventDefault();
                    openRegister();
                  }}
                >
                  Registe-se aqui!
                </a>
              </small>
            </form>
          </div>
        </div>
      )}
      {loading && (
        <div className="loader" />
      )}
    </div>
  );
}

export default Login;
