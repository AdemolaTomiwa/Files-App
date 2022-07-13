import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
   const [keyword, setKeyword] = useState('');

   const navigate = useNavigate();

   const onSubmit = (e) => {
      e.preventDefault();

      if (keyword.trim()) {
         navigate(`/search/${keyword}`);
      } else {
         navigate('/search');
      }
   };

   return (
      <div className="searchbox">
         <form onSubmit={onSubmit}>
            <div>
               <input
                  type="text"
                  name="keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Search for Files..."
               />
               <i onClick={onSubmit} className="fas fa-search"></i>
            </div>
         </form>
      </div>
   );
};

export default SearchBox;
