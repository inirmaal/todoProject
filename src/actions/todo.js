export const REQ_ADD_TODO = 'REQ_ADD_TODO';
export const ADD_TODO = 'ADD_TODO';
export const REQ_FETCH_TODO = 'REQ_FETCH_TODO'; 
export const FETCH_TODO = 'FETCH_TODO';
export const REQ_UPDATE_TODO = 'REQ_UPDATE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const REQ_SEARCH_TODO = 'REQ_SEARCH_TODO';
export const SEARCH_TODO = 'SEARCH_TODO';
export const REQ_DEL_TODO = 'REQ_DEL_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export const reqAddTodo = () => ({ type: REQ_ADD_TODO });
export const addTodo = (todo) => ({ type: 'ADD_TODO', addingTodo: todo })

export const reqFetchTodo = () => ({ type: REQ_FETCH_TODO });
export const fetchTodo = () => ({ type: 'FETCH_TODO' })

export const reqUpdateTodo = () => ({ type: REQ_UPDATE_TODO })
export const updateTodo = (fetchedTodos, todoId) => ({ 
            type: 'UPDATE_TODO', 
            allTodos: fetchedTodos, 
            todoId: todoId 
        })

export const reqSearchTodo = () => ({ type: REQ_SEARCH_TODO });
export const searchTodo = (fetchedTodos, typedTodo) => ({ 
            type: 'SEARCH_TODO', 
            allTodos: fetchedTodos, 
            todo: typedTodo 
        })

export const reqDeleteTodo = () => ({ type: REQ_DEL_TODO })
export const deleteTodo = (fetchedTodos, todoId) => ({
            type: 'DELETE_TODO',
            allTodos: fetchedTodos,
            todoId: todoId
        })