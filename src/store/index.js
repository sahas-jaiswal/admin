import { createStore, applyMiddleware, compose } from "redux";
//import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';
import thunk from "redux-thunk";

const store = createStore(rootReducer,applyMiddleware(thunk));

export default store;