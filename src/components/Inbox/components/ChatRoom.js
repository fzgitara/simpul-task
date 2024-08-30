import React from 'react';
import Loader from '../../Loader';

import BackIcon from '../../../assets/images/icons/back.svg';
import CloseIcon from '../../../assets/images/icons/close.svg';

import '../styles.css';
import Button from '../../Button';
import Input from '../../Input';

const ChatRoom = props => {
  const {
    loading,
    comments,
    backClick,
    close,
    inputChange,
    inputValue,
    sendClick
  } = props;

  const renderComments = () => {
    return comments.data.toReversed().map((comment, index) => {
      const myChat = comment.user.fullName === 'You';

      return (
        <div
          className={`chat-bubble-container ${myChat && 'my-chat-bubble-container'}`}
          key={index}
        >
          <p className='text-bold-m mb-8'>{comment.user.fullName}</p>
          <div className='chat-bubble'>
            <p className='text-regular-m m-0'>{comment.body}</p>
            <p className='text-regular-m m-0 mt-8'>19:32</p>
          </div>
        </div>
      );
    });
  };

  return loading ? (
    <div className='inbox-loading'>
      <Loader text='Loading Chats ...' />
    </div>
    ) : (
      <div className='chat-room-container'>
        <div className='chat-room-header'>
          <img src={BackIcon} alt='Back Icon' onClick={backClick} className='cursor-pointer' />
          <div>
            <p className='text-bold-l color-primary-blue m-0 mb-4 ml-16'>{comments.title}</p>
            <p className='text-regular-m m-0 ml-16'>{comments.data.length} Participants</p>
          </div>
          <img src={CloseIcon} alt='Close Icon' className='chat-close-icon' onClick={close} />
        </div>
        <div className='chat-room-body'>
          {renderComments()}
        </div>
        <div className='chat-room-footer'>
          <Input
            placeholder='Type a new message'
            customCss='mr-16'
            onChange={inputChange}
            value={inputValue}
            onKeyDown={inputChange}
          />
          <Button variant='primary' onClick={sendClick}>Send</Button>
        </div>
      </div>
    );
};

export default ChatRoom;