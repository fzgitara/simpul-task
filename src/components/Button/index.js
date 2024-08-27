import React from 'react';

import './styles.css';

const Button = props => {
  const { children, ...rest } = props;
  return (
    <button className='button-primary text-bold-l' {...rest}>
      {children}
    </button>
  );
};

export default Button;