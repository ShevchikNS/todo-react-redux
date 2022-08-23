import {createStore, combineReducers, applyMiddleware} from "redux";
import {todoReducer} from "./todoReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {authReducer} from "./authReducer";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    todos: todoReducer,
    auth: authReducer
})
export const store  = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))