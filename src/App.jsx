import './App.css';
import React, { useState } from 'react';
import Header from './components/Header.jsx';
import TodoItem from './components/TodoItem.jsx';
import Button from './components/Button.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  
  // Todo state management
  const [todos, setTodos] = useState({
    projectStart: [
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

  // Add todo function
  const addTodo = (column) => {
    const allTodos = Object.values(todos).flat();
    const existingIds = allTodos.length > 0 ? allTodos.map(todo => todo.id) : [0];
    const newId = Math.max(...existingIds) + 1;
    const newTodo = {
      id: newId,
      text: `New Todo ${(todos[column]?.length || 0) + 1}`
    };
    
    setTodos(prevTodos => ({
      ...prevTodos,
      [column]: [...(prevTodos[column] || []), newTodo]
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
  return (
    <div className="App">
      <Navbar onLogout={handleLogout} />
      <div className='bigcontainer'>
        <div className="container first">
          <Header text="Project-start" />
          <div className="todo-content-area">
            {todos.projectStart?.map(todo => (
              <TodoItem 
                key={todo.id} 
                text={todo.text} 
                onDelete={() => deleteTodo('projectStart', todo.id)}
                onUpdate={(newText) => updateTodo('projectStart', todo.id, newText)}
              />
            ))}
          </div>
          <Button onAddTodo={() => addTodo('projectStart')} />
        </div>
        <div className="container second">
          <Header text="In Progress" />
          <div className="todo-content-area">
            {todos.inProgress?.map(todo => (
              <TodoItem 
                key={todo.id} 
                text={todo.text} 
                onDelete={() => deleteTodo('inProgress', todo.id)}
                onUpdate={(newText) => updateTodo('inProgress', todo.id, newText)}
              />
            ))}
          </div>
          <Button onAddTodo={() => addTodo('inProgress')} />
        </div>
        <div className="container third">
          <Header text="Completed" />
          <div className="todo-content-area">
            {todos.completed?.map(todo => (
              <TodoItem 
                key={todo.id} 
                text={todo.text} 
                onDelete={() => deleteTodo('completed', todo.id)}
                onUpdate={(newText) => updateTodo('completed', todo.id, newText)}
              />
            ))}
          </div>
          <Button onAddTodo={() => addTodo('completed')} />
        </div>
      </div>
      <Footer />
    </div>
  )
};
export default App;
