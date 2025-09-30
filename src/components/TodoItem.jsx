import React, {useState} from "react";

const TodoItem = (props) => {
    const [done , setDone] = useState("...")
    let status = done;
    if(status === "..."){
        status = "done";
    }else{
        status = "..."
    }
    return (
        <li className="container-list">
            <span>
            <input type = "checkbox" onClick ={() => setDone(status)} />
            <span>{props.text}</span>
            </span>
            <p>{done}</p>
        </li>
    );
};
export default TodoItem;