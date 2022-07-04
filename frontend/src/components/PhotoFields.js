import React, { useState } from 'react';
import UploadModal from './UploadModal';

const PhotoFields = () => {
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
         <div className="photos">
            <div className="photo">
               <img
                  src="https://www.biography.com/.image/t_share/MTM2OTI2NTY2Mjg5NTE2MTI5/justin_bieber_2015_photo_courtesy_dfree_shutterstock_348418241_croppedjpg.jpg"
                  alt=""
               />
               <small>Justin Bieber's Brother</small>
            </div>
            <div className="photo">
               <img
                  src="https://www.biography.com/.image/t_share/MTM2OTI2NTY2Mjg5NTE2MTI5/justin_bieber_2015_photo_courtesy_dfree_shutterstock_348418241_croppedjpg.jpg"
                  alt=""
               />
               <small>Justin Bieber's Brother</small>
            </div>
            <div className="photo">
               <img
                  src="https://www.biography.com/.image/t_share/MTM2OTI2NTY2Mjg5NTE2MTI5/justin_bieber_2015_photo_courtesy_dfree_shutterstock_348418241_croppedjpg.jpg"
                  alt=""
               />
               <small>Justin Bieber's Brother</small>
            </div>
            <div className="photo">
               <img
                  src="https://www.biography.com/.image/t_share/MTM2OTI2NTY2Mjg5NTE2MTI5/justin_bieber_2015_photo_courtesy_dfree_shutterstock_348418241_croppedjpg.jpg"
                  alt=""
               />
               <small>Justin Bieber's Brother</small>
            </div>
            <div className="photo">
               <img
                  src="https://www.biography.com/.image/t_share/MTM2OTI2NTY2Mjg5NTE2MTI5/justin_bieber_2015_photo_courtesy_dfree_shutterstock_348418241_croppedjpg.jpg"
                  alt=""
               />
               <small>Justin Bieber's Brother</small>
            </div>
         </div>

         {openModal && <UploadModal closeModal={closeModalHandler} />}
      </div>
   );
};

export default PhotoFields;
