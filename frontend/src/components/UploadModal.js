import React from 'react';

const UploadModal = ({ closeModal }) => {
   return (
      <div className="uploadmodal">
         <div className="content">
            <div className="head">
               <h4>UPLOAD IMAGE(S)</h4>
               <p>PNG, JPG, JPEG are allowed</p>
            </div>
            <div className="modal">
               <h6>Drap and drop or browse to choose a file</h6>
            </div>
            <div className="button">
               <button type="submit" className="btn btn-dark">
                  Upload Photos
               </button>
               <div onClick={closeModal} className="btn btn-danger">
                  Close Modal
               </div>
            </div>
         </div>
      </div>
   );
};

export default UploadModal;
