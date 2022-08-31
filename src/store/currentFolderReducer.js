const currentFolder = {
    folder:  {
        folderId: "1",
        folderName: "ALL"
    }
}
const GET_CURRENT_FOLDER = "GET_CURRENT_FOLDER"

export const currentFolderReducer = (state = currentFolder, action) => {
    switch (action.type) {
        case GET_CURRENT_FOLDER:
            return {folder: action.payload}
        default:
            return state
    }
}

export const setCurrentFolderAction = (payload) => ({type: GET_CURRENT_FOLDER, payload})