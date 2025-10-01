import React, { useState } from "react";

const TodoItem = ({ text, onDelete, onUpdate }) => {
    const [done, setDone] = useState("...")
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(text);

    let status = done;
    if (status === "...") {
        status = "done";
    } else {
        status = "..."
    }

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
    
    return (
        <li className={`container-list ${isEditing ? 'editing' : ''}`}>
            <span>
                <input type="checkbox" onClick={() => setDone(status)} />
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
                <p>{done}</p>
                {isEditing ? (
                    <div className="edit-actions">
                        <button 
                            className="save-btn" 
                            onClick={handleEditSave}
                            title="Save changes"
                        >
                            ✓
                        </button>
                        <button 
                            className="cancel-btn" 
                            onClick={handleEditCancel}
                            title="Cancel editing"
                        >
                            ×
                        </button>
                    </div>
                ) : (
                    <button 
                        className="delete-btn" 
                        onClick={onDelete}
                        title="Delete todo"
                    >
                        ×
                    </button>
                )}
            </div>
        </li>
    );
};
export default TodoItem;