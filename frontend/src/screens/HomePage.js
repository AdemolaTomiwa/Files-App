import React, { useEffect, useState } from 'react';

const HomePage = () => {
   const [show, setShow] = useState(false);
   useEffect(() => {
      const interval = setInterval(() => {
         setShow(!show);
      }, 3000);
      return () => {
         clearInterval(interval);
      };
   }, [show]);

   return (
      <div className="homepage">
         <div className="content">
            <h1>Files</h1>
            <h4>あらゆる種類のファイルを追跡します</h4>
            <h5 className={show ? 'show' : ''}>
               (We keep track of all kinds of files)
            </h5>
         </div>
      </div>
   );
};

export default HomePage;
