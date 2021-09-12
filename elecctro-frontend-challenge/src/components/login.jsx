import { React, useContext } from 'react';
import '../styles/style.css';
import UserContext from '../contexts/userContext';

function Login() {
  const { openRegister } = useContext(UserContext);

  return (
    <div>
      <h1 className="text-white">Login</h1>
      <div className="login-card card">
        <form>
          <input className="form-field" placeholder="Email" id="email" type="text" />
          <input className="form-field password" placeholder="Password" id="password" type="password" />
          <button className="form-button text-white" type="submit">Criar conta</button>
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
  );
}

export default Login;
