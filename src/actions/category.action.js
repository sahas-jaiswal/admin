import axios from "../helpers/axios";
import { categoryConstants } from "./constants";

export const getAllCategory = () => {
    return async dispatch => {
       
        dispatch({ type: categoryConstants.GET_ALL_CATEGORY_REQUEST });
        const res = await axios.get(`category/CategoryAll`); 
        if (res.status === 200) {
                const { categoryList } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
                payload: { categories: categoryList }
            })
        } else {

            dispatch({
                type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
                payload: {error : res.data}
            })
        }
    }
}

export const addCategory = (cat) => {
    return async dispatch => {
        dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });
        try {
            console.log(cat)
            const res = await axios.post(`/category/CategoryAdd`, cat).then(res => {
                dispatch({
                    type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
                    payload: { category: res.data.category, message: res.data.message }
                });
                dispatch(getAllCategory());
            }).catch(err => {
                dispatch({
                    type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                    payload: { error: err.response.data.error, message: err.response.data.message }
                });
            });
        } catch (error) {   
            console.log(error.response);
        }

    }
}

export const deleteCategory = (name) => {
    
    console.log(name);
    return async (dispatch) => {
        dispatch({ type: categoryConstants.DELETE_CATEGORY_REQUEST });
        await axios.delete(`/category/CategoryDelete`, {
                data:{ name: name}
        }).then(res => {
                const { message } = res.data;
                dispatch({
                    type: categoryConstants.DELETE_CATEGORY_SUCCESS,
                    payload: { message: message }
                })
            dispatch(getAllCategory());
        }).catch(err => {
            dispatch({
                type: categoryConstants.DELETE_CATEGORY_FAILURE,
                payload: { error: err.response.data.error, message: err.response.data.message }
            })
        })
    }
}