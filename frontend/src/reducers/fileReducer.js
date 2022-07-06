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
} from '../constants/fileConstants';

export const getFilesReducer = (state = { files: [] }, action) => {
   switch (action.type) {
      case GET_RECENT_FILES_REQUEST:
         return { loading: true };
      case GET_RECENT_FILES_SUCCESS:
         return { loading: false, files: action.payload };
      case GET_RECENT_FILES_FAIL:
         return { loading: false };
      default:
         return state;
   }
};

export const getFileReducer = (
   state = { file: {}, fields: [], photos: [] },
   action
) => {
   switch (action.type) {
      case GET_FILE_REQUEST:
         return { loading: true };
      case GET_FILE_SUCCESS:
         return {
            loading: false,
            file: action.payload,
            fields: action.payload.fields,
            photos: action.payload.photos,
         };
      case GET_FILE_FAIL:
         return { loading: false };
      default:
         return state;
   }
};

export const createFileReducer = (state = {}, action) => {
   switch (action.type) {
      case CREATE_FILE_REQUEST:
         return { loading: true };
      case CREATE_FILE_SUCCESS:
         return { loading: false, success: true, file: action.payload };
      case CREATE_FILE_FAIL:
         return { loading: false, success: false };
      case CREATE_FILE_RESET:
         return {};
      default:
         return state;
   }
};

export const deleteFileFieldReducer = (state = {}, action) => {
   switch (action.type) {
      case DELETE_FILE_FIELD_REQUEST:
         return { loading: true };
      case DELETE_FILE_FIELD_SUCCESS:
         return { loading: false, success: true };
      case DELETE_FILE_FIELD_FAIL:
         return { loading: false };
      case DELETE_FILE_FIELD_RESET:
         return {};
      default:
         return state;
   }
};

export const updateFileReducer = (state = {}, action) => {
   switch (action.type) {
      case UPDATE_FILE_REQUEST:
         return { loading: true };
      case UPDATE_FILE_SUCCESS:
         return { loading: false, file: action.payload, success: true };
      case UPDATE_FILE_FAIL:
         return { loading: false };
      case UPDATE_FILE_RESET:
         return {};
      default:
         return state;
   }
};

export const updateFileFieldReducer = (state = {}, action) => {
   switch (action.type) {
      case UPDATE_FILE_FIELD_REQUEST:
         return { loading: true };
      case UPDATE_FILE_FIELD_SUCCESS:
         return { loading: false, file: action.payload, success: true };
      case UPDATE_FILE_FIELD_FAIL:
         return { loading: false };
      case UPDATE_FILE_FIELD_RESET:
         return {};
      default:
         return state;
   }
};

export const deleteFileReducer = (state = {}, action) => {
   switch (action.type) {
      case DELETE_FILE_REQUEST:
         return { loading: true };
      case DELETE_FILE_SUCCESS:
         return { loading: false, success: true };
      case DELETE_FILE_FAIL:
         return { loading: false };
      case DELETE_FILE_RESET: {
         return {};
      }
      default:
         return state;
   }
};
