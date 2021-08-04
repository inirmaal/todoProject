import { createContext, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as todoActions from './actions/todo';


export const TodoRedux = createContext();

const TodoReduxProvider = (props) => {
    const [todo, setTodo] = useState("");
    // const [todos, setTodos] = useState([]);
    const [search, setSearch] = useState(false);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [position, setPosition] = useState();
    const [actionPosition, setActionPosition] = useState();
    const fetchedTodos = useSelector(state => state.todo.fetchedTodos);
    const dispatch = useDispatch();

    const fetchTodos = useCallback(async () => {
        try {
            let fetchTodoAction = await todoActions.fetchTodo()
            dispatch(fetchTodoAction);
        } catch (err) {
            console.log(err);        }
    }, [dispatch]);

    useEffect(() => {
        fetchTodos()
    }, [fetchTodos]);

    const doneHandler = (todoId) => {
        dispatch(todoActions.updateTodo(fetchedTodos, todoId));
        dispatch(todoActions.fetchTodo());
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (search) {
            dispatch(todoActions.searchTodo(fetchedTodos, todo));
        } else {
            dispatch(todoActions.addTodo(todo));
            dispatch(todoActions.fetchTodo());
            setTodo('');
        }
    }

    const deleteHandler = (todoId) => {
        dispatch(todoActions.deleteTodo(fetchedTodos, todoId));
        dispatch(todoActions.fetchTodo());
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
                filteredTodos = fetchedTodos;
                break;
            case 'Active':
                filteredTodos = fetchedTodos.filter(todo => {
                    return todo.done === false
                })
                break;
            case 'Completed':
                filteredTodos = fetchedTodos.filter(todo => {
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


    const value = {
        todo, setTodo, submitHandler, filteredTodos, doneHandler, addSearchHandler, showHandler, fetchedTodos, deleteHandler,
        bgColorChange, actionBgColorChange
    }

    return (
        <TodoRedux.Provider value={value}>
            {props.children}
        </TodoRedux.Provider>
    )
};

export default TodoReduxProvider;