import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-date-picker';

import BoxContainer from '../BoxContainer';
import Dropdown from '../Dropdown';
import Loader from '../Loader';
import Button from '../Button';
import { URL } from './utils';

import PencilIcon from '../../assets/images/icons/pencil.svg';
import ClockIcon from '../../assets/images/icons/clock.svg';
import CalendarIcon from '../../assets/images/icons/calendar.svg';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import './styles.css';

const TaskBox = props => {
  const { activated } = props;

  const [showContent, setShowContent] = useState(true);
  const [loading, setLoading] = useState(false);

  const [todos, setTodos] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setTimeout(() => {
      setShowContent(activated);
      activated && getAllTodos();
    }, 300);
  }, [activated]);

  const dropdownOptions = [
    { value: 'personal', label: 'Personal Errands' },
    { value: 'urgent', label: 'Urgent To-Do' }
  ];

  const getAllTodos = async () => {
    setLoading(true);
    const data = await axios.get(URL.TODOS, {
      params: {
        limit: 4
      }
    })
    setTodos(data.data);
    setLoading(false);
  };

  const renderTask = () => {
    return todos.todos?.map((todo, index) => {
      return (
        <div key={index} className='todo-container'>
          <div className='todo-header'>
            <div>
              <input className='todo-check' type='checkbox' value='' id='flexCheckDefault' />
              <label className='text-bold-m color-primary-dark-gray cursor-pointer' for='flexCheckDefault'>
                {todo.todo}
              </label>
            </div>
            <div className='todo-date-container'>
              <span className='text-regular-m color-primary-red mr-24'>{todo.id} Days Left</span>
              <span className='text-regular-m color-primary-dark-gray'>12/06/2021</span>
            </div>
          </div>
          <div>
            <div className='d-flex mt-16'>
              <img src={ClockIcon} alt='Clock Icon' className='task-clock-icon' />
              <div className='todo-date-picker'>
                <DatePicker
                  onChange={setDate}
                  value={date}
                  calendarIcon={<img src={CalendarIcon} alt='Calendar Icon' className='task-calendar-icon' />}
                  clearIcon={null}
                  format='dd/MM/yyy'
                />
              </div>
            </div>
            <div className='d-flex mt-16'>
              <img src={PencilIcon} alt='Pencil Icon' className='task-pencil-icon' />
              <p className='text-regular-m'>
                Closing off this case since this application has been cancelled. No one really understand how this case could possibly be cancelled. The options and the documents within this document were totally a guaranteed for a success!
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <BoxContainer customCss={`task-box-${activated ? 'visible' : 'hidden'}`} >
      {showContent && (
        <>
          <div className='d-flex justify-content-between'>
            <Dropdown placeholder='My Tasks' options={dropdownOptions} />
            <Button variant='primary'>New Task</Button>
          </div>
          {loading ? (
            <div className='task-box-loading'>
              <Loader text='Loading Tasks List ...' />
            </div> 
          ) : (
            <div className='task-container'>
              {renderTask()}
            </div>
          )}
        </>
      )}
    </BoxContainer>
  );
};

export default TaskBox;