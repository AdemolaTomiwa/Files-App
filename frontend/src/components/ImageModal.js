import React from 'react';

const ImageModal = ({ photo, onClose, url }) => {
   return (
      <div className="modal">
         <span className="close" onClick={onClose}>
            &times;
         </span>
         <div className="modal-container">
            <img
               className="modal-content"
               src={photo.url ? photo.url : url}
               alt={photo.description}
            />
            <h6 className="caption">{photo.description}</h6>
         </div>
      </div>
   );
};

export default ImageModal;
