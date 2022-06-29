import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkUser } from '../actions/userActions';

import FormStepOne from '../components/FormStepOne';
import FormStepTwo from '../components/FormStepTwo';

const RegisterPage = () => {
   const dispatch = useDispatch();

   const [steps, setSteps] = useState(1);
   const [userEmail, setUserEmail] = useState('');
   const [userFirstName, setUserFirstName] = useState('');
   const [userLastName, setUserLastName] = useState('');
   const [userPassword, setUserPassword] = useState('');

   const proceed = () => {
      setSteps(steps + 1);
   };

   const checkEmail = (e) => {
      const email = {
         email: userEmail,
      };

      dispatch(checkUser(email));
   };

   const registerUser = (e) => {
      const newUser = {
         email: userEmail,
         firstName: userFirstName,
         lastName: userLastName,
         password: userPassword,
      };

      console.log(newUser);
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
               registerUser={registerUser}
            />
         );
      default:
         return;
   }
};

export default RegisterPage;
