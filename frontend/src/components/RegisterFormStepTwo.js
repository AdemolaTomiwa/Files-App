import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors } from '../actions/errorActions';
import Loader from './Loader';
import Message from './Message';

const FormStepTwo = ({
   userFirstName,
   userLastName,
   userPassword,
   setUserFirstName,
   setUserLastName,
   setUserPassword,
   registerUser,
}) => {
   const dispatch = useDispatch();

   const [showPassword, setshowPassword] = useState(false);

   const userRegister = useSelector((state) => state.userRegister);
   const { loading } = userRegister;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   const togglePassword = () => {
      setshowPassword(!showPassword);
   };

   useEffect(() => {
      dispatch(clearErrors());
   }, [dispatch]);

   const onSubmit = (e) => {
      e.preventDefault();

      // Register user through Register page
      registerUser();
   };

   return (
      <div className="register-page">
         <div className="head">
            <h3>
               Welcome to <span>Files</span>
            </h3>
            <p>We keep track of all kinds of files</p>
         </div>

         {msg && <Message msg={msg} variant="error" />}

         <form onSubmit={onSubmit}>
            <div>
               <input
                  type="text"
                  value={userFirstName}
                  onChange={(e) => setUserFirstName(e.target.value)}
                  placeholder="Enter your First Name"
               />
            </div>
            <div>
               <input
                  type="text"
                  value={userLastName}
                  onChange={(e) => setUserLastName(e.target.value)}
                  placeholder="Enter your Last Name"
               />
            </div>
            <div className="password">
               <input
                  type={showPassword ? 'text' : 'password'}
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  placeholder="Enter your Password"
               />
               <i
                  onClick={togglePassword}
                  className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}
               ></i>
            </div>

            <div>
               <button className="btn btn-primary">
                  {loading ? <Loader /> : 'Register'}
               </button>
            </div>
         </form>

         <strong>
            Already have an account? <Link to="/login">Log In</Link>
         </strong>
      </div>
   );
};

export default FormStepTwo;
