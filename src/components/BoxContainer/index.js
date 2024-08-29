import React from 'react';

import './styles.css';

const BoxContainer = props => {
  const { customCss, children } = props;

  return (
    <div className={`box-container ${customCss}`}>{children}</div>
  )
}

export default BoxContainer;