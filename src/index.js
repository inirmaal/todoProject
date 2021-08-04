import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import todoReducer from './reducers/todo';
import { Provider } from 'react-redux';
import mySaga from './saga';


const allReducers = combineReducers ({
    todo: todoReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore( allReducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
    document.getElementById('root'));
