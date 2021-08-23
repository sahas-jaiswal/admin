import { articleConstants } from "../actions/constants";

const initialState = {
    article: [],
    loading: false,
    message: "",
    error:""
};

export default (state = initialState, action) => {
    switch(action.type){
        case articleConstants.GET_ALL_ARTICLE_REQUEST:
            state = {
                ...state,
                loading:true,
            }
            break;
        case articleConstants.GET_ALL_ARTICLE_SUCCESS:
            state = {
                ...state,
                article: action.payload.article,
                loading: false,
                message: action.payload.message,
            }
            break;
        case articleConstants.GET_ALL_ARTICLE_FAILURE:
            state = {
                ...state,
                loading: false,
                message: action.payload.message,
                error: action.payload.error
            }
            break;
        case articleConstants.ADD_NEW_ARTICLE_REQUEST:
            state = {
                ...state,
                loading:true,
            }
            break;
        case articleConstants.ADD_NEW_ARTICLE_SUCCESS:
            state = {
                ...state,
                article: action.payload.article,
                loading: false,
                message: action.payload.message,
            }
            break;
        case articleConstants.ADD_NEW_ARTICLE_FAILURE:
            state = {
                ...state,
                loading: false,
                message: action.payload.message,
                error: action.payload.error
            }
            break;
    }

    return state;
}