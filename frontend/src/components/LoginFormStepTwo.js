import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors } from '../actions/errorActions';
import Loader from './Loader';
import Message from './Message';

const FormStepTwo = ({ userPassword, setUserPassword, loginUser }) => {
   const dispatch = useDispatch();

   const [showPassword, setshowPassword] = useState(false);

   const userLogin = useSelector((state) => state.userLogin);
   const { loading } = userLogin;

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

      // Login user through Login page
      loginUser();
   };

   return (
      <div className="login-page">
         <div className="head">
            <h3>
               Welcome to <span>Files</span>
            </h3>
            <p>We keep track of all kinds of files</p>
         </div>

         <form onSubmit={onSubmit}>
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
            {msg && <Message msg={msg} variant="error" />}

            <div>
               <button className="btn btn-primary">
                  {loading ? <Loader /> : 'Login'}
               </button>
            </div>
         </form>

         <strong>
            Don't have an account? <Link to="/register">Register Now</Link>
         </strong>
      </div>
   );
};

export default FormStepTwo;
