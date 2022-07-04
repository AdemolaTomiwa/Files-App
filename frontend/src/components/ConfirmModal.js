import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFileField } from '../actions/fileActions';
import Loader from './Loader';

const ConfirmModal = ({ closeConfirmModal, id, file_id }) => {
   const dispatch = useDispatch();

   const deleteFileFieldState = useSelector((state) => state.deleteFileField);
   const { success, loading } = deleteFileFieldState;

   useEffect(() => {
      if (success) {
         closeConfirmModal();
      }
   }, [success, id, dispatch, file_id, closeConfirmModal]);

   const deleteField = () => {
      const fieldId = {
         field: id,
      };
      dispatch(deleteFileField(fieldId, file_id));
   };

   return (
      <div className="confirmmodal">
         <div className="content">
            <div className="head">
               <h4>Are you sure?</h4>
            </div>
            <div className="button">
               <button onClick={deleteField} className="btn btn-danger">
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

export default ConfirmModal;
