import React from 'react';
import { Link } from 'react-router-dom';

const FileBox = ({ file }) => {
   return (
      <Link to={`/files/${file._id}`}>
         <div className="file">
            {/* <div className="head">
               <i className="fas fa-ellipsis-v"></i>
            </div> */}
            <div className="body">
               <div className="icon">
                  <i className="fas fa-user-circle"></i>
               </div>
               <h5>{file.fileName}</h5>
            </div>
         </div>
      </Link>
   );
};

export default FileBox;
