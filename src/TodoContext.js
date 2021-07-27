import { createContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addTodo} from './actions/todo';


export const TodoContext = createContext();

const TodoContextProvider = (props) => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [search, setSearch] = useState(false);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [position, setPosition] = useState();
    const [actionPosition, setActionPosition] = useState();
    const todoReducer = useSelector(state => state.todo.todos);
    console.log(todoReducer);
    const dispatch = useDispatch();

    //get from localstorage
    useEffect(() => {
        const getTodos = JSON.parse(localStorage.getItem('todos'))
        console.log(getTodos);
        if (getTodos) {
            setTodos(getTodos)
        }
    }, [])

    useEffect(() => {
        if (todoReducer !== filteredTodos) {
            setFilteredTodos(todoReducer)
        }
    }, [todoReducer])

    // to localStorage
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const doneHandler = (todoId, e) => {
        const index = todos.findIndex(item => item.id === todoId)
        const duplicateTodos = [...todos]
        duplicateTodos[index] = {
            id: todos[index].id,
            title: todos[index].title,
            done: !todos[index].done
        }
        setTodos(duplicateTodos);
    }

    const submitHandler = (e) => {
        e.preventDefault(); 
        if (search) {
            const todoSearch = todos.filter((filteringTodo) => {
                return (filteringTodo.title.toLowerCase().includes(todo.toLowerCase()))
                // console.log(JSON.stringify(filteringTodo));
                // return filteringTodo;
            })
            setFilteredTodos(todoSearch);
        } else {
            // setTodos([{ id: Date.now(), title: todo, done: false }, ...todos]);  
            dispatch(addTodo(todo, false));
            setTodo('');
        }
    }

    const showHandler = (viewHandler, index) => {
        console.log(viewHandler, index);
        let filteredTodos = [];
        if (position === index) {
            setPosition(null);
        } else {
            setPosition(index)
        }
        switch (viewHandler) {
            case 'All':
                filteredTodos = todos;
                break;
            case 'Active':
                filteredTodos = todos.filter(todo => {
                    return todo.done === false
                })
                break;
            case 'Completed':
                filteredTodos = todos.filter(todo => {
                    return todo.done === true
                })
                break;
            default:
                break;
        }
        setFilteredTodos(filteredTodos);
    }

    const bgColorChange = (index) => {
        if (position === index) {
            return 'grey';
        } else {
            return '';
        }
    }

    const actionBgColorChange = (index) => {
        if (actionPosition === index) {
            return 'grey';
        } else {
            return '';
        }
    }

    const addSearchHandler = (index) => {
        if (index === 1) {
            setActionPosition(index);
            setSearch(true);
        } else {
            setActionPosition(index);
            setSearch(false);
        }
    }


    const value = {todo,setTodo, submitHandler,filteredTodos,doneHandler,addSearchHandler,showHandler,
        bgColorChange,actionBgColorChange}

    return (
        <TodoContext.Provider value={value}>
            {props.children}
        </TodoContext.Provider>
    )
};

export default TodoContextProvider;