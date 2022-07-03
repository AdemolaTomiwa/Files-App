import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFileField } from '../actions/fileActions';

const Field = ({ field, file_id }) => {
   const dispatch = useDispatch();

   const deleteFileFieldState = useSelector((state) => state.deleteFileField);
   const { success } = deleteFileFieldState;

   useEffect(() => {
      if (success) {
         return window.location.reload();
      }
   }, [success]);

   const deleteField = () => {
      const fieldId = {
         field: field.id,
      };
      dispatch(deleteFileField(fieldId, file_id));
   };
   return (
      <div className="field">
         <div className="content">
            <div className="details">
               <h5>{field.name}</h5>
               <h6>{field.answer}</h6>
            </div>

            <div className="icons">
               <i className="fas fa-edit"></i>
               <i onClick={deleteField} className="fas fa-trash"></i>
            </div>
         </div>
      </div>
   );
};

export default Field;
