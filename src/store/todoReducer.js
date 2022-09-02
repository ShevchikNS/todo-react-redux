import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase";


if (localStorage.getItem("todoItems") === null || localStorage.getItem("todoItems") === undefined)
    localStorage.setItem('todoItems', '[]');
const defaultState = {
    todos: JSON.parse(localStorage.getItem('todoItems'))
}
const ADD_TODO = "ADD_TODO"
const REMOVE_TODO = "REMOVE_TODO"
const EDIT_TODO = "EDIT_TODO"
const FILTER_TODO_FOLDER = "FILTER_TODO_FOLDER"
const UPDATE_TODO = "UPDATE_TODO"

export const todoReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {...state, todos: [...state.todos, action.payload]}
        case REMOVE_TODO:
            return {...state, todos: state.todos.filter((todo) => todo.id !== action.payload)}
        case EDIT_TODO:
            return {
                ...state, todos: state.todos.map((todo, index) => {
                    if (index === action.payload) {
                        return {
                            id: todo.id,
                            text: action.newTodo,
                            userId: todo.userId,
                            folderId: todo.folderId
                        }
                    }
                    return todo
                })
            }
        case FILTER_TODO_FOLDER:
            if (action.payload === "1")
                return {...state, todos: state.todos}
            else
                return {...state, todos: state.todos.filter((todo) => todo.folderId === action.payload)}
        case UPDATE_TODO:
            return {todos: action.payload}
        default:
            return state
    }
}
export const addTodoAction = (payload) => ({type: ADD_TODO, payload})
export const removeTodoAction = (payload) => ({type: REMOVE_TODO, payload})
export const editTodoAction = (payload, newTodo) => ({type: EDIT_TODO, payload, newTodo})
export const filterTodo = (payload) => ({type: FILTER_TODO_FOLDER, payload})
export const updateTodoAction = (payload) => ({type: UPDATE_TODO, payload})