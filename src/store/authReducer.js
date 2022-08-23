const isAuth = {
    authState: false
}

const CHECK_AUTH = "CHECK_AUTH"

export const authReducer = (state = isAuth, action) => {
    switch (action.type){
        case CHECK_AUTH:
            return { authState: action.payload}
        default:
            return state
    }
}
export const changeAuthAction = (payload) => ({type:CHECK_AUTH, payload})