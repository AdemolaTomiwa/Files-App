import React from 'react';
import { Link } from 'react-router-dom';

const LandingFile = ({ file }) => {
   return (
      <Link to={`/files/${file._id}`}>
         <div className="file">
            <div className="head">
               <i className="far fa-star"></i>
               <i className="fas fa-ellipsis-v"></i>
            </div>
            <div className="body">
               <div className="icon">
                  <i className="fas fa-user-circle"></i>
               </div>
               {/* <img
               src="https://www.biography.com/.image/t_share/MTM2OTI2NTY2Mjg5NTE2MTI5/justin_bieber_2015_photo_courtesy_dfree_shutterstock_348418241_croppedjpg.jpg"
               alt=""
            /> */}
               <h5>{file.fileName}</h5>
            </div>
         </div>
      </Link>
   );
};

export default LandingFile;
