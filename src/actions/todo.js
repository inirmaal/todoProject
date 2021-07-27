export const ADD_TODO = 'ADD_TODO';

export const addTodo = (title, done) => {
    return (dispatch) => {
        fetch(
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    done: done
                })
            });
        dispatch({
            type: 'ADD_TODO',
            todoData: {
                id: Date.now(), 
                title, 
                done
            }
        });
    }
}