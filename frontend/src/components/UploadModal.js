import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import Loader from './Loader';
import Message from './Message';
import { updateFile } from '../actions/fileActions';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const UploadModal = ({ closeModal, id, photos }) => {
   const dispatch = useDispatch();

   const [description, setDescription] = useState('');
   const [loadingUpload, setLoadingUpload] = useState(false);
   const [image, setImage] = useState([]);
   const [public_id, setPublic_id] = useState([]);
   const [existingPhotos, setExistingPhotos] = useState({});
   const [error, setError] = useState('');
   const [previewSource, setPreviewSource] = useState('');

   const updateField = useSelector((state) => state.updateFile);
   const { loading, success } = updateField;

   useEffect(() => {
      if (success) {
         closeModal();
      }

      if (photos) {
         let data = [...photos];

         setExistingPhotos(data);
      }
   }, [success, closeModal, photos]);

   const onDrop = useCallback((acceptedFiles) => {
      acceptedFiles.forEach((file) => {
         const reader = new FileReader();

         reader.readAsDataURL(file);

         reader.onabort = () => console.log('file reading was aborted');
         reader.onerror = () => console.log('file reading has failed');
         reader.onload = () => {
            // Do whatever you want with the file contents
            const binaryStr = reader.result;

            setLoadingUpload(true);
            axios
               .post('/api/uploads', { data: binaryStr })
               .then((res) => {
                  // console.log(res.data);
                  setImage(res.data.url);
                  setPublic_id(res.data.public_id);
                  setLoadingUpload(false);

                  setPreviewSource(binaryStr);

                  setError('');
               })
               .catch((err) => {
                  setLoadingUpload(false);
                  setError(err.response.data.msg);
               });
         };
      });
   }, []);

   const submithandler = (e) => {
      e.preventDefault();

      const imageObj = [{ url: image, public_id, description, id: uuidv4() }];

      const photos = existingPhotos.concat(imageObj);

      const photoObject = {
         photos,
         id,
      };

      dispatch(updateFile(photoObject));
   };

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
   });

   return (
      <div className="uploadmodal">
         <div className="content">
            <div className="head">
               <h4>UPLOAD IMAGE</h4>
               <p>PNG, JPG, JPEG are allowed</p>
            </div>
            <form
               className={isDragActive ? 'modal-active' : 'upload-modal'}
               {...getRootProps()}
            >
               <input {...getInputProps()} />

               {loadingUpload ? (
                  <Loader />
               ) : error ? (
                  <Message msg={error} variant="error" />
               ) : (
                  <small>Drap and drop or browse to choose a file</small>
               )}
            </form>

            <div className="desc">
               <input
                  type="text"
                  placeholder="Photo description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
               />
            </div>

            <div className="preview-file">
               {previewSource && (
                  <div>
                     <img src={previewSource} alt="" />
                     {/* <h6>Image Uploaded!</h6> */}
                  </div>
               )}
            </div>

            <div className="button">
               <button
                  disabled={image.length === 0}
                  onClick={submithandler}
                  className="btn btn-dark"
               >
                  {loading ? <Loader /> : 'Upload Photo'}
               </button>
               <div onClick={closeModal} className="btn btn-danger">
                  Close Modal
               </div>
            </div>
         </div>
      </div>
   );
};

export default UploadModal;
