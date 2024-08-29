import React from 'react';

import './styles.css';
import BoxContainer from '../BoxContainer';

const TaskBox = props => {
  const { activated } = props;

  return (
    <BoxContainer customCss={`task-box-${activated ? 'visible' : 'hidden'}`} >
      {/* <span>TASK BOX</span> */}
    </BoxContainer>
  );
};

export default TaskBox;