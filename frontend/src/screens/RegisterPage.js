import React, { useState } from 'react';
import FormStepOne from '../components/FormStepOne';
import FormStepTwo from '../components/FormStepTwo';

const RegisterPage = () => {
   const [steps, setSteps] = useState(1);

   const proceed = () => {
      setSteps(steps + 1);
   };

   switch (steps) {
      case 1:
         return <FormStepOne proceed={proceed} />;
      case 2:
         return <FormStepTwo proceed={proceed} />;
      default:
         return;
   }
};

export default RegisterPage;
