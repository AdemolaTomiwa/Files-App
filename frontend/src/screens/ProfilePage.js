import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, returnErrors } from '../actions/errorActions';
import { getFiles } from '../actions/fileActions';
import { getUserDetails } from '../actions/userActions';
import EditUserNameModal from '../components/EditUserNameModal';
import FileBox from '../components/FileBox';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';

const ProfilePage = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [openUserNameModal, setOpenUserNameModal] = useState(false);

   const userRegister = useSelector((state) => state.userRegister);
   const { user } = userRegister;

   const userLogin = useSelector((state) => state.userLogin);
   const { loggedUser } = userLogin;

   const userDetailsState = useSelector((state) => state.userDetails);
   const { loading, details } = userDetailsState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   const userFiles = useSelector((state) => state.getFiles);
   const { files } = userFiles;

   useEffect(() => {
      dispatch(clearErrors());
      if (!user && !loggedUser) {
         dispatch(returnErrors('Please Login!'));

         navigate('/login');
      } else {
         dispatch(getUserDetails(user.id));
         dispatch(getFiles());
      }
   }, [user, loggedUser, navigate, dispatch]);

   return (
      <div className="profilepage">
         <Meta title="Files | Profile" />
         {loading ? (
            <Loader />
         ) : msg ? (
            <Message msg={msg} variant="error" box />
         ) : (
            <div className="file">
               <div className="head">
                  <h4>
                     {details.firstName} {details.lastName}
                  </h4>
               </div>
               <div className="showcase">
                  <div className="icon">
                     <i className="fas fa-user-circle"></i>
                  </div>
                  <div className="details">
                     <div className="details-content">
                        <h5>
                           {details.firstName} {details.lastName}
                        </h5>{' '}
                        <small>{details.email}</small>
                     </div>
                     <span>
                        <i
                           className="fas fa-edit"
                           onClick={() => setOpenUserNameModal(true)}
                        ></i>
                     </span>
                  </div>
               </div>

               {openUserNameModal && (
                  <EditUserNameModal
                     closeUserNameModal={() => setOpenUserNameModal(false)}
                     userFirstName={details.firstName}
                     userLastName={details.lastName}
                     id={details._id}
                  />
               )}

               <div className="files">
                  {files && (
                     <>
                        <h4>All Files</h4>
                        <div className="file-content">
                           {files.map((file) => (
                              <FileBox key={file._id} file={file} />
                           ))}
                        </div>
                     </>
                  )}
               </div>
            </div>
         )}
      </div>
   );
};

export default ProfilePage;
