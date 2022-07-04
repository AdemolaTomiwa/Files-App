import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { returnErrors } from '../actions/errorActions';
import { createNewFile } from '../actions/fileActions';
import CreateFileFormField from '../components/CreateFileFormField';
import CreateFileFormOption from '../components/CreateFileFormOption';
import Loader from '../components/Loader';
import Message from '../components/Message';

const CreateFilePage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   // Local States
   const [fileName, setFileName] = useState('Untitled File');
   const [inputFields, setinputFields] = useState([
      { name: 'Untitled Field', answer: 'Sample answer', id: uuidv4() },
   ]);

   // Global States
   const userRegister = useSelector((state) => state.userRegister);
   const { user } = userRegister;

   const userLogin = useSelector((state) => state.userLogin);
   const { loggedUser } = userLogin;

   const createFile = useSelector((state) => state.createFile);
   const { success, loading } = createFile;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      // Check if user is logged in else navigate to login page
      if (!user && !loggedUser) {
         dispatch(returnErrors('Please Login!'));

         navigate('/login');
      }
      // Navigate back to Landing page of file created successfully
      if (success) {
         navigate('/landing');
      }
   }, [navigate, success, user, loggedUser, dispatch]);

   // Handle input change
   const handleChange = (index, e) => {
      let data = [...inputFields];
      data[index][e.target.name] = e.target.value;
      setinputFields(data);
   };

   // Add new input fields
   const addFields = () => {
      let newField = {
         name: 'Untitled Field',
         answer: 'Sample answer',
         id: uuidv4(),
      };

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
      const newFile = {
         fileName,
         fields: inputFields,
         user: user.id,
      };

      // Attempt creating file
      dispatch(createNewFile(newFile));
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
               <button className="btn btn-primary">
                  {loading ? <Loader /> : 'Save'}
               </button>
            </div>
         </form>
      </div>
   );
};

export default CreateFilePage;
