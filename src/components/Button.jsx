import React from 'react'

export default function Button({ onAddTodo }) {
  return (
    <button className='btn-todo' onClick={onAddTodo}>Add Todo</button>
  )
}