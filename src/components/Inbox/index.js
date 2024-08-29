import React, { useEffect, useState } from 'react';
import axios from 'axios';

import BoxContainer from '../BoxContainer';
import Loader from '../Loader';
import SearchBar from '../SearchBar';
import { URL } from './utils';
import { turncate, firstLetter } from '../../utils/stringManipulator';

import ProfileIcon from '../../assets/images/icons/profile.svg';
import ProfileGrayIcon from '../../assets/images/icons/profile-gray.svg';

import './styles.css';

const Inbox = props => {
  const { activated } = props;

  const [showContent, setShowContent] = useState(true);
  const [loading, setLoading] = useState(true);

  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setShowContent(activated);
      activated && getAllPosts();
    }, 300);
  }, [activated]);

  const getAllPosts = async () => {
    setLoading(true);
    const data = await axios.get(URL.POSTS, {
      params: {
        limit: 4
      }
    });

    let updatedData = [...data.data.posts];

    await Promise.all(
      updatedData.map(async (value, index) => {
        const user = await axios.get(URL.USERS + `/${value.id}`);
        const updatedUser = Object.assign({
          firstName: user.data.firstName,
          lastName: user.data.lastName,
          date: user.data.birthDate
        }, {...updatedData[index]});

        updatedData[index] = updatedUser;
      }
    ));

    setLoading(false);
    setPostsData(updatedData);
  };

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
        <div className='front-chat-room'>
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
                {post.firstName} {post.lastName}
              </p>
              <p className='text-regular-m m-0'>{turncate(post.body, 100)}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <BoxContainer customCss={`inbox-${activated ? 'visible' : 'hidden'}`} >
      {showContent && (
        <>
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
        </>
      )}
    </BoxContainer>
  );
};

export default Inbox;