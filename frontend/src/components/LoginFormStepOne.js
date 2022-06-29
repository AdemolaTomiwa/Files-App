import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from './Loader';

import Message from './Message';

const FormStepOne = ({ proceed, userEmail, setUserEmail, checkEmail }) => {
   const userCheck = useSelector((state) => state.userCheck);
   const { loading, success } = userCheck;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      if (success) {
         return proceed();
      }
   }, [success, proceed]);

   const proceedHandler = (e) => {
      e.preventDefault();

      // Confirm email through Register Page
      checkEmail();
   };

   return (
      <div className="login-page">
         <div className="head">
            <h3>
               Welcome to <span>Files</span>
            </h3>
            <p>We keep track of all kinds of files</p>
         </div>

         <form>
            <div>
               <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Enter your email"
               />
            </div>
            {msg && <Message msg={msg} variant="error" />}

            <div>
               <button className="btn btn-primary" onClick={proceedHandler}>
                  {loading ? <Loader /> : 'Continue'}
               </button>
            </div>
         </form>

         <strong>OR</strong>

         <div className="signup-btn">
            <div>
               <button className="btn btn-white">
                  <i className="fab fa-google"></i> Continue with Google
               </button>
            </div>
            <div>
               <button className="btn btn-white">
                  <i className="fab fa-facebook"></i> Continue with Facebook
               </button>
            </div>
         </div>

         <strong>
            Don't have an account? <Link to="/register">Register Now</Link>
         </strong>
      </div>
   );
};

export default FormStepOne;