import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import QuickButton from './components/QuickButton';

import SearchIcon from './assets/images/icons/search.svg'

function App() {
  const [iconCollapsed, setIconCollapsed] = useState(false);
  const [inboxActivated, setInboxActivated] = useState(false);
  const [taskActivated, setTaskActivated] = useState(false);

  const mainQuickButtonClick = () => {
    setIconCollapsed(!iconCollapsed);
  };

  const inboxClick = () => {
    setTaskActivated(false);
    setIconCollapsed(false);
    inboxActivated ? setInboxActivated(false) : setInboxActivated(true);
  };

  const taskClick = () => {
    setIconCollapsed(false);
    setInboxActivated(false);
    taskActivated ? setTaskActivated(false) : setTaskActivated(true);
  };

  return (
    <div className='App'>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <header>
        <img src={SearchIcon} alt='Search Icon' width={24} className='header-search-icon' />
      </header>

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
        <QuickButton variant='blank' />
        <QuickButton variant='message' onClick={inboxClick} />
      </div>

      <div className={`task-button-container ${taskActivated ? 'task-button-visible' : 'task-button-hidden'}`}>
        <QuickButton
          variant='message-secondary'
          size='small'
          customCss='mr-24'
          onClick={inboxClick}
        />
        <QuickButton variant='blank' />
        <QuickButton variant='book' onClick={taskClick} />
      </div>
    </div>
  );
}

export default App;
