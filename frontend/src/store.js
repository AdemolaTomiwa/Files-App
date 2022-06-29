import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
   userCheckReducer,
   userRegisterReducer,
   userLoginReducer,
} from './reducers/userReducer';
import { errorReducer } from './reducers/errorReducer';

const reducer = combineReducers({
   userCheck: userCheckReducer,
   userRegister: userRegisterReducer,
   userLogin: userLoginReducer,
   error: errorReducer,
});

const userInfoFromStorage = localStorage.getItem('user')
   ? JSON.parse(localStorage.getItem('user'))
   : null;

const initialState = {
   userRegister: { user: userInfoFromStorage },
   userLogin: { user: userInfoFromStorage },
};

const middleware = [thunk];

// For Development
const store = createStore(
   reducer,
   initialState,
   composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
