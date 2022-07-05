import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loader from './Loader';

const ConfirmDeleteImageModal = ({
   closeConfirmModal,
   photo,
   deletePhotoHandler,
}) => {
   const updateField = useSelector((state) => state.updateFile);
   const { loading, success } = updateField;

   useEffect(() => {
      if (success) {
         closeConfirmModal();
      }
   }, [success, closeConfirmModal]);

   return (
      <div className="confirmmodal">
         <div className="content">
            <div className="header">
               <h4>Are you sure?</h4>
            </div>
            <div className="button">
               <button
                  onClick={() => deletePhotoHandler(photo)}
                  className="btn btn-danger"
               >
                  {loading ? <Loader /> : 'Yes'}
               </button>
               <button onClick={closeConfirmModal} className="btn btn-white">
                  No
               </button>
            </div>
         </div>
      </div>
   );
};

export default ConfirmDeleteImageModal;
