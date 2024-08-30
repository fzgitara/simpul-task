import React from 'react';

import ChevronDownIcon from '../../assets/images/icons/chevron-down.svg';

import './styles.css';

const Dropdown = props => {
  const { placeholder, options } = props;

  return (
    <div class='dropdown'>
      <button class='btn btn-secondary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
        <div className='d-flex'>
          <span className='text-bold-m color-primary-dark-gray'>{placeholder}</span>
          <img src={ChevronDownIcon} alt='Chevron Down Icon' />
        </div>
      </button>
      <ul class='dropdown-menu'>
        {options.map((option, index) => {
          return <li>{option.label}</li>
        })}
      </ul>
    </div>
  );
};

export default Dropdown;