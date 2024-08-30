import React, { useEffect, useState } from 'react';
import axios from 'axios';

import BoxContainer from '../BoxContainer';
import { URL } from './utils';

import './styles.css';
import FrontChatRoom from './components/FrontChatRoom';
import ChatRoom from './components/ChatRoom';

const Inbox = props => {
  const { activated, close } = props;

  const [showContent, setShowContent] = useState(true);
  const [loading, setLoading] = useState(true);
  const [insideChatRoom, setInsideChatRoom] = useState(false);

  const [postsData, setPostsData] = useState([]);
  const [comments, setComments] = useState([]);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setShowContent(activated);
      activated && !insideChatRoom && getAllPosts();
    }, 300);
  }, [activated, insideChatRoom]);

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

  const frontChatClick = async post => {
    setInsideChatRoom(true);
    setLoading(true);
    const data = await axios.get(URL.COMMENTS(post.id));

    let updatedData = {
      title: post.title,
      data: [...data.data.comments]
    };
    updatedData.data.unshift({
      body: post.body,
      user: {
        fullName: `${post.firstName} ${post.lastName}`
      }
    });

    setComments(updatedData);
    setLoading(false);
  };

  const backClick = () => {
    setInsideChatRoom(false);
    setLoading(true);
  };

  const inputChange = e => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      sendClick();
    } else {
      setChatInput(e.target.value);
    }
  };

  const sendClick = () => {
    let updatedData = {...comments};
    updatedData.data.unshift({
      user: {
        fullName: 'You'
      },
      body: chatInput
    });
    setChatInput('');
    setComments(updatedData);
  };

  return (
    <BoxContainer customCss={`inbox-${activated ? 'visible' : 'hidden'}`} >
      {showContent && (
        insideChatRoom ?
          <ChatRoom
            comments={comments}
            loading={loading}
            backClick={backClick}
            close={close}
            inputChange={inputChange}
            inputValue={chatInput}
            sendClick={sendClick}
          /> :
          <FrontChatRoom
            loading={loading}
            postsData={postsData}
            onClick={frontChatClick}
          />
      )}
    </BoxContainer>
  );
};

export default Inbox;