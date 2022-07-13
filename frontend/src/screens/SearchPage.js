import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, returnErrors } from '../actions/errorActions';
import { getFiles } from '../actions/fileActions';
import FileBox from '../components/FileBox';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import SearchBox from '../components/SearchBox';

const SearchPage = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const params = useParams();

   const userRegister = useSelector((state) => state.userRegister);
   const { user } = userRegister;

   const userLogin = useSelector((state) => state.userLogin);
   const { loggedUser } = userLogin;

   const userFiles = useSelector((state) => state.getFiles);
   const { files, loading } = userFiles;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      dispatch(clearErrors());
      if (!user && !loggedUser) {
         dispatch(returnErrors('Please Login!'));

         navigate('/login');
      } else {
         dispatch(getFiles(params.keyword));
      }
   }, [user, loggedUser, navigate, dispatch, params]);

   return (
      <div className="searchpage">
         <Meta title="Files | Search" />

         <SearchBox />

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
   );
};

export default SearchPage;
