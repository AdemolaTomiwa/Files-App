import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateFile } from '../actions/fileActions';
import ConfirmDeleteImageModal from './ConfirmDeleteImageModal';
import Message from './Message';
import Photo from './Photo';
import UploadModal from './UploadModal';

const PhotoFields = ({ id, photos }) => {
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
      let fiii = photos.filter((photo) => photo.id !== deletePhoto.id);

      const newPhotos = {
         photos: [...fiii],
         id,
      };

      dispatch(updateFile(newPhotos));
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
         <div className="head">
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
