import React from 'react';

const Field = ({ field }) => {
   return (
      <div className="field">
         <div className="content">
            <div className="details">
               <h5>{field.name}</h5>
               <h6>{field.answer}</h6>
            </div>
            <div className="icons">
               <i className="fas fa-edit"></i>
               <i className="fas fa-trash"></i>
            </div>
         </div>
      </div>
   );
};

export default Field;
