import './App.css'; 
import React, { useState } from 'react';
import Header from './components/Header.jsx';
import TodoItem from './components/TodoItem.jsx';
import Navbar from './components/navbar.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [newTodoText, setNewTodoText] = useState('');
  
  // Todo state management
  const [todos, setTodos] = useState({
    todoList: [
      { id: 1, text: 'Design user interface' },
      { id: 2, text: 'Set up project structure' },
      { id: 3, text: 'Create wireframes' }
    ],
    inProgress: [
      { id: 4, text: 'Implement authentication' },
      { id: 5, text: 'Build todo components' },
      { id: 6, text: 'Add styling' }
    ],
    completed: [
      { id: 7, text: 'Project planning' },
      { id: 8, text: 'Initial setup' }
    ]
  });

  // Add todo function - only adds to todoList
  const addTodo = (todoText) => {
    const allTodos = Object.values(todos).flat();
    const existingIds = allTodos.length > 0 ? allTodos.map(todo => todo.id) : [0];
    const newId = Math.max(...existingIds) + 1;
    const newTodo = {
      id: newId,
      text: todoText.trim() || `New Todo ${(todos.todoList?.length || 0) + 1}`
    };
    
    setTodos(prevTodos => ({
      ...prevTodos,
      todoList: [...(prevTodos.todoList || []), newTodo]
    }));
  };

  // Move todo between columns
  const moveTodo = (todoId, fromColumn, toColumn) => {
    const todoToMove = todos[fromColumn]?.find(todo => todo.id === todoId);
    if (!todoToMove) return;

    setTodos(prevTodos => ({
      ...prevTodos,
      [fromColumn]: prevTodos[fromColumn].filter(todo => todo.id !== todoId),
      [toColumn]: [...(prevTodos[toColumn] || []), todoToMove]
    }));
  };

  // Delete todo function
  const deleteTodo = (column, todoId) => {
    setTodos(prevTodos => ({
      ...prevTodos,
      [column]: (prevTodos[column] || []).filter(todo => todo.id !== todoId)
    }));
  };

  // Update todo text function
  const updateTodo = (column, todoId, newText) => {
    setTodos(prevTodos => ({
      ...prevTodos,
      [column]: (prevTodos[column] || []).map(todo => 
        todo.id === todoId ? { ...todo, text: newText } : todo
      )
    }));
  };

// handle login means user successfully logged in
  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowRegister(false);
  };

// handle logout means user successfully logged out and now show login page
  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowRegister(false);
  };

// handle register means user successfully registered and ab dashboard page show karna hai
  const handleRegister = () => {
    setIsLoggedIn(true);
    setShowRegister(false);
  };


// for switching between login and register forms
  const switchToRegister = () => {
    setShowRegister(true);
  };

  const switchToLogin = () => {
    setShowRegister(false);
  };

  if (!isLoggedIn) {
    if (showRegister) {
      return <Register onRegister={handleRegister} onSwitchToLogin={switchToLogin} />;
    }
    return <Login onLogin={handleLogin} onSwitchToRegister={switchToRegister} />;
  }
  // Handle add todo from input bar
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      addTodo(newTodoText);
      setNewTodoText('');
    }
  };

  return (
    <div className="App">
      <Navbar onLogout={handleLogout} />
      <div className="add-todo-bar">
        <form onSubmit={handleAddTodo} className="add-todo-form">
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Add a new task..."
            className="add-todo-input"
          />
          <button type="submit" className="add-todo-btn">➕ Add Task</button>
        </form>
      </div>
      <div className='bigcontainer'>
        <div className="container first">
          <Header text="Todo-List" />
          <div className="todo-content-area">
            {todos.todoList?.map(todo => (
              <TodoItem 
                key={todo.id} 
                text={todo.text}
                column="todoList"
                todoId={todo.id}
                onDelete={() => deleteTodo('todoList', todo.id)}
                onUpdate={(newText) => updateTodo('todoList', todo.id, newText)}
                onMove={moveTodo}
              />
            ))}
          </div>
        </div>
        <div className="container second">
          <Header text="In Progress" />
          <div className="todo-content-area">
            {todos.inProgress?.map(todo => (
              <TodoItem 
                key={todo.id} 
                text={todo.text}
                column="inProgress"
                todoId={todo.id}
                onDelete={() => deleteTodo('inProgress', todo.id)}
                onUpdate={(newText) => updateTodo('inProgress', todo.id, newText)}
                onMove={moveTodo}
              />
            ))}
          </div>
        </div>
        <div className="container third">
          <Header text="Completed" />
          <div className="todo-content-area">
            {todos.completed?.map(todo => (
              <TodoItem 
                key={todo.id} 
                text={todo.text}
                column="completed"
                todoId={todo.id}
                onDelete={() => deleteTodo('completed', todo.id)}
                onUpdate={(newText) => updateTodo('completed', todo.id, newText)}
                onMove={moveTodo}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};
export default App;
