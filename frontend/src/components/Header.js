import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../actions/userActions';

const Header = () => {
   const dispatch = useDispatch();

   const [header, setHeader] = useState(false);

   const userLogin = useSelector((state) => state.userLogin);
   const { user } = userLogin;

   const changeHeaderBg = () => {
      if (window.scrollY >= 60) {
         setHeader(true);
      } else {
         setHeader(false);
      }
   };

   window.addEventListener('scroll', changeHeaderBg);

   const logout = () => {
      dispatch(logoutUser());
   };

   return (
      <header className={header ? 'active' : ''}>
         <div className="header">
            <div className="logo">
               <h4>
                  <Link to="/">Files</Link>
               </h4>
            </div>
            {!user ? (
               <nav>
                  <Link to="/register">Register</Link>
                  <Link to="/login">Login</Link>
               </nav>
            ) : (
               <nav>
                  <Link to="/allfiles">
                     <i className="fas fa-folders"></i> All Files
                  </Link>
                  <Link to="/photos">
                     <i className="fas fa-image"></i> Photos
                  </Link>
                  <Link to="/contacts">
                     <i className="fas fa-address-book"></i> Contacts
                  </Link>
                  <strong onClick={logout}>
                     <i className="fas fa-sign-out-alt"></i> Logout
                  </strong>
               </nav>
            )}
         </div>
      </header>
   );
};

export default Header;
