import React from "react";

const Header = (props) => {
    const getIcon = (text) => {
        if (text === 'Todo-List') return '📝';
        if (text === 'In Progress') return '⏳';
        if (text === 'Completed') return '✅';
        return '📋';
    };
    
    return <h1 className="container-header">
        {getIcon(props.text)} {props.text}
     </h1>
};
export default Header;