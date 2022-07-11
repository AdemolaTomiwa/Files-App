import axios from 'axios';
import {
   CREATE_FILE_FAIL,
   CREATE_FILE_REQUEST,
   CREATE_FILE_RESET,
   CREATE_FILE_SUCCESS,
   DELETE_FILE_FAIL,
   DELETE_FILE_FIELD_FAIL,
   DELETE_FILE_FIELD_REQUEST,
   DELETE_FILE_FIELD_RESET,
   DELETE_FILE_FIELD_SUCCESS,
   DELETE_FILE_REQUEST,
   DELETE_FILE_RESET,
   DELETE_FILE_SUCCESS,
   GET_RECENT_FILES_FAIL,
   GET_RECENT_FILES_REQUEST,
   GET_RECENT_FILES_SUCCESS,
   GET_FILE_FAIL,
   GET_FILE_REQUEST,
   GET_FILE_SUCCESS,
   UPDATE_FILE_FAIL,
   UPDATE_FILE_FIELD_FAIL,
   UPDATE_FILE_FIELD_REQUEST,
   UPDATE_FILE_FIELD_RESET,
   UPDATE_FILE_FIELD_SUCCESS,
   UPDATE_FILE_REQUEST,
   UPDATE_FILE_RESET,
   UPDATE_FILE_SUCCESS,
   GET_FILES_REQUEST,
   GET_FILES_SUCCESS,
   GET_FILES_FAIL,
   GET_PHOTOS_REQUEST,
   GET_PHOTOS_SUCCESS,
   GET_PHOTOS_FAIL,
} from '../constants/fileConstants';

import { returnErrors } from './errorActions';
import { tokenConfig } from './userActions';

// Get all users files
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

// Get all users current files
export const getRecentFiles = () => (dispatch, getState) => {
   dispatch({ type: GET_RECENT_FILES_REQUEST });

   axios
      .get('/api/files/recent', tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: GET_RECENT_FILES_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: GET_RECENT_FILES_FAIL });
      });
};

// Get all photos
export const getPhotos = (id) => (dispatch, getState) => {
   dispatch({ type: GET_PHOTOS_REQUEST });

   axios
      .post('/api/uploads/photos', id)
      .then((res) => {
         dispatch({
            type: GET_PHOTOS_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: GET_PHOTOS_FAIL });
      });
};

// Get an individual file with Id
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

// Create a new file
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

// Delete a file field
export const deleteFileField = (field, id) => (dispatch, getState) => {
   dispatch({ type: DELETE_FILE_FIELD_REQUEST });

   axios
      .put(`/api/files/field/${id}`, field, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: DELETE_FILE_FIELD_SUCCESS,
         });
         dispatch({ type: GET_FILE_SUCCESS, payload: res.data });
         dispatch({ type: DELETE_FILE_FIELD_RESET });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({
            type: DELETE_FILE_FIELD_FAIL,
         });
      });
};

// Update file
export const updateFile = (file) => (dispatch, getState) => {
   dispatch({ type: UPDATE_FILE_REQUEST });

   axios
      .put('/api/files/update', file, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: UPDATE_FILE_SUCCESS,
         });

         dispatch({ type: GET_FILE_SUCCESS, payload: res.data });
         dispatch({ type: UPDATE_FILE_RESET });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: UPDATE_FILE_FAIL });
      });
};

// Update a field
export const updateField = (field) => (dispatch, getState) => {
   dispatch({ type: UPDATE_FILE_FIELD_REQUEST });
   axios
      .put('/api/files/update/field', field, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: UPDATE_FILE_FIELD_SUCCESS,
         });
         dispatch({ type: GET_FILE_SUCCESS, payload: res.data });
         dispatch({ type: UPDATE_FILE_FIELD_RESET });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: UPDATE_FILE_FIELD_FAIL });
      });
};

// Delete a file
export const deleteFile = (id) => (dispatch, getState) => {
   dispatch({ type: DELETE_FILE_REQUEST });

   axios
      .delete(`/api/files/${id}`, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: DELETE_FILE_SUCCESS,
            payload: res.data,
         });
         dispatch({ type: DELETE_FILE_RESET });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: DELETE_FILE_FAIL });
      });
};
