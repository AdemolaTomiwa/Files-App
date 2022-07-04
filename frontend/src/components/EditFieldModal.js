import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from './Loader';
const EditFieldModal = ({ closeModal, modalField, updatedFieldHandler }) => {
   const [name, setName] = useState(modalField.name);
   const [answer, setAnswer] = useState(modalField.answer);

   const updateField = useSelector((state) => state.updateField);
   const { loading, success } = updateField;

   useEffect(() => {
      if (success) {
         closeModal();
      }
   }, [success, closeModal]);

   const updateForm = (e) => {
      e.preventDefault();

      const field = {
         name,
         answer,
         id: modalField.id,
      };

      updatedFieldHandler(field);
   };

   return (
      <div className="editfieldmodal">
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
               <div className="answer">
                  <input
                     type="text"
                     name="answer"
                     autoComplete="off"
                     value={answer}
                     onChange={(e) => setAnswer(e.target.value)}
                     placeholder="Short answer e.g justin@gmail.com"
                  />
               </div>
               <div className="button">
                  <button type="submit" className="btn btn-dark">
                     {loading ? <Loader /> : 'Update'}
                  </button>
                  <div onClick={closeModal} className="btn btn-danger">
                     Close Modal
                  </div>
               </div>
            </div>
         </form>
      </div>
   );
};

export default EditFieldModal;
