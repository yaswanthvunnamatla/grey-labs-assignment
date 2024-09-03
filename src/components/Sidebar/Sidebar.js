import React, { useState, useEffect } from 'react';
import { useEventContext } from '../../context/EventContext';
import './Sidebar.css';
import moment from 'moment';

const Sidebar = () => {
  const { showOffcanvas, setShowOffcanvas, selectedEvent, handleAddEvent, handleEditEvent, handleDeleteEvent } = useEventContext(); // Use context
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title || '');
      setDate(moment(selectedEvent.start).format('YYYY-MM-DD') || '');
      setStartTime(selectedEvent.start ? moment(selectedEvent.start).format('HH:mm') : '');
      setEndTime(selectedEvent.end ? moment(selectedEvent.end).format('HH:mm') : '');
    } else {
      setTitle('');
      setDate('');
      setStartTime('');
      setEndTime('');
    }
  }, [selectedEvent]);

  const handleSubmit = () => {
    if (selectedEvent) {
      const updatedEvent = {
        ...selectedEvent,
        title,
        start: moment(date).set({ hour: startTime.split(':')[0], minute: startTime.split(':')[1] }).toDate(),
        end: moment(date).set({ hour: endTime.split(':')[0], minute: endTime.split(':')[1] }).toDate(),
      };
      handleEditEvent(updatedEvent);
    } else {
      const newEvent = {
        id: Math.random(),
        title,
        start: moment(date).set({ hour: startTime.split(':')[0], minute: startTime.split(':')[1] }).toDate(),
        end: moment(date).set({ hour: endTime.split(':')[0], minute: endTime.split(':')[1] }).toDate(),
      };
      handleAddEvent(newEvent);
    }
    setShowOffcanvas(false);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date().toISOString().split('T')[0];
    if (selectedDate >= today) {
      setDate(selectedDate);
    }
  };

  const handleDelete = () => {
    if (selectedEvent) {
      handleDeleteEvent(selectedEvent.id);
      setShowOffcanvas(false);
    }
  };

  return (
    <div className={`sidebar ${showOffcanvas ? 'show' : ''}`}>
      <div className="sidebar-content">
        <div className="sidebar-header">
          <h3>{selectedEvent ? 'Edit Event' : 'Add Event'}</h3>
          <button className="close-btn" onClick={() => setShowOffcanvas(false)}>Close</button>
        </div>
        <div className="sidebar-body">
          <label>Title</label>
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
          />
          <label>Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <label>End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSubmit}>{selectedEvent ? 'Update' : 'Submit'}</button>
          {selectedEvent && <button className="btn btn-danger" onClick={handleDelete}>Delete</button>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
