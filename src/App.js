import React, {useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import * as todoActions from './actions/todo';
import Footer from './components/Footer';
import Form from './components/Form';
import Header from './components/Header';
import Layout from './components/Layout';
import './components/Footer.css';
import ListItem from './components/ListItem';

const App = () => {
  const fetchedTodos = useSelector(state => state.todo.fetchedTodos);
  const [todo, setTodo] = useState("");
//   const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState(fetchedTodos);
  const [position, setPosition] = useState();
  const [actionPosition, setActionPosition] = useState();
  const dispatch = useDispatch();

    useEffect(() => {
        setFilteredTodos(fetchedTodos)
    },[fetchedTodos])

  const fetchTodos = useCallback(async () => {
      try {
          let fetchTodoAction = await todoActions.fetchTodo()
          dispatch(fetchTodoAction);
      } catch (err) {
          console.log(err);
      }
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
      console.log(todoId);
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
    // <TodoReduxProvider>
      <Layout>
        <Header />
        <Form todo={todo} setTodo={setTodo} submitHandler={submitHandler} />
        <ListItem doneHandler={doneHandler} filteredTodos={filteredTodos} deleteHandler={deleteHandler}/>
        <Footer fetchedTodos={fetchedTodos} addSearchHandler={addSearchHandler} showHandler={showHandler} bgColorChange={bgColorChange} 
        actionBgColorChange={actionBgColorChange} />
      </Layout>
    // </TodoReduxProvider>
  )
};

export default App;