import React, { createContext, useState, useContext } from 'react';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    setShowOffcanvas(false);
  };

  const handleEditEvent = (updatedEvent) => {
    setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
    setShowOffcanvas(false);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
    setShowOffcanvas(false);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowOffcanvas(true);
  };

  return (
    <EventContext.Provider value={{ 
      events, 
      showOffcanvas, 
      setShowOffcanvas, 
      selectedEvent, 
      setSelectedEvent, 
      handleAddEvent, 
      handleEditEvent, 
      handleDeleteEvent, 
      handleSelectEvent 
    }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => useContext(EventContext);
