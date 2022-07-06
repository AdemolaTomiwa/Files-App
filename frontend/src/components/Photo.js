import React, { useState } from 'react';
import EditImageDescModal from './EditImageDescModal';
import ImageModal from './ImageModal';

const Photo = ({ photo, updatedDescHandler, openConfirmModal }) => {
   const [openEditModal, setOpenEditModal] = useState(false);
   const [openImageModal, setOpenImageModal] = useState(false);

   const openEditModalHandler = () => {
      setOpenEditModal(true);
   };

   const closeModal = () => {
      setOpenEditModal(false);
   };

   const openModalHandler = () => {
      setOpenImageModal(true);
   };

   return (
      <>
         <div className="photo">
            <div className="head">
               <i className="far fa-star"></i>
               <i
                  onClick={() => openConfirmModal(photo)}
                  className="fas fa-trash"
               ></i>
            </div>
            <img
               onClick={openModalHandler}
               src={photo.url}
               alt={photo.description}
            />
            <small>
               {photo.description}{' '}
               <i onClick={openEditModalHandler} className="fas fa-edit"></i>
            </small>
         </div>

         {openEditModal && (
            <EditImageDescModal
               closeModal={closeModal}
               photo={photo}
               updatedDescHandler={updatedDescHandler}
            />
         )}

         {openImageModal && (
            <ImageModal
               photo={photo}
               src="https://source.unsplash.com/NQSWvyVRIJk/800x599"
               alt="snow"
               caption="caption"
               onClose={() => setOpenImageModal(false)}
            />
         )}
      </>
   );
};

export default Photo;
