import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, returnErrors } from '../actions/errorActions';
import { getRecentFiles } from '../actions/fileActions';
import FileBox from '../components/FileBox';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';

const LandingPage = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const userRegister = useSelector((state) => state.userRegister);
   const { user } = userRegister;

   const userLogin = useSelector((state) => state.userLogin);
   const { loggedUser } = userLogin;

   const userFiles = useSelector((state) => state.getRecentFiles);
   const { files, loading } = userFiles;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      dispatch(clearErrors());
      if (!user && !loggedUser) {
         dispatch(returnErrors('Please Login!'));

         navigate('/login');
      } else {
         dispatch(getRecentFiles());
      }
   }, [user, loggedUser, navigate, dispatch]);

   return (
      <div className="landing-page">
         <Meta title="Files" />
         <div className="recent-files">
            <div className="head">
               <h4>Recent Files</h4>
            </div>
            {loading ? (
               <Loader />
            ) : msg ? (
               <Message msg={msg} variant="error" />
            ) : files.length === 0 ? (
               <Message msg="You have no files!" variant="success" box />
            ) : (
               <>
                  <div className="file-content">
                     {files.map((file) => (
                        <FileBox key={file._id} file={file} />
                     ))}
                  </div>
               </>
            )}
         </div>
      </div>
   );
};

export default LandingPage;
