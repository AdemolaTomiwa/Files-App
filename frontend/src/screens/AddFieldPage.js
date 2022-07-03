// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { getFile } from '../actions/fileActions';
// import { v4 as uuidv4 } from 'uuid';
// import AddFileFormField from '../components/AddFileFormField';
// import CreateFileFormOption from '../components/CreateFileFormOption';

// const AddFieldPage = () => {
//    const params = useParams();
//    const dispatch = useDispatch();

//    const [fileName, setFileName] = useState('Untitled File');
//    const [inputFields, setinputFields] = useState([
//       { name: 'Untitled Field', answer: 'Sample answer', id: uuidv4() },
//    ]);

//    const getUserFile = useSelector((state) => state.getFile);
//    const { loading, file, fields } = getUserFile;

//    //    console.log(file);

//    useEffect(() => {
//       dispatch(getFile(params.id));

//       if (file) {
//          setFileName(file.fileName);
//       }
//    }, [dispatch, params, file]);

//    // Handle input change
//    const handleChange = (index, e) => {
//       let data = [...inputFields];
//       data[index][e.target.name] = e.target.value;
//       setinputFields(data);
//    };

//    //    Add new input fields
//    const addFields = () => {
//       let file = { name: '', answer: '', id: uuidv4() };

//       setinputFields([...inputFields, newField]);
//    };

//    // Remove input field
//    const removeField = (index) => {
//       let data = [...inputFields];
//       data.splice(index, 1);
//       setinputFields(data);
//    };

//    // Submit form
//    const onSubmit = (e) => {
//       e.preventDefault();

//       // Create new file object
//       //   const newFile = {
//       //      fileName,
//       //      fields: inputFields,
//       //      user: user.id,
//       //   };

//       // // Attempt creating file
//       // dispatch(createNewFile(newFile));
//    };
//    return (
//       <div className="addfield-page">
//          <form onSubmit={onSubmit}>
//             {/* Field Input for the file name */}
//             <div className="head">
//                <input
//                   type="text"
//                   placeholder="File Name"
//                   value={fileName}
//                   onChange={(e) => setFileName(e.target.value)}
//                />
//             </div>

//             {/* Produce a new field box */}
//             {inputFields.map((input, index) => (
//                <AddFileFormField
//                   key={index}
//                   input={input}
//                   handleChange={handleChange}
//                   index={index}
//                   removeField={removeField}
//                />
//             ))}

//             {/* Option button */}
//             <CreateFileFormOption addFields={addFields} />

//             {/* Check for error message and display error */}
//             {/* {msg && <Message msg={msg} variant="error" box />} */}

//             {/* Submit button */}
//             {/* <div>
//                <button className="btn btn-primary">
//                   {loading ? <Loader /> : 'Save'}
//                </button>
//             </div> */}
//          </form>
//       </div>
//    );
// };

// export default AddFieldPage;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { returnErrors } from '../actions/errorActions';
import { updateFile, getFile } from '../actions/fileActions';
import CreateFileFormField from '../components/CreateFileFormField';
import CreateFileFormOption from '../components/CreateFileFormOption';
import Loader from '../components/Loader';
import Message from '../components/Message';

const AddFieldPage = () => {
   const params = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const getUserFile = useSelector((state) => state.getFile);
   const { loading, file, fields } = getUserFile;

   // Local States
   const [fileName, setFileName] = useState(
      file ? file.fileName : 'Untitled File'
   );
   const [inputFields, setinputFields] = useState([
      { name: 'Untitled Field', answer: 'Sample answer', id: uuidv4() },
   ]);
   const [existingFields, setExistingFields] = useState({});

   // Global States
   const userRegister = useSelector((state) => state.userRegister);
   const { user } = userRegister;

   const userLogin = useSelector((state) => state.userLogin);
   const { loggedUser } = userLogin;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      // Check if user is logged in else navigate to login page
      if (!user && !loggedUser) {
         dispatch(returnErrors('Please Login!'));

         navigate('/login');
      }

      dispatch(getFile(params.id));

      if (file) {
         //  setFileName(file.fileName);

         let data = [...fields];

         setExistingFields(data);
      }

      // Navigate back to Landing page of file created successfully
      //   if (success) {
      //      navigate('/landing');
      //   }
   }, [navigate, file, user, fields, loggedUser, dispatch, params]);

   // Handle input change
   const handleChange = (index, e) => {
      let data = [...inputFields];
      data[index][e.target.name] = e.target.value;
      setinputFields(data);
   };

   // Add new input fields
   const addFields = () => {
      let newField = { name: '', answer: '', id: uuidv4() };

      setinputFields([...inputFields, newField]);
   };

   // Remove input field
   const removeField = (index) => {
      let data = [...inputFields];
      data.splice(index, 1);
      setinputFields(data);
   };

   // Submit form
   const onSubmit = (e) => {
      e.preventDefault();

      // Create new file object
      const updatedfile = {
         fileName,
         fields: inputFields,
         existingFields,
         user: user.id,
         id: params.id,
      };

      // Attempt Updating file
      dispatch(updateFile(updatedfile));
   };

   return (
      <div className="createfile-page">
         <form onSubmit={onSubmit}>
            {/* Field Input for the file name */}
            <div className="head">
               <input
                  type="text"
                  placeholder="File Name"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
               />
            </div>

            {/* Produce a new field box */}
            {inputFields.map((input, index) => (
               <CreateFileFormField
                  key={index}
                  input={input}
                  handleChange={handleChange}
                  index={index}
                  removeField={removeField}
               />
            ))}

            {/* Option button */}
            <CreateFileFormOption addFields={addFields} />

            {/* Check for error message and display error */}
            {msg && <Message msg={msg} variant="error" box />}

            {/* Submit button */}
            <div>
               {/* <button className="btn btn-primary">
                  {loading ? <Loader /> : 'Save'}
               </button> */}
               <button className="btn btn-primary">Update</button>
            </div>
         </form>
      </div>
   );
};

export default AddFieldPage;
