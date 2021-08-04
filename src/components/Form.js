import React from 'react';

const Form = ({todo, setTodo, submitHandler }) => {
    return (
        <div>
            <form onSubmit={ submitHandler }>
                <div>
                    <div className="border">
                        <input type="text" required className="form-control-plaintext" value = {todo} 
                            onChange={(e) => setTodo(e.target.value)} />
                    </div>
                </div>
            </form>
        </div>
    )
};

export default Form;