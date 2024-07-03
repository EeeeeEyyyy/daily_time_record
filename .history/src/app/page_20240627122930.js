"use client"

import React, { useEffect, useState } from 'react'

const Page = () => {
  const [data, setData] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 

  const handleChangeEmail = (value) => {
    setEmail(value)
  }

  const handleChangePassword = (value) => {
    setPassword(value)
  }

  const handleSubmit = () => {

    if (email && password) {
   
      // for local storage
      const payload = {
        email,
        password
      }

      //  setting up the actual data state
      setData((prev) => {
        return [...prev, payload]
      })
      
    } else {
      console.log("Wala pang laman")
    }
  }

  useEffect(()=>{
    localStorage.setItem('user',JSON.stringify(data))
  },[data])


  return (
    <div>
      <input type="text" onChange={(e) => {
        handleChangeEmail(e.target.value)
      }} />
      <input type="text" onChange={(e) => {
        handleChangePassword(e.target.value)
      }} />
      <button onClick={handleSubmit}>Submit</button>

      <div style={{
        marginTop:'1rem'
      }}>
       <h1>List of users</h1>
       {data?.map((item, index) => (
          <pre style={{
            color: 'black',
            marginBottom:'1rem'
          }} key={index}>
            Email: {item?.email}<br/>
            Password: {item?.email}
          </pre>
        ))}
      </div>
    </div>
  )
}

export default Page