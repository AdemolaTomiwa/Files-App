import React, { useEffect } from 'react';

const ImageModal = ({ photo, onClose, url }) => {
   useEffect(() => {
      const keyDownHandler = (event) => {
         if (event.key === 'Escape') {
            event.preventDefault();

            // 👇️ your logic here
            onClose();
         }
      };

      document.addEventListener('keydown', keyDownHandler);

      // 👇️ clean up event listener
      return () => {
         document.removeEventListener('keydown', keyDownHandler);
      };
   }, [onClose]);

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
