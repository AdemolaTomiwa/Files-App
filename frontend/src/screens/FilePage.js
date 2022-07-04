import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFile, updateField } from '../actions/fileActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Field from '../components/Field';
import EditFieldModal from '../components/EditFieldModal';
import ConfirmModal from '../components/ConfirmModal';
import ConfirmDeleteFileModal from '../components/ConfirmDeleteFileModal';
import EditFileNameModal from '../components/EditFileNameModal';
import PhotoFields from '../components/PhotoFields';

const FilePage = () => {
   const params = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [openModal, setOpenModal] = useState(false);
   const [openFileNameModal, setOpenFileNameModal] = useState(false);
   const [openConfirmModalState, setOpenConfirmModalState] = useState(false);
   const [openConfirmDeleteFileModalState, setOpenConfirmDeleteFileModalState] =
      useState(false);
   const [modalField, setModalField] = useState({});
   const [deleteId, setDeleteId] = useState('');

   const userRegister = useSelector((state) => state.userRegister);
   const { user } = userRegister;

   const userLogin = useSelector((state) => state.userLogin);
   const { loggedUser } = userLogin;

   const getUserFile = useSelector((state) => state.getFile);
   const { loading, file, fields } = getUserFile;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   const deleteFileState = useSelector((state) => state.deleteFile);
   const { success } = deleteFileState;

   useEffect(() => {
      if (!user && !loggedUser) {
         return navigate('/login');
      }

      if (!file || file._id !== params.id) {
         dispatch(getFile(params.id));
      }

      if (success) {
         return navigate('/landing');
      }
   }, [dispatch, navigate, file, loggedUser, user, params, success]);

   const openModalHandler = (field) => {
      setOpenModal(true);

      setModalField(field);
   };

   const closeModal = () => {
      setOpenModal(false);
   };

   const openConfirmModalHandler = (field) => {
      setOpenConfirmModalState(true);

      setDeleteId(field.id);
   };

   const closeConfirmModal = () => {
      setOpenConfirmModalState(false);
   };

   const openConfirmDeleteFileModalHandler = (field) => {
      setOpenConfirmDeleteFileModalState(true);

      setDeleteId(field.id);
   };

   const closeConfirmDeleteFileModal = () => {
      setOpenConfirmDeleteFileModalState(false);
   };

   const openFileNameModalHandler = () => {
      setOpenFileNameModal(true);
   };

   const closeFileNameModal = () => {
      setOpenFileNameModal(false);
   };

   const updatedFieldHandler = (fieldObject) => {
      let fiii = fields.filter((field) => field.id !== fieldObject.id);

      const newFields = {
         fields: [...fiii, fieldObject],
         user: user.id,
         id: params.id,
      };

      dispatch(updateField(newFields));
   };

   return (
      <div className="file-page">
         {loading ? (
            <Loader />
         ) : msg ? (
            <Message msg={msg} variant="error" box />
         ) : (
            <div className="file">
               <div className="head">
                  <h4>{file.fileName}</h4>
               </div>
               <div className="showcase">
                  <div className="icon">
                     <i className="fas fa-user-circle"></i>
                  </div>
                  <div className="details">
                     <h5>{file.fileName}</h5>{' '}
                     <span>
                        <i
                           onClick={openFileNameModalHandler}
                           className="fas fa-edit"
                        ></i>
                     </span>
                  </div>
               </div>

               {openFileNameModal && (
                  <EditFileNameModal
                     closeFileNameModal={closeFileNameModal}
                     fileName={file.fileName}
                     id={file._id}
                  />
               )}

               {/* Fields */}
               <div className="fields">
                  {fields.map((field, index) => (
                     <Field
                        field={field}
                        file_id={file._id}
                        key={index}
                        openModal={() => openModalHandler(field)}
                        openConfirmModal={() => openConfirmModalHandler(field)}
                     />
                  ))}
               </div>

               {/* If modal is open, show edit form */}
               {openModal && (
                  <EditFieldModal
                     closeModal={closeModal}
                     modalField={modalField}
                     updatedFieldHandler={updatedFieldHandler}
                  />
               )}

               {/* Confirm before deleting  */}
               {openConfirmModalState && (
                  <ConfirmModal
                     closeConfirmModal={closeConfirmModal}
                     id={deleteId}
                     file_id={file._id}
                  />
               )}

               {/* Phot Fields */}
               <PhotoFields />

               {/* Button */}
               <div className="button">
                  <button className="btn btn-primary">
                     <Link to={`/addfield/${file._id}`}>
                        <i className="fas fa-edit"></i> Add Information Field
                     </Link>
                  </button>
                  <button
                     onClick={openConfirmDeleteFileModalHandler}
                     className="btn btn-primary delete"
                  >
                     <Link to="">
                        <i className="fas fa-trash"></i> Delete {file.fileName}
                     </Link>
                  </button>
               </div>

               {/* Confirm before deleting  */}
               {openConfirmDeleteFileModalState && (
                  <ConfirmDeleteFileModal
                     closeConfirmDeleteFileModal={closeConfirmDeleteFileModal}
                     id={deleteId}
                     file_id={file._id}
                  />
               )}
            </div>
         )}
      </div>
   );
};

export default FilePage;
