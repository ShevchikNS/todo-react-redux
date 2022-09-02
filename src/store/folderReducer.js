if (localStorage.getItem("todoFolder") == null)
    localStorage.setItem('todoFolder', '[]');

const defaultState = {
    folder: JSON.parse(localStorage.getItem('todoFolder'))
}

const ADD_FOLDER = "ADD_FOLDER"
const REMOVE_FOLDER = "REMOVE_FOLDER"
export const folderReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_FOLDER:
            return {...state, folder: [...state.folder, action.payload]}
        case REMOVE_FOLDER:
            return {...state, folder: state.folder.filter((folderItem)=> folderItem.folderId !== action.payload)}
        default:
            return state
    }
}

export const addFolderAction = (payload) => ({type: ADD_FOLDER, payload})
export const removeFolderAction = (payload) => ({type: REMOVE_FOLDER, payload})