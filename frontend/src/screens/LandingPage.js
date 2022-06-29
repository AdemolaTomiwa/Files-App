import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { returnErrors } from '../actions/errorActions';

const LandingPage = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const userRegister = useSelector((state) => state.userRegister);
   const { user } = userRegister;

   const userLogin = useSelector((state) => state.userLogin);
   const { loggedUser } = userLogin;

   useEffect(() => {
      if (!user && !loggedUser) {
         dispatch(returnErrors('Please Login!'));

         navigate('/login');
      }
   }, [user, loggedUser, navigate, dispatch]);

   return <div className="landing-page">Landing Page</div>;
};

export default LandingPage;
