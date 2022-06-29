import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkLoginUser, loginUser } from '../actions/userActions';

import FormStepOne from '../components/LoginFormStepOne';
import FormStepTwo from '../components/LoginFormStepTwo';
import { clearErrors } from '../actions/errorActions';

const LoginPage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [steps, setSteps] = useState(1);
   const [userEmail, setUserEmail] = useState('');
   const [userPassword, setUserPassword] = useState('');

   const userLogin = useSelector((state) => state.userLogin);
   const { user } = userLogin;

   useEffect(() => {
      dispatch(clearErrors());

      if (user) {
         navigate('/landing');
      }
   }, [navigate, user, dispatch]);

   const proceed = () => {
      setSteps(steps + 1);
   };

   const checkEmail = (e) => {
      const email = {
         email: userEmail,
      };

      dispatch(checkLoginUser(email));
   };

   const loginNewUser = (e) => {
      const newUser = {
         email: userEmail,
         password: userPassword,
      };

      dispatch(loginUser(newUser));
   };

   switch (steps) {
      case 1:
         return (
            <FormStepOne
               proceed={proceed}
               userEmail={userEmail}
               setUserEmail={setUserEmail}
               checkEmail={checkEmail}
            />
         );
      case 2:
         return (
            <FormStepTwo
               proceed={proceed}
               userPassword={userPassword}
               setUserPassword={setUserPassword}
               loginUser={loginNewUser}
            />
         );
      default:
         return;
   }
};

export default LoginPage;
