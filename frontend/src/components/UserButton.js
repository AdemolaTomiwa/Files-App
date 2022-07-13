import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserButton = () => {
   const userRegister = useSelector((state) => state.userRegister);
   const { user } = userRegister;

   return user ? (
      <Link to="/profile" className="userButton">
         <div className="icon">
            <i className="fas fa-user"></i>
         </div>
         <div className="content">
            <i className="fas fa-user"></i>
            <div className="details">
               <h6>
                  {user.firstName} {user.lastName}
               </h6>
               <small>{user.email}</small>
            </div>
         </div>
      </Link>
   ) : null;
};

export default UserButton;
