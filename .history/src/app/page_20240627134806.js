"use client";

import React, { useEffect, useState } from 'react';

const DailyTimeRecord = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [timeOut, setTimeOut] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('user')) || [];
    setData(storedData);
    setDate(getCurrentDate());
  }, []);

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleChangeName = (value) => {
    setName(value);
  };

  const handleChangeArrivalTime = (value) => {
    setArrivalTime(value);
  };

  const handleChangeTimeOut = (value) => {
    setTimeOut(value);
  };

  const handleSubmit = () => {
    if (name && arrivalTime && timeOut) {
      const payload = {
        name,
        date,
        arrivalTime,
        timeOut
      };

      const updatedData = [...data, payload];
      setData(updatedData);
      localStorage.setItem('user', JSON.stringify(updatedData));
      
      // Clear the input fields
      setName('');
      setArrivalTime('');
      setTimeOut('');
    } else {
      console.log("Please fill in all fields");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => handleChangeName(e.target.value)}
      />
      <input
        type="time"
        placeholder="Time of Arrival"
        value={arrivalTime}
        onChange={(e) => handleChangeArrivalTime(e.target.value)}
      />
      <input
        type="time"
        placeholder="Time Out"
        value={timeOut}
        onChange={(e) => handleChangeTimeOut(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

      <div style={{ marginTop: '1rem' }}>
        <h1>Daily Time Record</h1>
        {data.length > 0 && (
          <div>
            {data.map((item, index) => (
              <pre style={{ color: 'red', marginBottom: '1rem' }} key={index}>
                Name: {item.name}<br />
                Date: {item.date}<br />
                Time of Arrival: {item.arrivalTime}<br />
                Time Out: {item.timeOut}
              </pre>
            ))}
          </div>
        )}
        <h2>Current Date</h2>
        <p>{date}</p>
      </div>
    </div>
  );
};

export default DailyTimeRecord;
