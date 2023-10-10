import React, { useEffect, useRef, useState } from 'react';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
// import './CalendarComponent.css'; // Import your custom CSS for styling

function CalendarComponent() {
  const calendarRef = useRef(null);
  const draggableRef = useRef(null);
  const [eventData, setEventData] = useState([]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');


  useEffect(() => {
    // Get the current date
    const currentDate = new Date();

    const calendarEl = document.getElementById('calendar');

    const calendar = new Calendar(calendarEl, {
      plugins: [timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      initialDate: new Date(),
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridWeek',
      },
      editable: true,
      eventOverlap: false,
      events: eventData,
      firstDay: currentDate.getDay(),
      eventReceive: function (info) {
        // When a draggable event is dropped, add it as a custom event to eventData
        const newEvent = {
          title: info.event.title,
          start: info.event.start,
          end: info.event.end,
        };
        setEventData([...eventData, newEvent]);
      },
      eventContent: function (info) {
        // Customize the event rendering here
        const eventContent = document.createElement('div');
        eventContent.classList.add('custom-event');

        // Add event title and time information
        const title = document.createElement('div');
        title.innerText = info.event.title;
        eventContent.appendChild(title);

        const time = document.createElement('div');
        time.innerText = info.event.start.toLocaleTimeString() + ' - ' + info.event.end.toLocaleTimeString();
        eventContent.appendChild(time);

  // Inside eventContent function
const deleteButton = document.createElement('button');
deleteButton.innerText = 'Delete';
deleteButton.addEventListener('click', () => {
  // Remove the event from the calendar
  info.event.remove();

  // Remove the event from the eventData state by comparing start and end times
  const updatedEventData = eventData.filter((event) => {
    return (
      event.start.getTime() !== info.event.start.getTime() ||
      event.end.getTime() !== info.event.end.getTime()
    );
  });
  setEventData(updatedEventData);
});
eventContent.appendChild(deleteButton);

   return { domNodes: [eventContent] };      },
    });

    calendar.render();

    draggableRef.current = new Draggable(document.getElementById('external-events'), {
      itemSelector: '.fc-event',
      eventData: function (eventEl) {
        return {
          title: eventEl.innerText,
          duration: eventEl.getAttribute('data-duration'),
        };
      },
    });

    calendarRef.current = calendar;

    return () => {
      draggableRef.current.destroy();
    };
  }, [eventData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!eventTitle || !eventStartDate || !eventStartTime || !eventEndTime) {
      alert('Please fill in all fields.');
      return;
    }

    const startDateTime = new Date(`${eventStartDate}T${eventStartTime}`);
    const endDateTime = new Date(`${eventStartDate}T${eventEndTime}`);

    const newCustomEvent = {
      title: eventTitle,
      start: startDateTime,
      end: endDateTime,
    };

    setEventData([...eventData, newCustomEvent]);

    setEventTitle('');
    setEventStartDate('');
    setEventStartTime('');
    setEventEndDate('');
    setEventEndTime('');
  };

  return (
    <div>
      <div id='external-events'>
        <p>
          <strong>Draggable Events</strong>
        </p>
        <div className='fc-event' data-duration='02:00:00'>Event 1 (2 hours)</div>
        <div className='fc-event' data-duration='01:30:00'>Event 2 (1.5 hours)</div>
        <div className='fc-event' data-duration='03:15:00'>Event 3 (3 hours 15 minutes)</div>
        <p>
          <input type='checkbox' id='drop-remove' />
          <label htmlFor='drop-remove'>Remove after drop</label>
        </p>
      </div>
      <div id='calendar-container'>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='eventTitle'>Event Title:</label>
            <input
              type='text'
              id='eventTitle'
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='eventStartDate'>Start Date:</label>
            <input
              type='date'
              id='eventStartDate'
              value={eventStartDate}
              onChange={(e) => setEventStartDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='eventStartTime'>Start Time:</label>
            <input
              type='time'
              id='eventStartTime'
              value={eventStartTime}
              onChange={(e) => setEventStartTime(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='eventEndTime'>End Time:</label>
            <input
              type='time'
              id='eventEndTime'
              value={eventEndTime}
              onChange={(e) => setEventEndTime(e.target.value)}
            />
          </div>
          <button type='submit'>Add Custom Event</button>
        </form>
        <div id='calendar'></div>
      </div>
    </div>
  );
}

export default CalendarComponent;
