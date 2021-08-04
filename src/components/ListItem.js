import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTodo } from '../actions/todo';

const ListItem = ({doneHandler, filteredTodos, deleteHandler}) => {
    const dispatch = useDispatch();
    const fetchTodos = useCallback(async () => {
        try {
            let fetchTodoAction = await fetchTodo();
            dispatch(fetchTodoAction);
        } catch (err) { 
            console.log(err);
        }
    },[dispatch]);

    useEffect(() => {
        fetchTodos()
    },[fetchTodos]);

    return (
        <div>
            <ul>
            {filteredTodos.map(todo => {
                 return <div>
                <li className="">
                    <div>
                           {todo.done ? 
                           <>
                           <input type='checkbox' checked={true} onChange={() => doneHandler(todo.id)} /> 
                           <del>{todo.title}</del>
                           <span style={{float:'right', cursor:'pointer'}} onClick={() => deleteHandler(todo.id)}>Del</span>
                           </>
                           : <>
                           <input type='checkbox' checked={false} onChange={() => doneHandler(todo.id)} />
                           {todo.title}
                           </>
                           }
                    </div>
                    <hr />
                </li>
        </div>
               })}
            </ul>
        </div>
    )
};

export default ListItem;