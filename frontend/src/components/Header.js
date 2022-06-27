import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
   const [header, setHeader] = useState(false);

   const changeHeaderBg = () => {
      if (window.scrollY >= 60) {
         setHeader(true);
      } else {
         setHeader(false);
      }
   };

   window.addEventListener('scroll', changeHeaderBg);

   return (
      <header className={header ? 'active' : ''}>
         <div className="header">
            <div className="logo">
               <h4>
                  <Link to="/">Files</Link>
               </h4>
            </div>
            <nav>
               <Link to="/register">Register</Link>
               <Link to="/login">Login</Link>
            </nav>
         </div>
      </header>
   );
};

export default Header;
