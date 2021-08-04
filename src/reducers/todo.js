import { ADD_TODO, DELETE_TODO, FETCH_TODO, SEARCH_TODO, UPDATE_TODO } from '../actions/todo';

const initialState = {
    fetchedTodos: [],
    todosAdded: []
}

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            const alreadyAddedTodos = JSON.parse(localStorage.getItem('todos'));
            const id = Date.now();
            const storeTodos = [...alreadyAddedTodos, { id: id, title: action.addingTodo, done: false }];
            localStorage.setItem('todos', JSON.stringify(storeTodos))
            return {
                todosAdded: storeTodos
            }
        case FETCH_TODO:
            const getTodos = JSON.parse(localStorage.getItem('todos'))
            return {
                fetchedTodos: getTodos
            }
        case UPDATE_TODO:
            const index = action.allTodos.findIndex(item => item.id === action.todoId)
            const duplicateTodos = [...action.allTodos];
            duplicateTodos[index] = {
                id: action.allTodos[index].id,
                title: action.allTodos[index].title,
                done: !action.allTodos[index].done
            }
            localStorage.setItem('todos', JSON.stringify(duplicateTodos));
            return {
                fetchedTodos: duplicateTodos
            }
        case DELETE_TODO:
            const deletingTodoIndex = action.allTodos.findIndex(item => item.id === action.todoId)
            console.log(deletingTodoIndex);
            const deletingTodo = [...action.allTodos];
            deletingTodo.splice(deletingTodoIndex,1);
            localStorage.setItem('todos', JSON.stringify(deletingTodo));
            return {

            }
        case SEARCH_TODO:
            const searchingTodo = action.allTodos.filter((item) => {
                return (item.title.toLowerCase().includes(action.todo.toLowerCase()));
            })
            return {
                fetchedTodos: searchingTodo
            }
        default:
            return state;
    }
}

export default todoReducer;