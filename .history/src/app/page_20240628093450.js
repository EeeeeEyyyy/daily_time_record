"use client";
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import Image from "next/image";
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
  const formatTimeForInput = (time) => {
    const date = new Date();
    const [hours, minutes] = time.split(':');
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toTimeString().slice(0, 5);
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
      name: name ? '' : 'Name is required bago mag submit',
      arrivalTime: arrivalTime ? '' : 'Arrival time is required bago mag submit',
      timeOut: timeOut ? '' : 'Time out is required bago mag submit'
    };
    if (newErrors.name || newErrors.arrivalTime || newErrors.timeOut) {
      setErrors(newErrors);
      return;
    }
    const payload = {
      name,
      date,
      arrivalTime: formatTimeForInput(arrivalTime),
      timeOut: formatTimeForInput(timeOut)
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
    <div className="container">
       <div className={styles.nav}>
        <h1>Daily Time Record</h1>
        <div className={styles.date}>
          <p>{date}</p>
        </div>
        <div className={styles.filter} style={{ marginTop: '1rem' }}>
          <select value={filterType} onChange={handleFilterTypeChange}>
            <option value="name">Name</option>
            <option value="date">Date</option>
            <option value="arrivalTime">Time In</option>
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
      </div>
    <div className={styles.main}>
     <form autocomplete='off' class='form'>
  <div class='control'>
    <h1>
      Sign In
    </h1>
  </div>
  <div class='control block-cube block-input'>
        Trainee:
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => handleChangeName(e.target.value)}
        />
    <div class='bg-top'>
      <div class='bg-inner'></div>
    </div>
    <div class='bg-right'>
      <div class='bg-inner'></div>
    </div>
    <div class='bg'>
      <div class='bg-inner'></div>
    </div>
  </div>
  <div className='control block-cube block-input'>
    <div className='bg-top'>
      <div className='bg-inner'></div>
    </div>
    <div className='bg-right'>
      <div className='bg-inner'></div>
    </div>
    <div className='bg'>
      <div className='bg-inner'></div>
    </div>
  </div>
  <button className='btn block-cube block-cube-hover' type='button' onClick={handleSubmit}>
          {editIndex !== null ? 'Update' : 'Submit'}/>
    <div className='bg-top'>
      <div className='bg-inner'></div>
    </div>
    <div className='bg-right'>
      <div className='bg-inner'></div>
    </div>
    <div className='bg'>
      <div className='bg-inner'></div>
    </div>
    <div className='text'>
      Log In
    </div>
  </button>
</form>

      <div className={styles.input_field}>

        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        Time In:
        <input
          type="time"
          placeholder="Time In"
          value={arrivalTime}
          onChange={(e) => handleChangeArrivalTime(e.target.value)}
        />
        {errors.arrivalTime && <p style={{ color: 'red' }}>{errors.arrivalTime}</p>}
        Time Out:
        <input
          type="time"
          placeholder="Time Out"
          value={timeOut}
          onChange={(e) => handleChangeTimeOut(e.target.value)}
        />
        {errors.timeOut && <p style={{ color: 'red' }}>{errors.timeOut}</p>}
      </div>
      <div className={styles.trainees_m} style={{ marginTop: '1rem' }}>
        <h2>Trainees</h2>
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div className={styles.trainees} key={index} style={{ marginBottom: '1rem' }}>
              <div className={styles.details}>
                <pre>
                  <span className={styles.details_b}>Name:</span> {item.name}<br />
                  <span className={styles.details_b}>Date:</span> {item.date}<br />
                  <span className={styles.details_b}>Time In:</span> {item.arrivalTime}<br />
                  <span className={styles.details_b}>Time Out:</span> {item.timeOut}
                </pre>
              </div>
              <div className={styles.button_e_d}>
                <button onClick={() => handleEdit(index)}className={styles.but}>   
                           <Image
              src="./edit.svg"
              alt="edit"
              className={styles.bt}
              width={40}
              height={40}
              priority
            /></button>
                <button onClick={() => handleDelete(index)} className={styles.but}> <Image
              src="./delete.svg"
              alt="edit"
              className={styles.bt}
              width={40}
              height={40}
              priority
            /></button>
              </div>
            </div>
          ))
        ) : (
          <p>No records found.</p>
        )}
      </div>
    </div>
    </div>
  );
};
export default DailyTimeRecord;
