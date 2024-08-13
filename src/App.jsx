// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlightList from './components/FlightList';
import FlightForm from './components/FlightForm';
import UserRegistration from './components/UserRegistration';
import Login from './components/Login';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<FlightList />} />
          <Route path="/add-flight" element={<FlightForm />} />
          <Route path="/edit-flight/:id" element={<FlightForm />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

