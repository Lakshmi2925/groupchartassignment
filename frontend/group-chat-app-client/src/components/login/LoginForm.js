import React, { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom'
import './Loginpage.css';


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Username:', username);
    console.log('Password:', password);
    axios.post('https://localhost:3000/api/auth/login', { email : username, password : password })
      .then(response => {
        // const user = response.data;
        if (response.data.statuscode === 200) {
          <Link to="/about">About</Link>
        }
        else {
          <Link to="/login"></Link>
        }
      })
      .catch(error => {
        setErrorMessage('Invalid email or password');
      });
  };

  return (
    <>
      <div className='login-container '>
        <div className='login-form-container '>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            className='form-label' 
            htmlFor="username">Username:</label>
          <input
            className='form-input'
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label
            className='form-label'
            htmlFor="password">Password:</label>
          <input
            className='form-input'
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button
          className='form-submit-button ' 
          type="submit">Log In</button>
        {errorMessage && <div>{errorMessage}</div>}
      </form>
      </div>
      </div>
    </>
  );
}

export default LoginForm;
