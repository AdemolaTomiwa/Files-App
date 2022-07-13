import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../actions/userActions';
import Loader from './Loader';

const EditUserNameModal = ({
   closeUserNameModal,
   userFirstName,
   userLastName,
   id,
}) => {
   const dispatch = useDispatch();

   const [firstName, setFirstName] = useState(userFirstName);
   const [lastName, setLastName] = useState(userLastName);
   const [password, setPassword] = useState('');
   const [showPassword, setshowPassword] = useState(false);

   const updatedUser = useSelector((state) => state.updateUser);
   const { loading, success } = updatedUser;

   useEffect(() => {
      if (success) {
         closeUserNameModal();
      }
   }, [success, closeUserNameModal]);

   const togglePassword = () => {
      setshowPassword(!showPassword);
   };

   const updateForm = (e) => {
      e.preventDefault();

      const newUser = {
         firstName,
         lastName,
         password,
         id,
      };

      dispatch(updateUser(newUser));
   };

   return (
      <div className="editfilenamemodal">
         <form onSubmit={updateForm}>
            <div className="box">
               <div className="main">
                  <input
                     type="text"
                     name="firstname"
                     value={firstName}
                     autoComplete="off"
                     onChange={(e) => setFirstName(e.target.value)}
                     placeholder="First Name e.g John"
                  />
               </div>
               <div className="main">
                  <input
                     type="text"
                     name="lastName"
                     value={lastName}
                     autoComplete="off"
                     onChange={(e) => setLastName(e.target.value)}
                     placeholder="Last Name e.g Doe"
                  />
               </div>
               <div className="password">
                  <input
                     type={showPassword ? 'text' : 'password'}
                     name="password"
                     value={password}
                     autoComplete="off"
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder="Password e.g johndoe1234567890"
                  />
                  <i
                     onClick={togglePassword}
                     className={
                        showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                     }
                  ></i>
               </div>
               <div className="button">
                  <button type="submit" className="btn btn-dark">
                     {loading ? <Loader /> : 'Update'}
                  </button>
                  <div onClick={closeUserNameModal} className="btn btn-danger">
                     Close Modal
                  </div>
               </div>
            </div>
         </form>
      </div>
   );
};

export default EditUserNameModal;
