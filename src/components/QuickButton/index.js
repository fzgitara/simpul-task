import React from 'react';

import LightningIcon from '../../assets/images/icons/lightning.svg';
import MessageIcon from '../../assets/images/icons/message.svg';
import MessageSecondaryIcon from '../../assets/images/icons/message-secondary.svg';
import BookIcon from '../../assets/images/icons/book.svg'
import BookSecondaryIcon from '../../assets/images/icons/book-secondary.svg'

import './styles.css';

const QuickButton = props => {
  const { variant, text, size, customCss, ...rest } = props;

  const quickButtonVariant = () => {
    switch (variant) {
      case 'lightning':
        return LightningIcon;
      case 'message':
        return MessageIcon;
      case 'message-secondary':
        return MessageSecondaryIcon;
      case 'book':
        return BookIcon;
      case 'book-secondary':
        return BookSecondaryIcon;
      default:
        return;
    }
  };

  return (
    <div className={`quick-button-container ${customCss}`} >
      {text && (
        <span className='text-regular-s mb-16'>{text}</span>
      )}
      <button
        className={
          `quick-button quick-button-${variant}
          quick-button-${size ? 'small' : 'medium'}`
        }
        {...rest}>
        {variant !== 'blank' && (
          <img src={quickButtonVariant()} alt={`Quick Button ${variant}`} />
        )}
      </button>
    </div>
  );
};

export default QuickButton;