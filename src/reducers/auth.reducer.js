import { authConstants } from "../actions/constants";

const initState = {
    token: null,
    user: {
        username:'',
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        role:'',
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: '',
    message: ''
};

export default (state = initState, action) => {

    console.log(action);

    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true,
                loading: true
            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false,
                loading: false
            }
            break;
        case authConstants.LOGIN_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
                message: action.payload.message
            }
            break;
        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...initState
            }
            break;
        case authConstants.LOGOUT_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false,
            }
            break;
        case authConstants.GET_ALL_USERS_REQUEST:
            state = {
                ...state,
                loading:true,
            }
            break;
        case authConstants.GET_ALL_USERS_SUCCESS:
            state = {
                ...state,
                users: action.payload.users,
                loading:false,
            }
            break;
        case authConstants.GET_ALL_USERS_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading:false,
            }
            break;

    }


    return state;
}