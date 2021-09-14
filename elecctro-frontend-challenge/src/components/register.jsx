import {
  React, useContext, useState,
} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TodosAppContext } from '../contexts/todosAppContext';
import '../styles/style.css';

function Register() {
  const {
    openLogin, getTokenFromCookies, setUser, setLoggedIn,
  } = useContext(TodosAppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [setLoading] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const tryLogin = async () => {
    const token = getTokenFromCookies();
    if (token) {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
      try {
        const result = await axios.get('/me');
        if (result.status === 200) {
          console.log('Token found and valid');
          setUser(result.data);
          setLoggedIn(true);
        } else {
          console.log('Token found not valid');
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('Token not found');
      setLoading(false);
    }
  };

  const emptyFields = () => (name === '' || email === '' || password === '');

  const validateEmail = (emailToValidate) => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailToValidate)) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <h1 className="text-white title">Registar</h1>
      <div className="login-card card">
        <form>
          <input
            onChange={(event) => {
              const newName = event.currentTarget.value;
              setName(newName);
              if (newName.length < 3) {
                setNameError(true);
              } else {
                setNameError(false);
              }
            }}
            className="form-field"
            placeholder="Nome"
            id="name"
            type="text"
          />
          {nameError && (<small className="error">O nome tem de ter pelo menos 3 caracteres</small>)}
          <input
            onChange={(event) => {
              const newEmail = event.currentTarget.value;
              setEmail(newEmail);
              if (validateEmail(newEmail)) {
                setEmailError(false);
              } else {
                setEmailError(true);
              }
            }}
            className="form-field"
            placeholder="Email"
            id="email"
            type="email"
          />
          {emailError && (<small className="error">O email tem de ter o formato exemplo@exemplo.exemplo</small>)}
          <input
            onChange={(event) => {
              const newPassword = event.currentTarget.value;
              setPassword(newPassword);
              if (newPassword.length < 8) {
                setPasswordError(newPassword);
              } else {
                setPasswordError(false);
              }
            }}
            className="form-field password"
            placeholder="Password"
            id="password"
            type="password"
          />
          {passwordError && (<small className="error">A password tem de ter pelo menos 8 caracteres.</small>)}
          <button
            onClick={(e) => {
              e.preventDefault();
              if (emptyFields()) {
                Swal.fire('Campo vazios', 'Não pode deixar nenhum campo em branco', 'error');
                return;
              }
              axios.post('/users', {
                name,
                email,
                password,
              }, {
                withCredentials: true,
              }).then(() => {
                tryLogin();
              }).catch(() => {
                Swal.fire('Ups ...', 'Dados de registo inválidos!', 'error');
              });
            }}
            disabled={nameError || passwordError || emailError || emptyFields()}
            className="form-button text-white"
            type="submit"
          >
            Criar conta
          </button>
          <small>
            Já tem uma conta?&nbsp;
            <a
              href="login"
              onClick={(e) => {
                e.preventDefault();
                openLogin();
              }}
            >
              Faça login aqui!
            </a>
          </small>
        </form>
      </div>
    </div>
  );
}

export default Register;
