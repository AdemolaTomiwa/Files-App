import React, { useState } from 'react';
import EditImageDescModal from './EditImageDescModal';

const Photo = ({ photo, updatedDescHandler, openConfirmModal }) => {
   const [openEditModal, setOpenEditModal] = useState(false);

   const openEditModalHandler = () => {
      setOpenEditModal(true);
   };

   const closeModal = () => {
      setOpenEditModal(false);
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
            <img src={photo.url} alt={photo.description} />
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
      </>
   );
};

export default Photo;
