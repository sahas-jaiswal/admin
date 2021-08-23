import { userConstants } from './constants';
import axios from '../helpers/axios';

export const signup = (user) => {

    console.log(user)

    return async (dispatch) => {

        dispatch({ type: userConstants.REGISTER_REQUEST });
        await axios.post(`/admin/signup`, {
            ...user
        }).then(res => {
            if (res.status === 200) {
                const { message } = res.data;
                dispatch({
                    type: userConstants.REGISTER_SUCCESS,
                    payload: { message }
                });
            }
        }).catch(err => {
            dispatch({
                type: userConstants.REGISTER_FAILURE,
                payload: { error: err.response.data.error, message: err.response.data.message }
            });
        });
    }
};

export const deleteUser = (id) => {
    console.log(id);
    return async (dispatch) => {
        dispatch({ type: userConstants.DELETE_REQUEST });
        await axios.delete(`/admin/deleteUser`, {
                data:{ id: id}
        }).then(res => {
                const { message } = res.data;
                dispatch({
                    type: userConstants.DELETE_SUCCESS,
                    payload: { message: message }
                })
            
        }).catch(err => {
            dispatch({
                type: userConstants.DELETE_FAILURE,
                payload: { error: err.response.data.error, message: err.response.data.message }
            })
        })
    }
}
