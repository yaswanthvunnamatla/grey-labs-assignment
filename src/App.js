import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Sidebar from './components/Sidebar/Sidebar';
import { EventProvider, useEventContext } from './context/EventContext';
import './App.css';

const localizer = momentLocalizer(moment);

const App = () => {
  return (
    <EventProvider>
      <AppContent />
    </EventProvider>
  );
};

const AppContent = () => {
  const { showOffcanvas, setShowOffcanvas, events, handleAddEvent, handleEditEvent, handleDeleteEvent, handleSelectEvent, selectedEvent, setSelectedEvent } = useEventContext();

  return (
    <div className='calender-container'>
      <div className='btn-container'>
        <button className="btn-event" onClick={() => { setSelectedEvent(null); setShowOffcanvas(true); }}>
          Add Event
        </button>
      </div>
      <Sidebar
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        onAddEvent={handleAddEvent}
        onEditEvent={handleEditEvent}
        onDeleteEvent={handleDeleteEvent}
        selectedEvent={selectedEvent}
      />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100vh' }}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
};

export default App;
