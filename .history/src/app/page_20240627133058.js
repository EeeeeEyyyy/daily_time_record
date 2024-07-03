"use client";

import React, { useEffect, useState } from 'react';

const Page = () => {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [timeOut, setTimeOut] = useState('');

  const handleChangeEmail = (value) => {
    setEmail(value);
  };

  const handleChangePassword = (value) => {
    setPassword(value);
  };

  const handleChangeDate = (value) => {
    setDate(value);
  };

  const handleChangeArrivalTime = (value) => {
    setArrivalTime(value);
  };

  const handleChangeTimeOut = (value) => {
    setTimeOut(value);
  };

  const handleSubmit = () => {
    if (email && password && date && arrivalTime && timeOut) {
      const payload = {
        email,
        password,
        date,
        arrivalTime,
        timeOut
      };

      setData((prev) => [...prev, payload]);
    } else {
      console.log("Please fill in all fields");
    }
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(data));
  }, [data]);

  return (
    <div>
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => handleChangeEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => handleChangePassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Date (Month Date Year with Day)"
        onChange={(e) => handleChangeDate(e.target.value)}
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
            Email: {item.email}<br />
            Password: {item.password}<br />
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
