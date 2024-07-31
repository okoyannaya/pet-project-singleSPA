import React, {useLayoutEffect, useRef, useState} from "react";
import {InputTodo} from "./input-todo";
import {TodoList} from "./todo-list";
import {AddTodoButton} from "./add-todo-btn";

export const TodoPage = () => {
  const savedTodosStr = localStorage.getItem("todos") || "";
  const savedTodos = JSON.parse(savedTodosStr) || [];
  const [todos, setTodos] = useState(savedTodos);
  const [value, setValue] = useState("");
  const chatContainerRef = useRef(null);

  const addtodo = () => {
    const newTodosList = [...todos, {message: value, isChecked: false}];
    setTodos(newTodosList);
    setValue("");
    const jsonTodos = JSON.stringify(newTodosList);
    localStorage.setItem("todos", jsonTodos);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleChecked = (id) => {
    const updatedArr = todos.map((todo, index) => {
      if (index === id) {
        return {...todo, isChecked: !todo.isChecked};
      }
      return todo;
    });
    const jsonTodos = JSON.stringify(updatedArr);
    localStorage.setItem("todos", jsonTodos);
    setTodos(updatedArr);
  };

  const handleDelete = (id) => {
    const updatedArr = todos.filter((item, index) => index !== id);
    const jsonTodos = JSON.stringify(updatedArr);
    localStorage.setItem("todos", jsonTodos);
    setTodos(updatedArr);
  };

  useLayoutEffect(() => {
    const chatContainer = chatContainerRef?.current;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [todos]);

  console.log("render");
  return (
    <div>
      <div
        ref={chatContainerRef}
        style={{
          height: "500px",
          width: '500px',
          overflowY: "scroll",
          border: "1px solid black",
        }}
      >
        <TodoList
          todos={todos}
          handleChecked={handleChecked}
          handleDelete={handleDelete}
        />
      </div>
      <InputTodo value={value} handleChange={handleChange} type="text" />
      <AddTodoButton addtodo={addtodo} />
    </div>
  );
};
