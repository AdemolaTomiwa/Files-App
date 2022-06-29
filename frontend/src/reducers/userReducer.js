import {
   USER_CHECK_FAIL,
   USER_CHECK_REQUEST,
   USER_CHECK_SUCCESS,
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
