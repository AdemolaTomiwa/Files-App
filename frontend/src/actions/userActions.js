import axios from 'axios';
import {
   USER_CHECK_FAIL,
   USER_CHECK_REQUEST,
   USER_CHECK_SUCCESS,
} from '../constants/userConstants';

import { returnErrors } from './errorActions';

export const checkUser = (userEmail) => (dispatch) => {
   dispatch({ type: USER_CHECK_REQUEST });

   const config = {
      headers: {
         'Content-type': 'application/json',
      },
   };

   axios
      .post('/api/users/check', userEmail, config)
      .then((res) => {
         dispatch({
            type: USER_CHECK_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: USER_CHECK_FAIL });
      });
};
