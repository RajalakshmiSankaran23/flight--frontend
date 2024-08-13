import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Updated import
const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate(); // Use useNavigate
  
    const handleChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:8000/login/', credentials)
        .then(response => {
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);
          navigate('/'); // Use navigate to redirect
        })
        .catch(error => console.error('Error logging in:', error));
    };
  
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" value={credentials.username} onChange={handleChange} />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={credentials.password} onChange={handleChange} />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };
  
  export default Login;
  