import React from 'react';

const Photo = ({ photo }) => {
   return (
      <div className="photo">
         <img src={photo.url} alt={photo.description} />
         <small>{photo.description}</small>
      </div>
   );
};

export default Photo;
