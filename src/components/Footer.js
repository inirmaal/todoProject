import React, { useContext } from 'react';
import { TodoContext } from '../TodoContext';
import './Footer.css';


const Footer = () => {
    const { filteredTodos, addSearchHandler, showHandler, bgColorChange, actionBgColorChange } = useContext(TodoContext);
    const length = filteredTodos.length;
    return (
        <div className="contain">
            <span onClick={() => addSearchHandler(0)} className="button" style={{ background: actionBgColorChange(0) }}><i className="fas fa-plus"></i></span>
            <span onClick={() => addSearchHandler(1)} className="button" style={{ background: actionBgColorChange(1) }}><i className="fas fa-search"></i></span>
            <span className="divider">|</span>
            <span className="divider"> {length} items left</span>
            <ul className="unorderedList">
                <li onClick={() => showHandler('All', 0)} className="button" style={{ background: bgColorChange(0) }}>All</li>
                <li onClick={() => showHandler('Active', 1)} className="button" style={{ background: bgColorChange(1) }}>Active</li>
                <li onClick={() => showHandler('Completed', 2)} className="button" style={{ background: bgColorChange(2) }}>Completed</li>
            </ul>
        </div>
    )
};

export default Footer;