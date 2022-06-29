import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FormStepTwo = () => {
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [password, setPassword] = useState('');

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
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your First Name"
               />
            </div>
            <div>
               <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your Last Name"
               />
            </div>
            <div>
               <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
               />
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
