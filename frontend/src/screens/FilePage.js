import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFile } from '../actions/fileActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Field from '../components/Field';

const FilePage = () => {
   const params = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const userRegister = useSelector((state) => state.userRegister);
   const { user } = userRegister;

   const userLogin = useSelector((state) => state.userLogin);
   const { loggedUser } = userLogin;

   const getUserFile = useSelector((state) => state.getFile);
   const { loading, file, fields } = getUserFile;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      if (!user && !loggedUser) {
         return navigate('/login');
      }

      if (!file || file._id !== params.id) {
         dispatch(getFile(params.id));
      }
   }, [dispatch, navigate, file, loggedUser, user, params]);

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
                  <img
                     src="https://www.biography.com/.image/t_share/MTM2OTI2NTY2Mjg5NTE2MTI5/justin_bieber_2015_photo_courtesy_dfree_shutterstock_348418241_croppedjpg.jpg"
                     alt=""
                  />
                  <div className="details">
                     <h5>{file.fileName}</h5>
                  </div>
               </div>

               {/* Fields */}

               <div className="fields">
                  {fields.map((field, index) => (
                     <Field field={field} key={index} />
                  ))}
               </div>
            </div>
         )}
      </div>
   );
};

export default FilePage;
