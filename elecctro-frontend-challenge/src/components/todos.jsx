import {
  React, useContext, useEffect, useState,
} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TodosAppContext } from '../contexts/todosAppContext';
import '../styles/style.css';
import Todo from './todo';

function Todos() {
  const { userData, handleServerErrors } = useContext(TodosAppContext);
  const [todos, setTodos] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState('');
  const [currentFilter, setCurrentFilter] = useState('ALL');
  const [currentOrder, setCurrentOrder] = useState('CREATED_AT');
  const possibleFilters = [
    {
      name: 'Todas',
      state: 'ALL',
    },
    {
      name: 'Terminadas',
      state: 'COMPLETE',
    },
    {
      name: 'Por terminar',
      state: 'INCOMPLETE',
    },
  ];
  const possibleOrders = [
    {
      name: 'Data de criação',
      order: 'CREATED_AT',
    },
    {
      name: 'Data de conclusão',
      order: 'COMPLETED_AT',
    },
    {
      name: 'Descrição',
      order: 'DESCRIPTION',
    },
  ];

  const getTodos = async () => {
    axios.get(`/todos?filter=${currentFilter}&orderBy=${currentOrder}`, {
      withCredentials: true,
    }).then((result) => {
      setTodos(result.data);
      setLoading(false);
    }).catch((error) => {
      handleServerErrors(error);
    });
  };

  const createTodo = () => {
    axios.post('/todos', {
      description: newTodo,
    }, {
      withCredentials: true,
    }).then(async (result) => {
      setTodos([...todos, result.data]);
      setNewTodo('');
      await Swal.fire('Sucesso', 'Tarefa criada', 'success');
    }).catch((error) => {
      handleServerErrors(error);
    });
  };

  useEffect(() => {
    getTodos();
  }, [currentFilter, currentOrder]);

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
          <input
            className="add-bar-input"
            onChange={(event) => setNewTodo(event.currentTarget.value)}
            value={newTodo}
            type="text"
            placeholder="Criar uma tarefa ..."
            onKeyUp={(event) => {
              if (event.code === 'Enter') {
                createTodo();
              }
            }}
          />
          <button
            onClick={createTodo}
            type="button"
          >
            <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
              <path fill="currentColor" d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" />
            </svg>
          </button>
        </div>
        <div className="todo-filter-zone">
          <label htmlFor="filter">
            Filtro:
            <select
              label="filter"
              value={currentFilter}
              onChange={(event) => {
                setCurrentFilter(event.currentTarget.value);
              }}
              style={{ marginRight: '50px' }}
            >
              {
                possibleFilters.map((filter) => (
                  <option value={filter.state}>{filter.name}</option>))
              }
            </select>
          </label>
          <label htmlFor="order" style={{ marginLeft: '50px' }}>
            Ordenar por:
            <select
              label="order"
              value={currentOrder}
              onChange={(event) => {
                setCurrentOrder(event.currentTarget.value);
              }}
            >
              {
                possibleOrders.map((order) => (
                  <option value={order.order}>{order.name}</option>))
              }
            </select>
          </label>
        </div>
        <div>
          {
            todos.map((todo) => (
              <Todo key={todo.taskId} setTodos={setTodos} todos={todos} todo={todo} />))
          }
        </div>
      </div>
      )}
    </div>
  );
}

export default Todos;
