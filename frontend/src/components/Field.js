import React from 'react';

const Field = ({ field }) => {
   return (
      <div className="field">
         {Object.entries(field).map(([key, value]) => (
            <div className="content">
               <div className="details" key={key}>
                  <h5>{key}</h5>
                  <h6>{value}</h6>
               </div>
               <div className="icons">
                  <i className="fas fa-edit"></i>
                  <i className="fas fa-trash"></i>
               </div>
            </div>
         ))}
      </div>
   );
};

export default Field;
