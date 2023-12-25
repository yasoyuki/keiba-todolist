import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState<Todo[]>([]);
  const [completeTodos, setCompleteTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos);
      // ここで直接stateを更新せず、一時的な変数を使用する
      setIncompleteTodos(parsedTodos);
    }
  }, []);

  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 10){
    setTodoText(e.target.value);
    }
  }

  const onSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!todoText) {
      return;
    }

    const selectedOption = document.querySelector('select') as HTMLSelectElement;
    const selectedValue = selectedOption.value;
    const newTodo: Todo = {
      inputValue: `${selectedValue}  ${todoText}`,
      id: incompleteTodos.length,
      checked: false,
    }

    const newTodos = [newTodo, ...incompleteTodos]
    setIncompleteTodos(newTodos);
    setTodoText("");

    localStorage.setItem('todos', JSON.stringify(newTodos));

  };

  const handleDelete = (id: number) => {
    const newTodo = incompleteTodos.filter((todo) => todo.id !== id);
    setIncompleteTodos(newTodo);
  }

  const handleComplete = (id: number) => {
    const newCompleteTodo = incompleteTodos.find((todo) => todo.id === id);
    if (newCompleteTodo) {
      setCompleteTodos([...completeTodos, newCompleteTodo]);
    }
    const newIncompleteTodo = incompleteTodos.filter((todo) => todo.id !== id);
    setIncompleteTodos(newIncompleteTodo);
  }

  const handleBack = (id: number) => {
    const newCompleteTodo = completeTodos.filter((todo) => todo.id !== id);
    setCompleteTodos(newCompleteTodo);
    const newIncompleteTodo = completeTodos.find((todo) => todo.id === id);
    if (newIncompleteTodo) {
      setIncompleteTodos([...incompleteTodos, newIncompleteTodo]);
    }
  }

  return (
    <div className='App'>
      <section><p>競走馬リスト</p></section>
      <div className='formArea'>
        <form onSubmit={onSubmit}>
          <select>
            {[...Array(12)].map((_, index) => (
              <option key={index + 1} >
                {`${index + 1}R`}</option>
            ))}
          </select>
          <input type="text"
            onChange={(e) => handleChange(e)}
            className='umaName'
            value={todoText}
          />
          <input type="submit" value="+" className='umaButton' />
        </form>
      </div>
      <div className='IncompleteArea'>
        <p className='title'>まだ撮ってない馬</p>
        <ul>
        {/* inputValueでソートする */}
        {incompleteTodos.slice().sort((a, b) => a.inputValue.localeCompare(b.inputValue)).map((todo) => {
            return (
              <li key={todo.id}>
                <p>{todo.inputValue}</p>
                <button onClick={() => handleComplete(todo.id)}>完了</button>
                <button onClick={() => handleDelete(todo.id)}>削除</button>
              </li>
            )
          })}
        </ul>
      </div>
      <div className='CompleteArea'>
        <p className='title'>もう撮った馬</p>
        <ul>
          {completeTodos.map((todo) => {
            return (
              <li key={todo.id}>
                <p>{todo.inputValue}</p>
                <button onClick={() => handleBack(todo.id)}>戻す</button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default App;