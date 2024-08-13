import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Updated import
const UserRegistration = () => {
    const [user, setUser] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
  
    const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:8000/register/', user)
        .then(() => navigate('/login')) // Use navigate for redirection
        .catch(error => console.error('Error registering user:', error));
    };
  
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" value={user.username} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={user.email} onChange={handleChange} />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={user.password} onChange={handleChange} />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  };
  
  export default UserRegistration;
  