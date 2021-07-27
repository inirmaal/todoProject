import { ADD_TODO } from '../actions/todo';
import Todo from '../models/todo';

const initialState = {
    todos: []
}

const todoReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TODO:
            const newTodo = new Todo(
                action.todoData.id,
                action.todoData.title,
                action.todoData.done
            );
            // localStorage.setItem('todos',JSON.stringify(newTodo));
            return {
                ...state,
                todos: state.todos.concat(newTodo)
            };
        default: 
            return state;
    }
}

export default todoReducer;