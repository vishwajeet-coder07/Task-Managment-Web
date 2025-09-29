import React from "react";

const TodoItem = (props) => {
    return (
        <li className="container-list">
            <span>
            <input type = "checkbox" />
            <span>{props.text}</span>
            </span>
            <p>...</p>
        </li>
    );
};
export default TodoItem;