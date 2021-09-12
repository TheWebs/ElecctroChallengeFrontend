import { React } from 'react';
import '../styles/style.css';

// eslint-disable-next-line react/prop-types
function Todos({ setAuthState }) {
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
              href="sf"
              onClick={(e) => {
                e.preventDefault();
                setAuthState({
                  login: false,
                  register: true,
                  loggedIn: false,
                });
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

export default Todos;
