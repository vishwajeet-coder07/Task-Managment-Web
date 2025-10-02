import React, { useState } from "react";

const TodoItem = ({ text, onDelete, onUpdate, column, todoId, onMove }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(text);

    const handleEditStart = () => {
        setIsEditing(true);
        setEditText(text);
    };

    const handleEditSave = () => {
        if (editText.trim() !== '') {
            onUpdate(editText.trim());
        }
        setIsEditing(false);
    };

    const handleEditCancel = () => {
        setEditText(text);
        setIsEditing(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleEditSave();
        } else if (e.key === 'Escape') {
            handleEditCancel();
        }
    };

    const handleCheckboxChange = () => {
        let targetColumn;
        
        // Define the flow: todoList -> inProgress -> completed (no further movement)
        if (column === 'todoList') {
            targetColumn = 'inProgress';
        } else if (column === 'inProgress') {
            targetColumn = 'completed';
        }
        // Completed tasks don't move anywhere - they stay completed
        
        if (targetColumn) {
            onMove(todoId, column, targetColumn);
        }
    };
    
    return (
        <li className={`container-list ${isEditing ? 'editing' : ''} ${column === 'completed' ? 'completed' : ''}`}>
            <span>
                <input 
                    type="checkbox" 
                    onChange={handleCheckboxChange}
                    checked={column === 'completed'}
                    disabled={column === 'completed'}
                    title={column === 'todoList' ? 'Move to In Progress' : column === 'inProgress' ? 'Mark as Completed' : 'Task Completed'}
                />
                {isEditing ? (
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={handleKeyPress}
                        onBlur={handleEditSave}
                        className="edit-input"
                        autoFocus
                    />
                ) : (
                    <span 
                        onClick={handleEditStart}
                        className="todo-text-display"
                        title="Click to edit"
                    >
                        {text}
                    </span>
                )}
            </span>
            <div className="todo-actions">
                {isEditing ? (
                    <div className="edit-actions">
                        <button 
                            className="save-btn" 
                            onClick={handleEditSave}
                            title="Save changes"
                        >
                            💾
                        </button>
                        <button 
                            className="cancel-btn" 
                            onClick={handleEditCancel}
                            title="Cancel editing"
                        >
                            ❌
                        </button>
                    </div>
                ) : (
                    <button 
                        className="delete-btn" 
                        onClick={onDelete}
                        title="Delete todo"
                    >
                        ❌
                    </button>
                )}
            </div>
        </li>
    );
};
export default TodoItem;