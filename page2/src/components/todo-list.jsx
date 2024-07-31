import React from 'react';
import { TodoItem } from './todo-item';

export const TodoList = ({ todos, handleChecked, handleDelete }) => {
  return (
    <div>
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo}
          index={index}
          handleChecked={handleChecked}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};