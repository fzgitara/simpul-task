import React from 'react';

import './styles.css';

const Loader = props => {
  const { text } = props;

  return (
    <div className='loader-container'>
      <div className='loader' />
      <p className='text-bold-m'>{text}</p>
    </div>
  );
};

export default Loader;