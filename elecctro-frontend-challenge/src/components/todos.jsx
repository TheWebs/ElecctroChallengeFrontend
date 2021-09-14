import {
  React, useContext, useEffect, useState,
} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TodosAppContext } from '../contexts/todosAppContext';
import '../styles/style.css';
import Todo from './todo';

function Todos() {
  const { userData, setLoggedIn } = useContext(TodosAppContext);
  const [todos, setTodos] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState('');

  const getTodos = async () => {
    axios.get('/todos', {

    }).then((result) => {
      setTodos(result.data);
      setLoading(false);
    }).catch(async () => {
      await Swal.fire('Ups ...', 'Sessão expirou!', 'error');
      setLoggedIn(false);
    });
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <div className="navbar">
        <div className="logout-zone">
          <button type="button" className="logout-dropdown" onClick={() => setDropdown(!dropdown)}>
            Bem vindo,&nbsp;
            { userData.name }
          </button>
          <div className={dropdown ? 'droppable-menu droppable-menu-active' : 'droppable-menu'}>
            <button className="dropdown-button" type="button">Conta</button>
            <button className="dropdown-button" type="button">Sair</button>
          </div>
        </div>
      </div>
      {loading && (
        <div className="loader" />
      )}
      {!loading && (
      <div style={{ margin: '0 auto', textAlign: 'center' }}>
        <h1 className="text-white title">Tarefas</h1>
        <div className="add-bar">
          <input onChange={(event) => setNewTodo(event.currentTarget.value)} value={newTodo} type="text" placeholder="Criar uma tarefa ..." />
          <button
            onClick={
                () => {
                  axios.post('/todos', {
                    description: newTodo,
                  }, {
                    withCredentials: true,
                  }).then(async (result) => {
                    setTodos([...todos, result.data]);
                    setNewTodo('');
                    await Swal.fire('Sucesso', 'Tarefa criada', 'success');
                  }).catch(() => {
                    Swal.fire('Ups ...', 'Algo correu mal!', 'error');
                  });
                }
            }
            type="button"
          >
            <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
              <path fill="currentColor" d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" />
            </svg>
          </button>
        </div>
        <div>
          {
            todos.map((todo) => (<Todo key={todo.taskId} todo={todo} />))
          }
        </div>
      </div>
      )}
    </div>
  );
}

export default Todos;
