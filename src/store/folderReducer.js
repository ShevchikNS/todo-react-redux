
const defaultState = {
    folder: []
}

const ADD_FOLDER = "ADD_FOLDER"
const REMOVE_FOLDER = "REMOVE_FOLDER"
const FETCH_FOLDERS = "FETCH_FOLDERS"

export const folderReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_FOLDER:
            return {...state, folder: [...state.folder, action.payload]}
        case REMOVE_FOLDER:
            return {...state, folder: state.folder.filter((folderItem)=> folderItem.folderId !== action.payload)}
        case FETCH_FOLDERS:
            return {folder: action.payload}
        default:
            return state
    }
}

export const addFolderAction = (payload) => ({type: ADD_FOLDER, payload})
export const removeFolderAction = (payload) => ({type: REMOVE_FOLDER, payload})
export const fetchFoldersAction = (payload) => ({type: FETCH_FOLDERS, payload})