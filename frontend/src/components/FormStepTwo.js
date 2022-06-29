import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors } from '../actions/errorActions';

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

   // const [firstName, setFirstName] = useState('');
   // const [lastName, setLastName] = useState('');
   // const [password, setPassword] = useState('');
   const [showPassword, setshowPassword] = useState(false);

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

      // const newUser = {
      //    firstName,
      //    lastName,
      //    password,
      // };

      // console.log(newUser);
   };

   return (
      <div className="register-page">
         <div className="head">
            <h3>
               Welcome to <span>Files</span>
            </h3>
            <p>We keep track of all kinds of files</p>
         </div>

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
               <button className="btn btn-primary">Login</button>
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
            Already have an account? <Link to="/login">Log In</Link>
         </strong>
      </div>
   );
};

export default FormStepTwo;
