import axios from "../helpers/axios";
import { articleConstants } from "./constants";


export const getArticles = () => {
    return async (dispatch) => {
      
        dispatch({ type: articleConstants.GET_ALL_ARTICLE_REQUEST });
        const res = await axios.post(`/article/getArticle`).then(res => {
          
            dispatch({
                type: articleConstants.GET_ALL_ARTICLE_SUCCESS,
                payload: { articles: res.data.article, message: res.data.message },
            });
        }).catch(error => {
            dispatch({
                type: articleConstants.GET_ALL_ARTICLE_FAILURE,
                payload: {
                    error: error.response.data.error, message: error.response.data.message
                }
            })
        })
  
    };
}

    
export const addArticle = (form) => {
        return async (dispatch) => {
           
            dispatch({ type: articleConstants.ADD_NEW_ARTICLE_REQUEST });
            const res = await axios.post(`/article/createArticle`, form).then(res => {
                dispatch({
                    type: articleConstants.ADD_NEW_ARTICLE_SUCCESS,
                    payload: { article: res.data.article, message: res.data.message }
                });
                dispatch(getArticles());
            }).catch(error => {
                dispatch({
                    type: articleConstants.ADD_NEW_ARTICLE_SUCCESS,
                    payload: { error: error.response.data.article, message: error.response.data.message }
                });
            });
        }
}
