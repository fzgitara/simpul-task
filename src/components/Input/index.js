import React from 'react';

import './styles.css';

const Input = props => {
  const { placeholder, customCss, ...rest } = props;
  return (
    <input className={`input ${customCss}`} placeholder={placeholder} {...rest} />
  );
};

export default Input;