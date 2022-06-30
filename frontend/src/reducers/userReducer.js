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
         return { loading: false, user: action.payload.user };
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
         return { loading: false, user: action.payload.user };
      case USER_LOGIN_FAIL:
         return { loading: false };
      case USER_LOGOUT:
         return {};
      default:
         return state;
   }
};
