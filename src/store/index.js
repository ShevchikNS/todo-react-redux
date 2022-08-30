import {createStore, combineReducers, applyMiddleware} from "redux";
import {todoReducer} from "./todoReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {authReducer} from "./authReducer";
import {userReducer} from "./userReducer";
import {folderReducer} from "./folderReducer";

const rootReducer = combineReducers({
    todos: todoReducer,
    auth: authReducer,
    currentUser: userReducer,
    folder: folderReducer
})
export const store  = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))