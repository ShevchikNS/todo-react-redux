
if(localStorage.getItem("todoItems") == null)
    localStorage.setItem('todoItems', '[]');
const defaultState = {
    todos: JSON.parse(localStorage.getItem('todoItems'))
}
const ADD_TODO = "ADD_TODO"
const REMOVE_CUSTOMER = "REMOVE_CUSTOMER"
const EDIT_TODO = "EDIT_TODO"

export const todoReducer = (state = defaultState, action) => {
    switch (action.type){
        case ADD_TODO:
            return {...state, todos: [...state.todos, action.payload]}
        case REMOVE_CUSTOMER:
            return {...state, todos: state.todos.filter((todo)=> todo.id !== action.payload)}
        case EDIT_TODO:
            return {...state, todos: state.todos.map((todo, index,) => {
                    if(index === action.payload) {
                        return {
                            id: todo.id,
                            text: action.newTodo,
                        }
                    }
                    return todo
                })

            }
        default:
            return state
    }
}
export const addTodoAction = (payload) => ({type:ADD_TODO, payload})
export const removeTodoAction = (payload) => ({type:REMOVE_CUSTOMER, payload})
export const editTodoAction = (payload, newTodo) => ({type:EDIT_TODO, payload, newTodo})
