import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FlightForm = () => {
  const [flight, setFlight] = useState({
    flight_number: '',
    airline: '',
    departure_airport: '',
    arrival_airport: '',
    departure_time: '',
    arrival_time: '',
    ticket_price: 0,
  });
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/flights/${id}/`)
        .then(response => setFlight(response.data))
        .catch(error => console.error('Error fetching flight:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlight({ ...flight, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = id ? `http://localhost:8000/api/flights/${id}/` : 'http://localhost:8000/api/flights/';
    const method = id ? 'put' : 'post';

    axios({
      method,
      url,
      data: flight
    })
      .then(() => navigate('/'))
      .catch(error => {
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        } else {
          console.error('Error submitting form:', error);
        }
      });
  };

  return (
    <div>
      <h1>{id ? 'Edit Flight' : 'Add Flight'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Flight Number:
          <input
            type="text"
            name="flight_number"
            value={flight.flight_number}
            onChange={handleChange}
          />
          {errors.flight_number && <div className="error">{errors.flight_number[0]}</div>}
        </label>
        <label>
          Airline:
          <input
            type="text"
            name="airline"
            value={flight.airline}
            onChange={handleChange}
          />
          {errors.airline && <div className="error">{errors.airline[0]}</div>}
        </label>
        <label>
          Departure Airport:
          <input
            type="text"
            name="departure_airport"
            value={flight.departure_airport}
            onChange={handleChange}
          />
          {errors.departure_airport && <div className="error">{errors.departure_airport[0]}</div>}
        </label>
        <label>
          Arrival Airport:
          <input
            type="text"
            name="arrival_airport"
            value={flight.arrival_airport}
            onChange={handleChange}
          />
          {errors.arrival_airport && <div className="error">{errors.arrival_airport[0]}</div>}
        </label>
        <label>
          Departure Time:
          <input
            type="datetime-local"
            name="departure_time"
            value={flight.departure_time}
            onChange={handleChange}
          />
          {errors.departure_time && <div className="error">{errors.departure_time[0]}</div>}
        </label>
        <label>
          Arrival Time:
          <input
            type="datetime-local"
            name="arrival_time"
            value={flight.arrival_time}
            onChange={handleChange}
          />
          {errors.arrival_time && <div className="error">{errors.arrival_time[0]}</div>}
        </label>
        <label>
          Ticket Price:
          <input
            type="number"
            name="ticket_price"
            value={flight.ticket_price}
            onChange={handleChange}
          />
          {errors.ticket_price && <div className="error">{errors.ticket_price[0]}</div>}
        </label>
        <button type="submit">{id ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
};

export default FlightForm;

  