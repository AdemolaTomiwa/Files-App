import React from 'react';

const CreateFileFormField = ({ input, handleChange, index, removeField }) => {
   return (
      <div className="box">
         <div className="main">
            <input
               type="text"
               name="name"
               value={input.name}
               autoComplete="off"
               onChange={(e) => handleChange(index, e)}
               placeholder="Untitled Field e.g email address"
            />
         </div>
         <div className="answer">
            <input
               type="text"
               name="answer"
               autoComplete="off"
               value={input.answer}
               onChange={(e) => handleChange(index, e)}
               placeholder="Short answer e.g justin@gmail.com"
            />
         </div>
         <div className="icon">
            <i className="fas fa-trash" onClick={() => removeField(index)}></i>
         </div>
      </div>
   );
};

export default CreateFileFormField;
