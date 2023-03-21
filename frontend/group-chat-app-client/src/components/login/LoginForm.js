import React, { useState } from 'react';
import axios from "axios";
import './Loginpage.css';
import { useNavigate } from 'react-router-dom';


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

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
    axios.post('http://localhost:3000/api/auth/login', { email: username, password: password })
      .then(response => {
        console.log(response, "user>>>");
        // const user = response.data;
        if (response.status === 200 && response.data.message === "Login Successful") {
          console.log(response.user, "user>>>");
          navigate('/group');

        }

      })
      .catch(error => {
        setErrorMessage('Invalid email or password');
      });
  };
  const handlelogout = () => {
    axios.post("http://localhost:3000/api/auth/logout")
  }

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
      <div>
        <button
          className='form-submit-button '
          onClick={handlelogout}>Log out</button>
      </div>
    </>
  );
}

export default LoginForm;
