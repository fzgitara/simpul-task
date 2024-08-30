import React, { useState } from 'react';
import logo from './logo.svg';
import Button from './components/Button';
import QuickButton from './components/QuickButton';
import Inbox from './components/Inbox';

import SearchIcon from './assets/images/icons/search.svg'

import './App.css';
import TaskBox from './components/TaskBox';

function App() {
  const [iconCollapsed, setIconCollapsed] = useState(false);
  const [inboxActivated, setInboxActivated] = useState(false);
  const [taskActivated, setTaskActivated] = useState(false);

  const [inboxContentActivated, setInboxContentActivated] = useState(false);
  const [taskContentActivated, setTaskContentActivated] = useState(false);

  const mainQuickButtonClick = () => {
    setIconCollapsed(!iconCollapsed);
  };

  const inboxClick = () => {
    setTaskActivated(false);
    if (inboxActivated) {
      setIconCollapsed(true);
      setInboxActivated(false);
    } else {
      setIconCollapsed(false);
      setInboxActivated(true);
    }
    setInboxContentActivated(!inboxContentActivated);
  };

  const taskClick = () => {
    setInboxActivated(false);
    if (taskActivated) {
      setIconCollapsed(true);
      setTaskActivated(false);
    } else {
      setIconCollapsed(false);
      setTaskActivated(true);
    }
    setTaskContentActivated(!taskContentActivated);
  };

  const blankClick = () => {
    setInboxActivated(false);
    setTaskActivated(false);
    setIconCollapsed(false);
  };

  return (
    <div className='App'>
      <header>
        <img src={SearchIcon} alt='Search Icon' width={24} className='header-search-icon' />
      </header>

      <div className='content'>
        <div className='content-box-container'>
          <Inbox activated={inboxActivated} close={blankClick} />
          <TaskBox activated={taskActivated} />
        </div>
        <div className={`main-quick-button-container ${inboxActivated || taskActivated ? 'main-quick-button-hidden' : 'main-quick-button-visible'}`}>
          <div className={`secondary-quick-button-container ${iconCollapsed ? 'icon-collapsed' : 'icon-hidden'}`}>
            <QuickButton
              variant='book-secondary'
              text='Task'
              size='small'
              customCss='mr-24'
              onClick={taskClick}
            />
            <QuickButton
              variant='message-secondary'
              text='Inbox'
              size='small'
              customCss='mr-24'
              onClick={inboxClick}
            />
          </div>
          <QuickButton variant='lightning' onClick={mainQuickButtonClick} />
        </div>

        <div className={`inbox-button-container ${inboxActivated ? 'inbox-button-visible' : 'inbox-button-hidden'}`}>
          <QuickButton
            variant='book-secondary'
            size='small'
            customCss='mr-24'
            onClick={taskClick}
          />
          <QuickButton variant='blank' onClick={blankClick} />
          <QuickButton variant='message' onClick={inboxClick} />
        </div>

        <div className={`task-button-container ${taskActivated ? 'task-button-visible' : 'task-button-hidden'}`}>
          <QuickButton
            variant='message-secondary'
            size='small'
            customCss='mr-24'
            onClick={inboxClick}
          />
          <QuickButton variant='blank' onClick={blankClick} />
          <QuickButton variant='book' onClick={taskClick} />
        </div>

      </div>
    </div>
  );
}

export default App;
