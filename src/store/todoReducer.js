import {collection, doc, getDocs, updateDoc} from "firebase/firestore";
import {db} from "../firebase";

const defaultState = {
    todos: []
}
const ADD_TODO = "ADD_TODO"
const REMOVE_TODO = "REMOVE_TODO"
const EDIT_TODO = "EDIT_TODO"
const FILTER_TODO_FOLDER = "FILTER_TODO_FOLDER"
const UPDATE_TODO = "UPDATE_TODO"
const FETCH_TODOS = "FETCH_TODOS"
export const todoReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {...state, todos: [...state.todos, action.payload]}
        case REMOVE_TODO:
            return {...state, todos: state.todos.filter((todo) => todo.todoId !== action.payload)}
        case EDIT_TODO:
            return {
                ...state, todos: state.todos.map(async (todo, index) => {
                    if (index === action.payload) {
                        let editId = ""
                        const querySnapshot = await getDocs(collection(db, "todos"));
                        querySnapshot.forEach((doc) => {
                                if (`${doc.data().todoId}` === `${todo.todoId}`) {
                                    editId = doc.id

                                }
                            }
                        );
                        const data = {
                            text: action.newTodo
                        };
                        console.log(action.newTodo)
                        const docRef = doc(db, "todos", editId)
                        updateDoc(docRef, data)
                            .then(docRef => {
                                console.log("Value of an Existing Document Field has been updated");
                            })
                            .catch(error => {
                                console.log(error);
                            })
                        return {
                            todoId: todo.todoId,
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
        case FETCH_TODOS:
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
export const fetchTodos = (payload) => ({type: FETCH_TODOS, payload})