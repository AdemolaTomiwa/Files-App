import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { returnErrors } from '../actions/errorActions';
import { updateFile } from '../actions/fileActions';
import {
   UPDATE_FILE_FAIL,
   UPDATE_FILE_REQUEST,
} from '../constants/fileConstants';
import ConfirmDeleteImageModal from './ConfirmDeleteImageModal';
import Message from './Message';
import Photo from './Photo';
import UploadModal from './UploadModal';

const PhotoFields = ({ id, photos, userId }) => {
   const dispatch = useDispatch();

   const [openModal, setOpenModal] = useState(false);
   const [openConfirmModal, setOpenConfirmModal] = useState(false);
   const [deletePhoto, setDeletePhoto] = useState({});

   const openModalHandler = () => {
      setOpenModal(true);
   };

   const closeModalHandler = () => {
      setOpenModal(false);
   };

   const updatedDescHandler = (descObj) => {
      let fiii = photos.filter((photo) => photo.id !== descObj.id);

      const newPhotos = {
         photos: [...fiii, descObj],
         id,
      };

      dispatch(updateFile(newPhotos));
   };

   const deletePhotoHandler = (deletePhoto) => {
      // console.log(deletePhoto);

      const publicIdObj = {
         public_id: deletePhoto.public_id,
      };

      axios
         .post('/api/uploads/delete', publicIdObj)
         .then((res) => {
            dispatch({ type: UPDATE_FILE_REQUEST });

            let fiii = photos.filter((photo) => photo.id !== deletePhoto.id);

            const newPhotos = {
               photos: [...fiii],
               id,
            };

            dispatch(updateFile(newPhotos));
         })
         .catch((err) => {
            dispatch(returnErrors(err.response.data.msg));
            dispatch({ type: UPDATE_FILE_FAIL });
         });
   };

   const openConfirmModalHandler = (photo) => {
      setOpenConfirmModal(true);

      setDeletePhoto(photo);
   };

   const closeConfirmModal = () => {
      setOpenConfirmModal(false);
   };

   return (
      <div className="photofields">
         <div id="head">
            <h5>Photos</h5>
            <h6 onClick={openModalHandler}>
               <i className="fas fa-plus"></i>Add Photos
            </h6>
         </div>
         {photos.length === 0 && (
            <Message msg="You have no photos!" variant="success" box />
         )}
         <div className="photos">
            {photos.map((photo, index) => (
               <Photo
                  key={index}
                  photo={photo}
                  id={id}
                  updatedDescHandler={updatedDescHandler}
                  openConfirmModal={openConfirmModalHandler}
               />
            ))}
         </div>

         {openModal && (
            <UploadModal
               closeModal={closeModalHandler}
               photos={photos}
               id={id}
               userId={userId}
            />
         )}

         {openConfirmModal && (
            <ConfirmDeleteImageModal
               closeConfirmModal={closeConfirmModal}
               photo={deletePhoto}
               deletePhotoHandler={deletePhotoHandler}
            />
         )}
      </div>
   );
};

export default PhotoFields;
