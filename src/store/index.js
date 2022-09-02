import {createStore, combineReducers, applyMiddleware} from "redux";
import {todoReducer} from "./todoReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {authReducer} from "./authReducer";
import {userReducer} from "./userReducer";
import {folderReducer} from "./folderReducer";
import {currentFolderReducer} from "./currentFolderReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    currentUser: userReducer,
    todos: todoReducer,
    folder: folderReducer,
    currentFolder: currentFolderReducer
})
export const store  = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))