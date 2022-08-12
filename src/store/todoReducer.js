
const defaultState = {
    todos: []
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
            return {...state, todos:
                state.todos.map((todo, index,) => {
                    if(index === action.payload) {
                        console.log(state)
                        console.log(action)
                        return {
                            id: todo.id,
                            text: action.text,
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
export const editTodoAction = (payload) => ({type:EDIT_TODO, payload})
