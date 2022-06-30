import axios from 'axios';
import {
   USER_CHECK_FAIL,
   USER_CHECK_REQUEST,
   USER_CHECK_SUCCESS,
   USER_LOGIN_FAIL,
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   USER_LOGOUT,
   USER_REGISTER_FAIL,
   USER_REGISTER_REQUEST,
   USER_REGISTER_SUCCESS,
} from '../constants/userConstants';

import { returnErrors } from './errorActions';

export const checkUser = (userEmail) => (dispatch) => {
   dispatch({ type: USER_CHECK_REQUEST });

   const config = {
      headers: {
         'Content-type': 'application/json',
      },
   };

   axios
      .post('/api/users/check', userEmail, config)
      .then((res) => {
         dispatch({
            type: USER_CHECK_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: USER_CHECK_FAIL });
      });
};

export const checkLoginUser = (userEmail) => (dispatch) => {
   dispatch({ type: USER_CHECK_REQUEST });

   const config = {
      headers: {
         'Content-type': 'application/json',
      },
   };

   axios
      .post('/api/auth/check', userEmail, config)
      .then((res) => {
         dispatch({
            type: USER_CHECK_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: USER_CHECK_FAIL });
      });
};

export const registerUser = (user) => (dispatch) => {
   dispatch({
      type: USER_REGISTER_REQUEST,
   });

   const config = {
      headers: {
         'Content-type': 'application/json',
      },
   };
   axios
      .post('/api/users', user, config)
      .then((res) => {
         dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: res.data,
         });

         dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });

         localStorage.setItem('user', JSON.stringify(res.data.user));
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: USER_REGISTER_FAIL });
      });
};

export const loginUser = (user) => (dispatch) => {
   dispatch({
      type: USER_LOGIN_REQUEST,
   });

   const config = {
      headers: {
         'Content-type': 'application/json',
      },
   };
   axios
      .post('/api/auth', user, config)
      .then((res) => {
         dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: res.data,
         });

         dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data });

         localStorage.setItem('user', JSON.stringify(res.data.user));
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: USER_LOGIN_FAIL });
      });
};

export const logoutUser = () => (dispatch) => {
   dispatch({ type: USER_LOGOUT });

   localStorage.removeItem('user');
   document.location.href = '/login';
};
