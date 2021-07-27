import React, { useContext } from 'react';
import { TodoContext } from '../TodoContext';

const ListItem = () => {
    const {doneHandler,filteredTodos} = useContext(TodoContext)
    console.log(filteredTodos);
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
                           </>
                           : <>
                           <input type='checkbox' checked={false} onChange={() => doneHandler(todo.id)}/>
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