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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  
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
          <TodoItem text="Todo 1" />
          <TodoItem text="Todo 2" />
          <TodoItem text="Todo 3" />
          <TodoItem text="Todo 4" />
          <Button />
        </div>
        <div className="container second">
          <Header text="In Progress" />
          <TodoItem text="Todo 1" />
          <TodoItem text="Todo 2" />
          <TodoItem text="Todo 3" />
          <TodoItem text="Todo 4" />
          <Button />
        </div>
        <div className="container third">
          <Header text="Completed" />
          <TodoItem text="Todo 1" />
          <TodoItem text="Todo 2" />
          <TodoItem text="Todo 3" />
          <TodoItem text="Todo 4" />
          <Button />
        </div>
      </div>
      <Footer />
    </div>
  )
};
export default App;
