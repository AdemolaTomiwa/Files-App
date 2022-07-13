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

export const userCheckReducer = (state = {}, action) => {
   switch (action.type) {
      case USER_CHECK_REQUEST:
         return { loading: true };
      case USER_CHECK_SUCCESS:
         return { loading: false, success: action.payload.success };
      case USER_CHECK_FAIL:
         return { loading: false, checkSuccess: null };
      default:
         return state;
   }
};

export const userRegisterReducer = (state = {}, action) => {
   switch (action.type) {
      case USER_REGISTER_REQUEST:
         return { loading: true };
      case USER_REGISTER_SUCCESS:
         return {
            loading: false,
            user: action.payload.user,
            token: action.payload.token,
         };
      case USER_REGISTER_FAIL:
         return { loading: false };
      case USER_LOGOUT:
         return {};
      default:
         return state;
   }
};

export const userLoginReducer = (state = {}, action) => {
   switch (action.type) {
      case USER_LOGIN_REQUEST:
         return { loading: true };
      case USER_LOGIN_SUCCESS:
         return {
            loading: false,
            user: action.payload.user,
            token: action.payload.token,
         };
      case USER_LOGIN_FAIL:
         return { loading: false };
      case USER_LOGOUT:
         return {};
      default:
         return state;
   }
};

export const userDetailsReducer = (
   state = { details: {}, fields: [], photos: [] },
   action
) => {
   switch (action.type) {
      case USER_DETAILS_REQUEST:
         return { loading: true };
      case USER_DETAILS_SUCCESS:
         return {
            loading: false,
            details: action.payload,
            fields: action.payload.fields,
            photos: action.payload.photos,
         };
      case USER_DETAILS_FAIL:
         return { loading: false };
      case USER_LOGOUT:
         return {};
      default:
         return state;
   }
};

export const updateUserReducer = (state = {}, action) => {
   switch (action.type) {
      case USER_UPDATE_REQUEST:
         return { loading: true };
      case USER_UPDATE_SUCCESS:
         return {
            loading: false,
            user: action.payload.user,
            token: action.payload.token,
            success: true,
         };
      case USER_UPDATE_FAIL:
         return { loading: false };
      case USER_UPDATE_RESET:
         return {};
      default:
         return state;
   }
};
