import { useReducer, useState, useEffect } from "react";
import sunBtn from "./assets/images/icon-sun.svg";
import moonBtn from "./assets/images/icon-moon.svg";
import { reducer } from "./Reducer.jsx";
import TodoItem from "./components/TodoItem.jsx";
const todosDb = JSON.parse(localStorage.getItem("myTodos"));
function App() {
  const [addTodo, setAddTodo] = useState("");
  const [mode, setMode] = useState(false);
  const [todos, dispatch] = useReducer(reducer, todosDb);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    localStorage.setItem("myTodos", JSON.stringify(todos));
  }, [todos]);
  useEffect(() => {
    const rootElem = document.querySelector(":root").classList;
    rootElem.contains("dark") ? rootElem.remove("dark") : rootElem.add("dark");
  }, [mode]);

  const filterTodos = todos.filter((todo) => {
    if (filter === "active") {
      return todo.isDone === false;
    } else if (filter === "completed") {
      return todo.isDone === true;
    } else {
      return todo;
    }
  });

  const list = filterTodos.map((todo) => (
    <TodoItem
      key={todo.id}
      id={todo.id}
      content={todo.content}
      onDelete={handleDelete}
      isChecked={todo.isDone}
      dispatchChecked={dispatch}
    />
  ));
  console.log(todos);

  function handleDelete(id) {
    dispatch({ type: "delete", id: id });
    console.log(id);
  }
  function deleteCompleted() {
    dispatch({ type: "clear completed" });
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "add todo", content: addTodo });
  }

  return (
    <div className="container">
      <header>
        <h1>TODO</h1>
        <button
          onClick={() => {
            setMode(!mode);
          }}
        >
          <img src={mode ? sunBtn : moonBtn} alt="" />
        </button>
      </header>

      <section>
        <form onSubmit={handleSubmit} action="">
          <button className="btns"></button>
          <input
            type="text"
            value={addTodo}
            onChange={({ target }) => setAddTodo(target.value)}
            placeholder="Create a new todo."
          />
        </form>
        <div className="todo-container">
          {list}
          <div className="todos-count">
            <p>{`${filterTodos.length} items left`}</p>
            <button onClick={deleteCompleted}>Clear completed</button>
          </div>
          <div className="filter-btns">
            <button onClick={() => setFilter("all")}>All</button>
            <button onClick={() => setFilter("active")}>Active</button>
            <button onClick={() => setFilter("completed")}>Completed</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
