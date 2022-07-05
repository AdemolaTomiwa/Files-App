import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from './Loader';

const EditImageDescModal = ({ closeModal, photo, updatedDescHandler }) => {
   const [description, setDescription] = useState(photo.description);

   const updateField = useSelector((state) => state.updateFile);
   const { loading, success } = updateField;

   useEffect(() => {
      if (success) {
         closeModal();
      }
   }, [success, closeModal]);

   const submitHandler = (e) => {
      e.preventDefault();

      const desc = {
         id: photo.id,
         description,
         url: photo.url,
      };

      updatedDescHandler(desc);
   };

   return (
      <div className="editimagedescmodal">
         <div className="content">
            <form onSubmit={submitHandler}>
               <div className="box">
                  <div className="img">
                     <img src={photo.url} alt={photo.description} />
                  </div>
                  <div className="input">
                     <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Image description"
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
      </div>
   );
};

export default EditImageDescModal;
