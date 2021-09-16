import React, {
  useContext, useState,
} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TodosAppContext } from '../contexts/todosAppContext';

function Todo({ todo, setTodos, todos }) {
  const { handleServerErrors } = useContext(TodosAppContext);
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState(todo.description);

  const dataChanged = () => (description !== todo.description);

  const editTodo = () => {
    if (!dataChanged()) {
      setEditing(false);
      return;
    }
    if (description.trim().length < 2) {
      Swal.fire('Erro', 'Uma tarefa precisa no mínimo de 2 caracteres.', 'error');
      setDescription(todo.description);
      setEditing(false);
      return;
    }
    axios.patch(`/todo/${todo.taskId}`, {
      description,
    }, {
      withCredentials: true,
    }).then((result) => {
      const newTodo = result.data;
      let previousIndex = 0;
      const filteredTodos = todos.filter((elem, index) => {
        if (elem.taskId !== todo.taskId) {
          return true;
        }
        previousIndex = index;
        return false;
      });
      Swal.fire('Sucesso', 'Tarefa editada', 'success');
      filteredTodos.splice(previousIndex, 0, newTodo);
      setTodos(filteredTodos);
      setDescription(newTodo.description);
      setEditing(false);
    }).catch((error) => {
      handleServerErrors(error);
    });
  };

  const startEditing = () => {
    setEditing(true);
  };

  const deleteTodo = () => {
    Swal.fire({
      title: 'Tem a certeza?',
      text: 'Está prestes a apagar uma tarefa',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#5793e7',
      confirmButtonText: 'Sim, quero apagar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/todo/${todo.taskId}`, {
          withCredentials: true,
        }).then(() => {
          const newTodos = todos.filter((elem) => elem.taskId !== todo.taskId);
          setTodos(newTodos);
          Swal.fire('Apagada', 'Tarefa apagada', 'success');
        }).catch((error) => {
          handleServerErrors(error);
        });
      }
    });
  };

  const completeTodo = () => {
    axios.patch(`/todo/${todo.taskId}`, {
      state: 'COMPLETE',
    }, {
      withCredentials: true,
    }).then((result) => {
      const newTodo = result.data;
      let previousIndex = 0;
      const filteredTodos = todos.filter((elem, index) => {
        if (elem.taskId !== todo.taskId) {
          return true;
        }
        previousIndex = index;
        return false;
      });
      Swal.fire('Sucesso', 'Tarefa concluída', 'success');
      // inserir na posição que estava
      filteredTodos.splice(previousIndex, 0, newTodo);
      setTodos(filteredTodos);
    }).catch((error) => {
      handleServerErrors(error);
    });
  };

  return (
    <div className={todo.completedAt ? 'todo todo-completed' : 'todo'}>
      <div className="todo-description">
        <input
          className="add-bar-input"
          ref={(input) => input && input.focus()}
          onChange={(event) => setDescription(event.currentTarget.value)}
          defaultValue={description}
          onKeyUp={(event) => {
            if (event.code === 'Enter') {
              editTodo();
            } else if (event.code === 'Escape') {
              setDescription(todo.description);
              setEditing(false);
            }
          }}
          type={editing ? 'text' : 'hidden'}
        />
        <div className="todo-description-text">
          {editing ? '' : todo.description}
        </div>
      </div>
      <div className="todo-buttons">
        {!todo.completedAt && !editing && (
          <div>
            <button title="Concluir" type="button" onClick={completeTodo} className="complete-button">
              <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                <path fill="currentColor" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
              </svg>
            </button>
            <button title="Editar" type="button" onClick={startEditing} className="edit-button">
              <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                <path fill="currentColor" d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" />
              </svg>
            </button>
          </div>
        )}
        {!editing && (
          <button title="Apagar" type="button" onClick={deleteTodo} className={todo.completedAt ? 'delete-button-rounded' : 'delete-button'}>
            <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
              <path fill="currentColor" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" />
            </svg>
          </button>
        )}
        {editing && (
          <button
            type="button"
            className="save-button"
            onClick={editTodo}
            title="Guardar"
          >
            <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
              <path fill="currentColor" d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
            </svg>
          </button>
        )}

      </div>
    </div>
  );
}

export default Todo;
