import {
   GET_FILES_FAIL,
   GET_FILES_REQUEST,
   GET_FILES_SUCCESS,
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
