import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { checkUser } from '../actions/userActions';

const FormStepOne = ({ proceed }) => {
   const dispatch = useDispatch();

   const [email, setEmail] = useState('');

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

      const userEmail = {
         email,
      };

      dispatch(checkUser(userEmail));
   };

   return (
      <div className="register-page">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
               />
            </div>
            {msg && (
               <small>
                  <i className="fas fa-exclamation-circle"></i>
                  {msg}
               </small>
            )}

            <div>
               <button className="btn btn-primary" onClick={proceedHandler}>
                  Continue
               </button>
            </div>

            {loading && <i className="fas fa-spinner spin"></i>}
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
            Already have an account? <Link to="/login">Log In</Link>
         </strong>
      </div>
   );
};

export default FormStepOne;
