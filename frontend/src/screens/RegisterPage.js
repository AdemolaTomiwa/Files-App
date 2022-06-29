import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser, registerUser } from '../actions/userActions';

import FormStepOne from '../components/RegisterFormStepOne';
import FormStepTwo from '../components/RegisterFormStepTwo';

const RegisterPage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [steps, setSteps] = useState(1);
   const [userEmail, setUserEmail] = useState('');
   const [userFirstName, setUserFirstName] = useState('');
   const [userLastName, setUserLastName] = useState('');
   const [userPassword, setUserPassword] = useState('');

   const userRegister = useSelector((state) => state.userRegister);
   const { user } = userRegister;

   useEffect(() => {
      if (user) {
         navigate('/landing');
      }
   }, [navigate, user]);

   const proceed = () => {
      setSteps(steps + 1);
   };

   const checkEmail = (e) => {
      const email = {
         email: userEmail,
      };

      dispatch(checkUser(email));
   };

   const registerNewUser = (e) => {
      const newUser = {
         email: userEmail,
         firstName: userFirstName,
         lastName: userLastName,
         password: userPassword,
      };

      dispatch(registerUser(newUser));
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
               userFirstName={userFirstName}
               userLastName={userLastName}
               userPassword={userPassword}
               setUserFirstName={setUserFirstName}
               setUserLastName={setUserLastName}
               setUserPassword={setUserPassword}
               registerUser={registerNewUser}
            />
         );
      default:
         return;
   }
};

export default RegisterPage;
