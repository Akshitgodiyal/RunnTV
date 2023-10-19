import React, { useEffect, useRef, useState } from 'react';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

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
    const calendarEl = document.getElementById('calendar');
    const currentDate = new Date();
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
  
      eventContent: function (info) {
        const eventContent = document.createElement('div');
        eventContent.classList.add('custom-event');

        // Check if the event is split and mark the original event as hidden
        if (info.event.extendedProps.isSplit) {
          eventContent.style.display = 'none';
        }

        // Add event title and time information with error handling
        const title = document.createElement('div');
        title.innerText = info.event.title;
        eventContent.appendChild(title);

        const time = document.createElement('div');
        if (info.event.start && info.event.end) {
          time.innerText =
            info.event.start.toLocaleTimeString() +
            ' - ' +
            info.event.end.toLocaleTimeString();
        } else {
          time.innerText = 'Invalid Date Range';
        }
        eventContent.appendChild(time);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => {
          // Remove the event from the calendar
          info.event.remove();
        
          // Mark the original event as hidden if it's split
          if (info.event.extendedProps.isSplit) {
            const originalEvent = calendarRef.current.getEventById(info.event.id);
            if (originalEvent) {
              originalEvent.setExtendedProp('isSplit', true);
            }
          }
        console.log("sdsd",eventData);
          // Remove the event from the eventData state by comparing start and end times
          const updatedEventData = eventData.filter((event) => {
            return (
              event.start.getTime() !== info.event.start.getTime() ||
              event.end.getTime() !== info.event.end.getTime()
            );
          });
        
          // Update the eventData state
          setEventData(updatedEventData);
        });

        eventContent.appendChild(deleteButton);

        return { domNodes: [eventContent] };
      },

     eventReceive: function (info) {
        // When a draggable event is dropped, add it as a custom event to eventData
        const newEvent = {
          title: info.event.title,
          start: info.event.start,
          end: info.event.end,
        };
        setEventData([...eventData, newEvent]);
      },
    });

    calendar.render();

    draggableRef.current = new Draggable(
      document.getElementById('external-events'),
      {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
          return {
            id: Date.now(), // Assign a unique ID to the event
            title: eventEl.innerText,
            duration: eventEl.getAttribute('data-duration'),
          };
        },
      }
    );

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

    // Check for collisions with existing events
    const overlappingEvents = calendarRef.current.getEvents().filter((event) => {
      return (
        startDateTime < event.end && endDateTime > event.start
      );
    });

    if (overlappingEvents.length > 0) {
   // Split the first overlapping event into parts
const firstEvent = overlappingEvents[0];
const newEvents = [];

// Calculate the remaining time of the first event after the custom event
const remainingTime = firstEvent.end - endDateTime;

// First part
if (firstEvent.start < startDateTime) {
  const firstPart = {
    id: Date.now(),
    title: firstEvent.title,
    start: firstEvent.start,
    end: startDateTime,
  };
  newEvents.push(firstPart);
}
const secondPart = {
  id: Date.now(),
  title: eventTitle,
  start: startDateTime,
  end: endDateTime,
};
newEvents.push(secondPart);
const secondPar = secondPart.end - secondPart.start ;
// Third part (remaining part of the first event)
if (remainingTime > 0) {
  const thirdPart = {
    id: Date.now(),
    title: firstEvent.title,
    start: endDateTime,
    end: new Date(secondPart.end.getTime() + remainingTime + secondPar), // Adjust the end time dynamically
  };
  newEvents.push(thirdPart);
}

// Remove the original overlapping event
firstEvent.remove();

// Add the new events to the calendar
newEvents.forEach((newEvent) => {
  calendarRef.current.addEvent(newEvent);
});

// Update the eventData state
setEventData((prevEventData) => {
  // Filter out the original overlapping event by comparing start, end, and title
  const updatedEventData = prevEventData.filter((event) => {
    return (
      event.start.getTime() !== firstEvent.start.getTime() ||
      event.end.getTime() !== firstEvent.end.getTime() ||
      event.title !== firstEvent.title
    );
  });

  // Concatenate the new separated parts to the filtered data
  return [...updatedEventData, ...newEvents];
});


    }

    // Clear input fields
    setEventTitle('');
    setEventStartDate('');
    setEventStartTime('');
    setEventEndDate('');
    setEventEndTime('');
  };
console.log("eventData",eventData);
  return (
    <div>
      <div id='external-events'>
        <p>
          <strong>Draggable Events</strong>
        </p>
        <div className='fc-event' data-duration='02:00:00'>
          Event 1 (2 hours)
        </div>
        <div className='fc-event' data-duration='01:30:00'>
          Event 2 (1.5 hours)
        </div>
        <div className='fc-event' data-duration='03:15:00'>
          Event 3 (3 hours 15 minutes)
        </div>
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
