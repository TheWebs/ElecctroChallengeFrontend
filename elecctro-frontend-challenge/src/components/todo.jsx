import React from 'react';

function Todo({ todo }) {
  return (
    <div className="todo">
      <div style={{
        width: '70%', display: 'inline-block', verticalAlign: 'middle', textAlign: 'left',
      }}
      >
        <span>
          {todo.description}
        </span>
      </div>
      <div style={{ width: '30%', display: 'inline-block', verticalAlign: 'middle' }}>
        <button type="button" className="completeButton">
          <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
            <path fill="currentColor" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
          </svg>
        </button>
        <button type="button" className="editButton">
          <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
            <path fill="currentColor" d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" />
          </svg>
        </button>
        <button type="button" className="deleteButton">
          <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
            <path fill="currentColor" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Todo;
