import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
   userCheckReducer,
   userRegisterReducer,
   userLoginReducer,
} from './reducers/userReducer';
import { errorReducer } from './reducers/errorReducer';
import {
   getFilesReducer,
   getFileReducer,
   createFileReducer,
   deleteFileFieldReducer,
   deleteFileReducer,
} from './reducers/fileReducer';

const reducer = combineReducers({
   userCheck: userCheckReducer,
   userRegister: userRegisterReducer,
   userLogin: userLoginReducer,
   getFiles: getFilesReducer,
   getFile: getFileReducer,
   createFile: createFileReducer,
   deleteFileField: deleteFileFieldReducer,
   deleteFile: deleteFileReducer,
   error: errorReducer,
});

const userInfoFromStorage = localStorage.getItem('user')
   ? JSON.parse(localStorage.getItem('user'))
   : null;

const userTokenFromStorage = localStorage.getItem('token')
   ? JSON.parse(localStorage.getItem('token'))
   : null;

const initialState = {
   userRegister: { user: userInfoFromStorage, token: userTokenFromStorage },
   userLogin: { user: userInfoFromStorage, token: userTokenFromStorage },
};

const middleware = [thunk];

// For Development
const store = createStore(
   reducer,
   initialState,
   composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
