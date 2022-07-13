import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';

import {
   userCheckReducer,
   userRegisterReducer,
   userLoginReducer,
   userDetailsReducer,
   updateUserReducer,
} from './reducers/userReducer';
import { errorReducer } from './reducers/errorReducer';
import {
   getFilesReducer,
   getRecentFilesReducer,
   getFileReducer,
   createFileReducer,
   deleteFileFieldReducer,
   deleteFileReducer,
   updateFileReducer,
   updateFileFieldReducer,
   getPhotosReducer,
} from './reducers/fileReducer';

const reducer = combineReducers({
   userCheck: userCheckReducer,
   userRegister: userRegisterReducer,
   userLogin: userLoginReducer,
   getFiles: getFilesReducer,
   getRecentFiles: getRecentFilesReducer,
   getFile: getFileReducer,
   createFile: createFileReducer,
   deleteFileField: deleteFileFieldReducer,
   deleteFile: deleteFileReducer,
   updateFile: updateFileReducer,
   updateField: updateFileFieldReducer,
   getPhotos: getPhotosReducer,
   userDetails: userDetailsReducer,
   updateUser: updateUserReducer,
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

// // For Development
// const store = createStore(
//    reducer,
//    initialState,
//    composeWithDevTools(applyMiddleware(...middleware))
// );

// For Production
const store = createStore(
   reducer,
   initialState,
   compose(applyMiddleware(...middleware))
);

export default store;
