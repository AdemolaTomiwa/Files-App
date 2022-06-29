import React from 'react';
import { Link } from 'react-router-dom';

const Test = () => {
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
               <input type="email" placeholder="Enter your email" />
            </div>

            <div>
               <button className="btn btn-primary">Continue</button>
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

export default Test;
