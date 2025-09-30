import './App.css';
import React from 'react';
import Header from './components/Header.jsx';
import TodoItem from './components/TodoItem.jsx';
import Button from './components/Button.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
const App = () => {
  return (
    <div className="App">
      <Navbar />
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
