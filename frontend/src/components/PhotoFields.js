import React, { useState } from 'react';
import Message from './Message';
import Photo from './Photo';
import UploadModal from './UploadModal';

const PhotoFields = ({ id, photos }) => {
   const [openModal, setOpenModal] = useState(false);

   const openModalHandler = () => {
      setOpenModal(true);
   };

   const closeModalHandler = () => {
      setOpenModal(false);
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
               <Photo key={index} photo={photo} />
            ))}
         </div>

         {openModal && (
            <UploadModal
               closeModal={closeModalHandler}
               photos={photos}
               id={id}
            />
         )}
      </div>
   );
};

export default PhotoFields;
