import axios from 'axios';
import {
   CREATE_FILE_FAIL,
   CREATE_FILE_REQUEST,
   CREATE_FILE_RESET,
   CREATE_FILE_SUCCESS,
   GET_FILES_FAIL,
   GET_FILES_REQUEST,
   GET_FILES_SUCCESS,
   GET_FILE_FAIL,
   GET_FILE_REQUEST,
   GET_FILE_SUCCESS,
} from '../constants/fileConstants';

import { returnErrors } from './errorActions';
import { tokenConfig } from './userActions';

export const getFiles = () => (dispatch, getState) => {
   dispatch({ type: GET_FILES_REQUEST });

   axios
      .get('/api/files', tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: GET_FILES_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: GET_FILES_FAIL });
      });
};

export const getFile = (id) => (dispatch, getState) => {
   dispatch({ type: GET_FILE_REQUEST });

   axios
      .get(`/api/files/${id}`, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: GET_FILE_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: GET_FILE_FAIL });
      });
};

export const createNewFile = (file) => (dispatch, getState) => {
   dispatch({ type: CREATE_FILE_REQUEST });

   axios
      .post('/api/files', file, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: CREATE_FILE_SUCCESS,
            payload: res.data,
         });
         dispatch({ type: CREATE_FILE_RESET });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: CREATE_FILE_FAIL });
      });
};
