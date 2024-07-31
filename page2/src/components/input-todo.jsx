import React from 'react';

export const InputTodo = ({ value, handleChange, type }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      placeholder="Enter your todo"
    />
  );
};