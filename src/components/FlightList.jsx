
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FlightList = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/flights/')
      .then(response => setFlights(response.data))
      .catch(error => console.error('Error fetching flights:', error));
  }, []);

  return (
    <div>
      <h1>Flight List</h1>
      <Link to="/add-flight">Add New Flight</Link>
      <ul>
        {flights.map(flight => (
          <li key={flight.id}>
            {flight.flight_number} - {flight.departure_airport} to {flight.arrival_airport}
            <Link to={`/edit-flight/${flight.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightList;
