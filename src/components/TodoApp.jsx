import React, { useReducer, useState } from "react";
import "./TodoApp.css";

const initialState = {
  todos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo, index) => index !== action.payload),
      };
    default:
      return state;
  }
};

const TodoApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      dispatch({ type: "ADD_TODO", payload: inputValue });
      setInputValue("");
    }
  };

  const handleRemoveTodo = (index) => {
    dispatch({ type: "REMOVE_TODO", payload: index });
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Добавить задачу"
        />
        <button onClick={handleAddTodo}>Добавить</button>
      </div>
      <ul>
        {state.todos.map((todo, index) => (
          <li key={index}>
            {todo}{" "}
            <button onClick={() => handleRemoveTodo(index)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
