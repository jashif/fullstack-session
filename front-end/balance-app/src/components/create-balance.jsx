import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../styles/forms.css';
import marketMapping from '../models/marketModel';

function CreateBalance() {
  const [formData, setFormData] = useState({
    market: '',
    businessUnit: '',
    reason: '',
    customerId: '',
    type: '',
    value: '',
  });
  const [businessUnits, setBusinessUnits] = useState([]);

  useEffect(() => {
    if (formData.market) {
      setBusinessUnits(marketMapping[formData.market].businessUnits);
      setFormData(prev => ({
        ...prev,
        businessUnit: marketMapping[formData.market].businessUnits[0],
      }));
    }
  }, [formData.market]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/events/${formData.market}/${formData.customerId}`,
        {
          reason: formData.reason,
          reasonTime: new Date().getTime(),
          type: formData.type,
          value: parseInt(formData.value, 10),
          businessUnit: formData.businessUnit,
        }
      );
      console.log('Response:', response.data);
      alert('Balance event created successfully!');
    } catch (error) {
      console.error(
        'Error creating balance event:',
        error.response?.data || error.message
      );
      alert('Failed to create balance event');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Create Balance Event</h2>
      <div className="form-group">
        <label className="label">Market:</label>
        <select
          name="market"
          value={formData.market}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option value="">Select Market</option>
          {Object.keys(marketMapping).map(key => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="label">Business Unit:</label>
        <select
          name="businessUnit"
          value={formData.businessUnit}
          onChange={handleChange}
          className="form-control"
          required
        >
          {businessUnits.map((bu, index) => (
            <option key={index} value={bu}>
              {bu}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="label">Reason:</label>
        <input
          type="text"
          name="reason"
          value={formData.reason}
          className="form-control"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label className="label">Customer Id :</label>
        <input
          type="text"
          name="customerId"
          value={formData.customerId}
          className="form-control"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label className="label">Type:</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option value="">Select Type</option>
          <option value="INCREASED">INCREASED</option>
          <option value="DECREASED">DECREASED</option>
        </select>
      </div>
      <div className="form-group">
        <label className="label">Value:</label>
        <input
          type="number"
          name="value"
          value={formData.value}
          className="form-control"
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn">
        Create Balance Event
      </button>
    </form>
  );
}

export default CreateBalance;
