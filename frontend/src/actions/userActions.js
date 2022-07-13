import axios from 'axios';
import {
   USER_CHECK_FAIL,
   USER_CHECK_REQUEST,
   USER_CHECK_SUCCESS,
   USER_DETAILS_FAIL,
   USER_DETAILS_REQUEST,
   USER_DETAILS_SUCCESS,
   USER_LOGIN_FAIL,
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   USER_LOGOUT,
   USER_REGISTER_FAIL,
   USER_REGISTER_REQUEST,
   USER_REGISTER_SUCCESS,
   USER_UPDATE_FAIL,
   USER_UPDATE_REQUEST,
   USER_UPDATE_RESET,
   USER_UPDATE_SUCCESS,
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
         localStorage.setItem('token', JSON.stringify(res.data.token));
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
         localStorage.setItem('token', JSON.stringify(res.data.token));
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: USER_LOGIN_FAIL });
      });
};

// Get user details
export const getUserDetails = (id) => (dispatch, getState) => {
   dispatch({ type: USER_DETAILS_REQUEST });

   axios
      .get(`/api/users/${id}`, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: USER_DETAILS_FAIL });
      });
};

// Update user details
export const updateUser = (user) => (dispatch, getState) => {
   dispatch({ type: USER_UPDATE_REQUEST });

   axios
      .put('/api/users', user, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: res.data,
         });

         dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });
         dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data });

         localStorage.setItem('user', JSON.stringify(res.data.user));
         localStorage.setItem('token', JSON.stringify(res.data.token));

         dispatch({ type: USER_UPDATE_RESET });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: USER_UPDATE_FAIL });
      });
};

export const logoutUser = () => (dispatch) => {
   dispatch({ type: USER_LOGOUT });

   localStorage.removeItem('user');
   localStorage.removeItem('token');
   document.location.href = '/login';
};

export const tokenConfig = (getState) => {
   const token = getState().userLogin.token;

   const config = {
      headers: {
         'Content-type': 'application/json',
      },
   };

   if (token) {
      config.headers['x-auth-token'] = token;
   }

   return config;
};
