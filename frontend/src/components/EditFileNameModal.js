import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFile } from '../actions/fileActions';
import Loader from './Loader';

const EditFileNameModal = ({ closeFileNameModal, fileName, id }) => {
   const dispatch = useDispatch();

   const [name, setName] = useState(fileName);

   const updateField = useSelector((state) => state.updateFile);
   const { loading, success } = updateField;

   useEffect(() => {
      if (success) {
         closeFileNameModal();
      }
   }, [success, closeFileNameModal]);

   const updateForm = (e) => {
      e.preventDefault();

      const fileNewName = {
         fileName: name,
         id,
      };

      dispatch(updateFile(fileNewName));
   };

   return (
      <div className="editfilenamemodal">
         <form onSubmit={updateForm}>
            <div className="box">
               <div className="main">
                  <input
                     type="text"
                     name="name"
                     value={name}
                     autoComplete="off"
                     onChange={(e) => setName(e.target.value)}
                     placeholder="Untitled Field e.g email address"
                  />
               </div>
               <div className="button">
                  <button type="submit" className="btn btn-dark">
                     {loading ? <Loader /> : 'Update'}
                  </button>
                  <div onClick={closeFileNameModal} className="btn btn-danger">
                     Close Modal
                  </div>
               </div>
            </div>
         </form>
      </div>
   );
};

export default EditFileNameModal;
