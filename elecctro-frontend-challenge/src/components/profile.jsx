import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TodosAppContext } from '../contexts/todosAppContext';
import Navbar from './navbar';

function Profile() {
  const {
    userData, setUser, handleServerErrors, validateEmail,
  } = useContext(TodosAppContext);
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState(userData.name);
  const [editingEmail, setEditingEmail] = useState(false);
  const [email, setEmail] = useState(userData.email);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    if (editingName && name.length < 3) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (editingEmail && !validateEmail(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }, [name, email]);

  const dataChanged = () => {
    if (userData.name === name && userData.email === email) {
      return false;
    }

    return true;
  };

  const editName = () => {
    if (nameError) {
      return;
    }
    if (!dataChanged()) {
      setEditingName(false);
      return;
    }
    axios.patch('/me', {
      name,
    }, {
      withCredentials: true,
    }).then((result) => {
      const newUser = result.data;
      setUser(newUser);
      Swal.fire('Sucesso', 'Nome alterado', 'success');
      setEditingName(false);
    }).catch((error) => {
      handleServerErrors(error);
    });
  };

  const editEmail = () => {
    if (emailError) {
      return;
    }
    if (!dataChanged()) {
      setEditingEmail(false);
      return;
    }
    axios.patch('/me', {
      email,
    }, {
      withCredentials: true,
    }).then((result) => {
      const newUser = result.data;
      setUser(newUser);
      Swal.fire('Sucesso', 'Email alterado', 'success');
      setEditingEmail(false);
    }).catch((error) => {
      handleServerErrors(error);
    });
  };

  return (
    <div>
      <Navbar profile />
      <h1 className="title text-white">Conta</h1>
      <div className="card profile-card">
        <div style={{ margin: '0 auto', width: '55%' }}>
          <img className="profile-image" src="/profile.png" alt="Profile pic" />
          {!editingName && (
            <div>
              <h4 className="profile-label" style={{ display: 'inline-block' }}>
                Nome:
              </h4>
              <span className="profile-text">
                {userData.name}
              </span>
              <button onClick={() => setEditingName(true)} title="Editar" type="button" className="profile-edit-button edit-button">
                <svg style={{ width: '22px', height: '22px' }} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" />
                </svg>
              </button>
            </div>
          )}
          {editingName && (
            <div>
              <h4 className="profile-label" style={{ display: 'inline-block' }}>
                Nome:&nbsp;
              </h4>
              <input
                className="profile-input"
                ref={(input) => input && input.focus()}
                onChange={(event) => setName(event.currentTarget.value)}
                defaultValue={name}
                onKeyUp={(event) => {
                  if (event.code === 'Enter') {
                    editName();
                  } else if (event.code === 'Escape') {
                    setName(userData.name);
                    setEditingName(false);
                  }
                }}
                type={editingName ? 'text' : 'hidden'}
              />
              <button disabled={nameError} onClick={editName} title="Guardar" type="button" className="profile-edit-button profile-save-button">
                <svg style={{ width: '22px', height: '22px' }} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
                </svg>
              </button>
              {nameError && (
              <small className="error error-edit">O nome tem de ter pelo menos 3 caracteres.</small>
              )}
            </div>
          )}
          <br />
          {!editingEmail && (
            <div>
              <h4 className="profile-label" style={{ display: 'inline-block' }}>
                Email:
              </h4>
              <span className="profile-text">
                {userData.email}
              </span>
              <button onClick={() => setEditingEmail(true)} title="Editar" type="button" className="profile-edit-button edit-button">
                <svg style={{ width: '22px', height: '22px' }} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" />
                </svg>
              </button>
            </div>
          )}
          {editingEmail && (
            <div>
              <h4 className="profile-label" style={{ display: 'inline-block' }}>
                Email:&nbsp;
              </h4>
              <input
                className="profile-input"
                ref={(input) => input && input.focus()}
                onChange={(event) => setEmail(event.currentTarget.value)}
                defaultValue={email}
                onKeyUp={(event) => {
                  if (event.code === 'Enter') {
                    editEmail();
                  } else if (event.code === 'Escape') {
                    setEmail(userData.email);
                    setEditingEmail(false);
                  }
                }}
                type={editingEmail ? 'text' : 'hidden'}
              />
              <button disabled={emailError} onClick={editEmail} title="Guardar" type="button" className="profile-edit-button profile-save-button">
                <svg style={{ width: '22px', height: '22px' }} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
                </svg>
              </button>
              {emailError && (
              <small className="error error-edit">O email tem de ter o formato exemplo@exemplo.com</small>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
