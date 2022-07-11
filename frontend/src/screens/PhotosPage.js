import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, returnErrors } from '../actions/errorActions';
import { getPhotos } from '../actions/fileActions';
import Photo from '../components/Photo';
import Loader from '../components/Loader';
import Message from '../components/Message';

const PhotosPage = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const userRegister = useSelector((state) => state.userRegister);
   const { user } = userRegister;

   const userLogin = useSelector((state) => state.userLogin);
   const { loggedUser } = userLogin;

   const userPhotos = useSelector((state) => state.getPhotos);
   const { loading, photos } = userPhotos;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      dispatch(clearErrors());
      if (!user && !loggedUser) {
         dispatch(returnErrors('Please Login!'));

         navigate('/login');
      } else {
         const id = {
            id: user.id,
         };

         dispatch(getPhotos(id));
      }
   }, [user, loggedUser, navigate, dispatch]);

   return (
      <div className="photospage">
         <div className="head">
            <h4>All Photos</h4>
         </div>
         <div>
            {loading ? (
               <Loader />
            ) : msg ? (
               <Message msg={msg} variant="error" box />
            ) : photos.length === 0 ? (
               <Message msg="You have no photos!" variant="success" box />
            ) : (
               <div className="photos">
                  {photos.map((photo, index) => (
                     <Photo
                        key={index}
                        photo=""
                        url={photo}
                        // id={id}
                        // updatedDescHandler={updatedDescHandler}
                        // openConfirmModal={openConfirmModalHandler}
                     />
                  ))}
               </div>
            )}
         </div>
      </div>
   );
};

export default PhotosPage;
