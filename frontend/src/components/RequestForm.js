import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RequestForm = () => {
  const [hospitals, setHospitals] = useState([]);
  const [form, setForm] = useState({
    fromHospitalId: '',
    toHospitalId: '',
    resourceType: '',
    quantity: '',
    message: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/hospitals')
      .then(res => setHospitals(res.data))
      .catch(err => console.error('Error fetching hospitals:', err));
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.fromHospitalId === form.toHospitalId) {
      alert("From and To hospitals must be different");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/requests', {
        ...form,
        quantity: parseInt(form.quantity)
      });
      alert('Request sent!');
      setForm({
        fromHospitalId: '',
        toHospitalId: '',
        resourceType: '',
        quantity: '',
        message: ''
      });
    } catch (err) {
      console.error(err);
      alert('Error sending request');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
      <h2>Request Resources</h2>

      <div style={{ marginBottom: '0.5rem' }}>
        <label>
          From Hospital:
          <select name="fromHospitalId" value={form.fromHospitalId} onChange={handleChange} required>
            <option value="">-- Select Hospital --</option>
            {hospitals.map(h => (
              <option key={h.id} value={h.id}>{h.name} ({h.location})</option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ marginBottom: '0.5rem' }}>
        <label>
          To Hospital:
          <select name="toHospitalId" value={form.toHospitalId} onChange={handleChange} required>
            <option value="">-- Select Hospital --</option>
            {hospitals.map(h => (
              <option key={h.id} value={h.id}>{h.name} ({h.location})</option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ marginBottom: '0.5rem' }}>
        <label>
          Resource Type:
          <input type="text" name="resourceType" value={form.resourceType} onChange={handleChange} required />
        </label>
      </div>

      <div style={{ marginBottom: '0.5rem' }}>
        <label>
          Quantity:
          <input type="number" name="quantity" value={form.quantity} onChange={handleChange} required />
        </label>
      </div>

      <div style={{ marginBottom: '0.5rem' }}>
        <label>
          Message:
          <input type="text" name="message" value={form.message} onChange={handleChange} />
        </label>
      </div>

      <button type="submit">Send Request</button>
    </form>
  );
};

export default RequestForm;
