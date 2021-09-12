import { React, useContext } from 'react';
import '../styles/style.css';
import UserContext from '../contexts/userContext';

function Register() {
  const { openLogin } = useContext(UserContext);
  return (
    <div>
      <h1 className="text-white">Registar</h1>
      <div className="login-card card">
        <form>
          <input className="form-field" placeholder="Nome" minLength="3" id="name" type="text" />
          <input className="form-field" placeholder="Email" id="email" type="email" />
          <input className="form-field password" placeholder="Password" id="password" type="password" />
          <button className="form-button text-white" type="submit">Criar conta</button>
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
