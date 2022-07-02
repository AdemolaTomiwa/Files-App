import React from 'react';

const CreateFileFormOption = ({ addFields }) => {
   return (
      <div className="file-option">
         <i className="fas fa-plus" onClick={addFields}></i>
         <i className="fas fa-image"></i>
      </div>
   );
};

export default CreateFileFormOption;
