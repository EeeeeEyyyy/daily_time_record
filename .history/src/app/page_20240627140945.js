"use client"
import React, { useEffect, useState } from 'react';

const DailyTimeRecord = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [timeOut, setTimeOut] = useState('');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState({ name: '', arrivalTime: '', timeOut: '' });
  const [filter, setFilter] = useState('');
  const [filterType, setFilterType] = useState('name');
  const [editIndex, setEditIndex] = useState(null);

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

  const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    const hourInt = parseInt(hour);
    const ampm = hourInt >= 12 ? 'PM' : 'AM';
    const formattedHour = hourInt % 12 || 12;
    return `${formattedHour}:${minute} ${ampm}`;
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
    const newErrors = {
      name: name ? '' : 'Name is required',
      arrivalTime: arrivalTime ? '' : 'Arrival time is required',
      timeOut: timeOut ? '' : 'Time out is required'
    };

    if (newErrors.name || newErrors.arrivalTime || newErrors.timeOut) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      name,
      date,
      arrivalTime: formatTime(arrivalTime),
      timeOut: formatTime(timeOut)
    };

    if (editIndex !== null) {
      const updatedData = data.map((item, index) =>
        index === editIndex ? payload : item
      );
      setData(updatedData);
      localStorage.setItem('user', JSON.stringify(updatedData));
      setEditIndex(null);
    } else {
      const updatedData = [...data, payload];
      setData(updatedData);
      localStorage.setItem('user', JSON.stringify(updatedData));
    }

    setName('');
    setArrivalTime('');
    setTimeOut('');
    setErrors({ name: '', arrivalTime: '', timeOut: '' });
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    localStorage.setItem('user', JSON.stringify(updatedData));
  };

  const handleEdit = (index) => {
    const record = data[index];
    setName(record.name);
    setArrivalTime(record.arrivalTime);
    setTimeOut(record.timeOut);
    setEditIndex(index);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const filteredData = data.filter((item) => {
    const searchTerm = filter.toLowerCase();
    if (filterType === 'name') {
      return item.name.toLowerCase().includes(searchTerm);
    } else if (filterType === 'date') {
      return item.date.toLowerCase().includes(searchTerm);
    } else if (filterType === 'arrivalTime') {
      return item.arrivalTime.toLowerCase().includes(searchTerm);
    } else if (filterType === 'timeOut') {
      return item.timeOut.toLowerCase().includes(searchTerm);
    }
    return false;
  });

  return (
    <div>
      <div>
        <h2>Current Date</h2>
        <p>{date}</p>
      </div>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => handleChangeName(e.target.value)}
      />
      {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

      <input
        type="time"
        placeholder="Time of Arrival"
        value={arrivalTime}
        onChange={(e) => handleChangeArrivalTime(e.target.value)}
      />
      {errors.arrivalTime && <p style={{ color: 'red' }}>{errors.arrivalTime}</p>}

      <input
        type="time"
        placeholder="Time Out"
        value={timeOut}
        onChange={(e) => handleChangeTimeOut(e.target.value)}
      />
      {errors.timeOut && <p style={{ color: 'red' }}>{errors.timeOut}</p>}

      <button onClick={handleSubmit}>
        {editIndex !== null ? 'Update' : 'Submit'}
      </button>

      <div style={{ marginTop: '1rem' }}>
        <select value={filterType} onChange={handleFilterTypeChange}>
          <option value="name">Name</option>
          <option value="date">Date</option>
          <option value="arrivalTime">Arrival Time</option>
          <option value="timeOut">Time Out</option>
        </select>
        <input
          type="text"
          placeholder={`Filter by ${filterType}`}
          value={filter}
          onChange={handleFilterChange}
          style={{ display: 'block', marginTop: '1rem' }}
        />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h1>Daily Time Record</h1>
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <pre>
                Name: {item.name}<br />
                Date: {item.date}<br />
                Time of Arrival: {item.arrivalTime}<br />
                Time Out: {item.timeOut}
              </pre>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No records found.</p>
        )}
      </div>
    </div>
  );
};

export default DailyTimeRecord;
