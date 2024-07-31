import React from 'react';

export const TodoItem = ({ todo, index, handleChecked, handleDelete }) => {
  return (
    <div key={index}>
      <input
        type="checkbox"
        checked={todo.isChecked}
        onChange={() => handleChecked(index)}
      />
      <span>{todo.message}</span>
      <button onClick={() => handleDelete(index)}>del</button>
    </div>
  );
};