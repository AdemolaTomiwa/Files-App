import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
   return (
      <Helmet>
         <title>{title}</title>
         <meta name="description" content={description} />
         <meta name="keyword" content={keywords} />
      </Helmet>
   );
};

Meta.defaultProps = {
   title: 'Files',
   description:
      'We help you keep tracks of all kinds if files and information.',
   keywords: 'files, keeping, tracking, tracking files',
};

export default Meta;
