const currentUser = {
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}

const GET_CURRENT_USER = "GET_CURRENT_USER"

export const userReducer = (state = currentUser, action) => {
    switch (action.type) {
        case GET_CURRENT_USER:
            return {user: action.payload}
        default: return state
    }
}

export const setCurrentUserAction = (payload) => ({type:GET_CURRENT_USER, payload})