import React from 'react';

import SearchIcon from '../../assets/images/icons/search-gray.svg';

import './styles.css';

const SearchBar = () => {
  return (
    <div className='search-bar'>
      <span className='text-regular-s'>Search</span>
      <img src={SearchIcon} alt='Search Icon' />
    </div>
  );
};

export default SearchBar;