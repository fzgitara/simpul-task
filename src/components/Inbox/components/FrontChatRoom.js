import React from 'react';
import SearchBar from '../../SearchBar';
import Loader from '../../Loader';
import { turncate, firstLetter } from '../../../utils/stringManipulator';

import ProfileIcon from '../../../assets/images/icons/profile.svg';
import ProfileGrayIcon from '../../../assets/images/icons/profile-gray.svg';

import '../styles.css';

const FrontChatRoom = props => {
  const { postsData, loading, onClick } = props;

  const renderProfilePictureIcon = () => {
    return (
      <div className='d-flex'>
        <div className='profile-picture-gray'>
          <img src={ProfileGrayIcon} alt='Profile Icon' width={18} />
        </div>
        <div className='profile-picture'>
          <img src={ProfileIcon} alt='Profile Icon' width={18} />
        </div>
      </div>
    );
  };

  const renderFrontChatRoom = () => {
    return postsData?.map((post, index) => {
      return (
        <div className='front-chat-room' onClick={() => onClick(post)} key={`front-chat-room-${index}`}>
          <div className='d-flex'>
            <div className='profile-picture-container'>
              {
                index === postsData.length-1 ?
                  <div className='profile-picture m-auto'>
                    {firstLetter(post.firstName)}
                  </div> :
                  renderProfilePictureIcon()
              }
            </div>
            <div>
              <div className='d-flex'>
                <p className='text-bold-l color-primary-blue m-0 mb-4 mr-24'>{post.title}</p>
                <p className='text-regular-m m-0'>{post.date}</p>
              </div>
              <p className='text-bold-m color-primary-dark-gray m-0'>
                {post.firstName} {post.lastName} :
              </p>
              <p className='text-regular-m m-0'>{turncate(post.body, 90)}</p>
            </div>
            {index === 0 && (
              <div className='dot-notification' />
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div className='front-chat-room-container'>
      <SearchBar />
      {loading ? (
        <div className='inbox-loading'>
          <Loader text='Loading Chats ...' />
        </div>
      ) : (
        <div className='inbox-content'>
          {renderFrontChatRoom()}
        </div>
      )}
    </div>
  );
};

export default FrontChatRoom;