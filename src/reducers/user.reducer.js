import { userConstants } from "../actions/constants"

const initState = {
    error: '',
    message: '',
    loading: false
}

export default (state = initState, action) => {
    switch(action.type){
        case userConstants.REGISTER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.REGISTER_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
            break;
        case userConstants.REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
                message: action.payload.message
            }
            break;
        case userConstants.DELETE_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.DELETE_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
            break;
        case userConstants.DELETE_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
                message: action.payload.message
            }
            break;
    }

    return state;
}