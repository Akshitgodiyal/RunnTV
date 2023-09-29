import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar's CSS styles

function MyCalendar() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div>
      <h1>My Calendar App</h1>
      <Calendar
        onChange={handleDateChange}
        value={date}
      />
      <p>Selected date: {date.toLocaleDateString()}</p>
    </div>
  );
}

export default MyCalendar;
