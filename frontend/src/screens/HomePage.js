import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
   const navigate = useNavigate();
   const [show, setShow] = useState(false);

   const userRegister = useSelector((state) => state.userRegister);
   const { user } = userRegister;

   useEffect(() => {
      // Make the Intepretation show every 3 seconds
      const interval = setInterval(() => {
         setShow(!show);
      }, 3000);

      // Navigate to Landing page is logged in

      if (user) {
         return navigate('/landing');
      }

      return () => {
         clearInterval(interval);
      };
   }, [show, navigate, user]);

   return (
      <div className="homepage">
         <div className="content">
            <h1>Files</h1>
            <h4>あらゆる種類のファイルを追跡します</h4>
            <h5 className={show ? 'show' : ''}>
               (We keep track of all kinds of files)
            </h5>
         </div>
      </div>
   );
};

export default HomePage;
