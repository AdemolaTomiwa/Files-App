import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteFile } from '../actions/fileActions';
import Loader from './Loader';

const ConfirmDeleteFileModal = ({
   closeConfirmDeleteFileModal,
   id,
   file_id,
}) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const deleteFileState = useSelector((state) => state.deleteFile);
   const { success, loading } = deleteFileState;

   useEffect(() => {
      if (success) {
         closeConfirmDeleteFileModal();
         navigate('/landing');
      }
   }, [success, id, dispatch, file_id, closeConfirmDeleteFileModal, navigate]);

   const deleteFileHandler = () => {
      dispatch(deleteFile(file_id));
   };

   return (
      <div className="confirmmodal">
         <div className="content">
            <div className="head">
               <h4>Are you sure?</h4>
            </div>
            <div className="button">
               <button onClick={deleteFileHandler} className="btn btn-danger">
                  {loading ? <Loader /> : 'Yes'}
               </button>
               <button
                  onClick={closeConfirmDeleteFileModal}
                  className="btn btn-white"
               >
                  No
               </button>
            </div>
         </div>
      </div>
   );
};

export default ConfirmDeleteFileModal;
