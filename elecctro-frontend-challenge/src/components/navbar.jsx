import React, { useContext, useState } from 'react';
import axios from 'axios';
import { TodosAppContext } from '../contexts/todosAppContext';

function Navbar({ profile }) {
  const {
    userData, handleServerErrors, setLoggedIn, openProfile, closeProfile,
  } = useContext(TodosAppContext);
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="navbar">
      <div className="logout-zone">
        <button type="button" className="logout-dropdown" onClick={() => setDropdown(!dropdown)}>
          Bem vindo,&nbsp;
          { userData.name }
          {!dropdown && (
          <svg
            style={{
              width: '24px', height: '24px', display: 'inline-block', verticalAlign: 'middle',
            }}
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
          </svg>
          )}
          {dropdown && (
          <svg
            style={{
              width: '24px', height: '24px', display: 'inline-block', verticalAlign: 'middle',
            }}
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="M7,15L12,10L17,15H7Z" />
          </svg>
          )}
        </button>
        <div className={dropdown ? 'droppable-menu droppable-menu-active' : 'droppable-menu'}>
          {!profile && (
          <button
            className="dropdown-button"
            type="button"
            onClick={openProfile}
          >
            <svg
              style={{
                width: '24px', height: '24px', display: 'inline-block', verticalAlign: 'middle',
              }}
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
            </svg>
            &nbsp;Conta
          </button>
          )}
          {profile && (
          <button
            className="dropdown-button"
            type="button"
            onClick={closeProfile}
          >
            <svg
              style={{
                width: '24px', height: '24px', display: 'inline-block', verticalAlign: 'middle',
              }}
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="M19 3H14.82C14.4 1.84 13.3 1 12 1S9.6 1.84 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M12 3C12.55 3 13 3.45 13 4S12.55 5 12 5 11 4.55 11 4 11.45 3 12 3M7 7H17V5H19V19H5V5H7V7M12 17V15H17V17H12M12 11V9H17V11H12M8 12V9H7V8H9V12H8M9.25 14C9.66 14 10 14.34 10 14.75C10 14.95 9.92 15.14 9.79 15.27L8.12 17H10V18H7V17.08L9 15H7V14H9.25" />
            </svg>
            &nbsp;Tarefas
          </button>
          )}
          <button
            className="dropdown-button"
            type="button"
            onClick={() => {
              axios.post('/logout', {
                withCredentials: true,
              }).then(() => {
                setLoggedIn(false);
              }).catch((error) => {
                handleServerErrors(error);
              });
            }}
          >
            <svg
              style={{
                width: '24px', height: '24px', display: 'inline-block', verticalAlign: 'middle',
              }}
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" />
            </svg>
            &nbsp;Sair
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
