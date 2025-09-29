import './App.css';
import React from 'react';
import Header from './components/Header';
import TodoItem from './components/TodoItem';
import Btn from './components/Button';
const App = () => {
  return (
    <div className='bigcontainer'>
    <div className="container first">
      <Header />
      <TodoItem text="Todo 1" />
      <TodoItem text="Todo 2" />
      <TodoItem text="Todo 3" />
      <TodoItem text="Todo 4" />
      <Btn />
    </div>
     <div className="container second">
      <Header />
      <TodoItem text="Todo 5" />
      <TodoItem text="Todo 6" />
      <TodoItem text="Todo 7" />
      <TodoItem text="Todo 8" />
      <Btn /> 
    </div>
     <div className="container third">
      <Header />
      <TodoItem text="Todo 9" />
      <TodoItem text="Todo 10" />
      <TodoItem text="Todo 11" />
      <TodoItem text="Todo 12" />
      <Btn />
    </div>
    </div>
  )
};

export default App;
