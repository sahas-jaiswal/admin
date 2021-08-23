import authReducer from './auth.reducer';
import userReducer from './user.reducer';
import articleReducer from './articles.reducer';
import categoryReducer from './category.reducer';
//import orderReducer from './order.reducer';
//import pageReducer from './page.reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    article: articleReducer,
    //order: orderReducer,
    //page: pageReducer
});

export default rootReducer;