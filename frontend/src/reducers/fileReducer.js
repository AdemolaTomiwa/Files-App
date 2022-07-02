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

export const getFilesReducer = (state = { files: [] }, action) => {
   switch (action.type) {
      case GET_FILES_REQUEST:
         return { loading: true };
      case GET_FILES_SUCCESS:
         return { loading: false, files: action.payload };
      case GET_FILES_FAIL:
         return { loading: false };
      default:
         return state;
   }
};

export const getFileReducer = (state = { file: {}, fields: [] }, action) => {
   switch (action.type) {
      case GET_FILE_REQUEST:
         return { loading: true };
      case GET_FILE_SUCCESS:
         return {
            loading: false,
            file: action.payload,
            fields: action.payload.fields,
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
