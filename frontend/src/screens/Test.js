import React, { useState } from 'react';

const Test = () => {
   const [inputFields, setinputFields] = useState([{ name: '', age: '' }]);

   const handleChange = (index, e) => {
      let data = [...inputFields];
      data[index][e.target.name] = e.target.value;
      setinputFields(data);
   };

   const addFields = () => {
      let newField = { name: '', age: '' };

      setinputFields([...inputFields, newField]);
   };

   const submit = (e) => {
      e.preventDefault();

      console.log(inputFields);
   };

   const removeField = (index) => {
      let data = [...inputFields];
      data.splice(index, 1);
      setinputFields(data);
   };

   return (
      <>
         <form onSubmit={submit}>
            {inputFields.map((input, index) => {
               return (
                  <div key={index}>
                     <input
                        type="text"
                        name="name"
                        placeholder="name"
                        value={input.name}
                        onChange={(e) => handleChange(index, e)}
                     />
                     <input
                        type="text"
                        name="age"
                        placeholder="age"
                        value={input.age}
                        onChange={(e) => handleChange(index, e)}
                     />
                     <div onClick={() => removeField(index)}>Remove</div>
                  </div>
               );
            })}
            <button>Submit</button>
         </form>
         <div onClick={addFields}>Add fields</div>
      </>
   );
};

export default Test;
