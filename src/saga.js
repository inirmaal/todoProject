import { put, takeLatest } from '@redux-saga/core/effects';
import { REQ_FETCH_TODO, 
    REQ_ADD_TODO, 
    REQ_UPDATE_TODO, 
    REQ_SEARCH_TODO, 
    REQ_DEL_TODO, 
    fetchTodo,
    updateTodo, 
    addTodo,
    searchTodo,
    deleteTodo} from './actions/todo';

function* addingTodo(action) {
    try {
        yield put(addTodo());
    } catch(e) {
        console.log(e);
    }
}

function* fetchingTodo(action) {
    try {
        yield put(fetchTodo())
    } catch(e) {
        console.log(e);
    }
}

function* updatingTodo(action) {
    try {
        yield put(updateTodo());
    } catch(e) {
        console.log(e);
    }
}

function* searchingTodo() {
    try {
        yield put(searchTodo());
    } catch(e) {
        console.log(e);
    }
}

function* deletingTodo() {
    try {
        yield put(deleteTodo());
    } catch(e) {
        console.log(e);
    }
}

export default function* mySaga() {
    yield takeLatest(REQ_ADD_TODO, addingTodo)
    yield takeLatest(REQ_FETCH_TODO, fetchingTodo)
    yield takeLatest(REQ_UPDATE_TODO, updatingTodo)
    yield takeLatest(REQ_SEARCH_TODO, searchingTodo)
    yield takeLatest(REQ_DEL_TODO, deletingTodo)
}