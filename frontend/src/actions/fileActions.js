import axios from 'axios';
import {
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
