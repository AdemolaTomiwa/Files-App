import {
   USER_CHECK_FAIL,
   USER_CHECK_REQUEST,
   USER_CHECK_SUCCESS,
} from '../constants/userConstants';

const initialState = {
   user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null,
   isLoggedIn: localStorage.getItem('user') ? true : null,
   userLoading: false,
   checkSuccess: null,
};

export default function userReducer(state = initialState, action) {
   switch (action) {
      case USER_CHECK_REQUEST:
         return {
            ...state,
            userLoading: true,
         };
      case USER_CHECK_SUCCESS:
         return {
            ...state,
            userLoading: false,
            checkSuccess: action.payload,
         };
      case USER_CHECK_FAIL:
         return {
            ...state,
            userLoading: false,
            checkSuccess: null,
         };
      default:
         return state;
   }
}
