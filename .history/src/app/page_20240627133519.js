"use client";

import React, { useEffect, useState } from 'react';

const Page = () => {
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
    } else {
      console.log("Please fill in all fields");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => handleChangeName(e.target.value)}
      />
      <input
        type="time"
        placeholder="Time of Arrival"
        onChange={(e) => handleChangeArrivalTime(e.target.value)}
      />
      <input
        type="time"
        placeholder="Time Out"
        onChange={(e) => handleChangeTimeOut(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

      <div style={{ marginTop: '1rem' }}>
        <h1>List of users</h1>
        {data.map((item, index) => (
          <pre style={{ color: 'black', marginBottom: '1rem' }} key={index}>
            Name: {item.name}<br />
            Date: {item.date}<br />
            Time of Arrival: {item.arrivalTime}<br />
            Time Out: {item.timeOut}
          </pre>
        ))}
      </div>
    </div>
  );
};

export default Page;
