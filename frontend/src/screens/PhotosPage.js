import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, returnErrors } from '../actions/errorActions';
import { getFiles } from '../actions/fileActions';
import Photo from '../components/Photo';

const PhotosPage = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const userRegister = useSelector((state) => state.userRegister);
   const { user } = userRegister;

   const userLogin = useSelector((state) => state.userLogin);
   const { loggedUser } = userLogin;

   const userFiles = useSelector((state) => state.getFiles);
   const { files, loading } = userFiles;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      dispatch(clearErrors());
      if (!user && !loggedUser) {
         dispatch(returnErrors('Please Login!'));

         navigate('/login');
      } else {
         dispatch(getFiles());

         // if (files) {
         //    return console.log(files);
         // }
      }
   }, [user, loggedUser, navigate, dispatch, files]);

   const photo = {
      url: '	http://res.cloudinary.com/the-tom-media/image/upload/v1656986729/z7ofpeufxky28zad1wgm.jpg',
      description: 'Tomiwa',
   };

   return (
      <div className="photospage">
         <div className="head">
            <h4>All Photos</h4>
         </div>
         <div className="photos">
            <Photo photo={photo} />
            <Photo photo={photo} />
            <Photo photo={photo} />
            <Photo photo={photo} />
            <Photo photo={photo} />
            <Photo photo={photo} />
         </div>
      </div>
   );
};

export default PhotosPage;
