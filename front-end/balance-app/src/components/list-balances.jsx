import axios from 'axios';
import React, { useState } from 'react';
import '../styles/forms.css';
import marketMapping from '../models/marketModel';

function ListBalances() {
  const [inputs, setInputs] = useState({
    market: '',
    businessUnit: '',
    customerId: '',
    activity: '',
    period: '',
  });
  const [balances, setBalances] = useState(null);

  const handleChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const fetchBalances = async e => {
    e.preventDefault();
    const { market, customerId, activity, period } = inputs;
    const retailUnitCode = marketMapping[market].market;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/events/${retailUnitCode}/${customerId}/${activity}/${period}`
      );
      setBalances(response.data);
    } catch (error) {
      console.error('Error fetching balances:', error);
      alert('Failed to fetch balances');
    }
  };

  return (
    <div className="form-container">
      <h2>List Balances</h2>
      <form onSubmit={fetchBalances}>
        <div className="form-group">
          <label className="label">Market:</label>
          <select
            name="market"
            value={inputs.market}
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
          <label className="label">CustomerId:</label>
          <input
            type="text"
            name="customerId"
            value={inputs.customerId}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Activity:</label>
          <input
            type="text"
            name="activity"
            value={inputs.activity}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Period (YYYY-MM):</label>
          <input
            type="text"
            name="period"
            value={inputs.period}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn">
          Fetch Balances
        </button>
      </form>
      {balances && (
        <div className="balance-details">
          <table className="balances-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Opening Balance</th>
                <th>Closing Balance</th>
                <th>Adjustments</th>
              </tr>
            </thead>
            <tbody>
              {balances.balances.map((balance, index) => (
                <tr key={index}>
                  <td>{balance.month}</td>
                  <td>${balance.openingBalance}</td>
                  <td>${balance.closingBalance}</td>
                  <td>${balance.adjustments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ListBalances;
