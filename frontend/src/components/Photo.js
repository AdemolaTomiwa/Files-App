import React, { useState } from 'react';
import EditImageDescModal from './EditImageDescModal';
import ImageModal from './ImageModal';

const Photo = ({ photo, url, updatedDescHandler, openConfirmModal }) => {
   const [openEditModal, setOpenEditModal] = useState(false);
   const [openImageModal, setOpenImageModal] = useState(false);

   // console.log(photo);

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
               {photo && (
                  <i
                     onClick={() => openConfirmModal(photo)}
                     className="fas fa-trash"
                  ></i>
               )}
            </div>
            <img
               onClick={openModalHandler}
               src={photo.url ? photo.url : url}
               alt={photo.description}
            />

            {photo && (
               <small>
                  {photo.description}{' '}
                  <i onClick={openEditModalHandler} className="fas fa-edit"></i>
               </small>
            )}
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
               url={url}
               onClose={() => setOpenImageModal(false)}
            />
         )}
      </>
   );
};

export default Photo;
