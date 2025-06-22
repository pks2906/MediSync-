import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResourceForm = () => {
  const [hospitals, setHospitals] = useState([]);
  const [form, setForm] = useState({
    hospitalId: '',
    type: '',
    available: '',
    inUse: ''
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
    try {
      await axios.post('http://localhost:5000/api/resources', {
        ...form,
        available: parseInt(form.available),
        inUse: parseInt(form.inUse)
      });
      alert('Resource updated!');
      setForm({ hospitalId: '', type: '', available: '', inUse: '' });
    } catch (err) {
      console.error(err);
      alert('Error updating resource');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
      <h2>Add/Update Hospital Resources</h2>

      <div style={{ marginBottom: '0.5rem' }}>
        <label>
          Hospital:
          <select name="hospitalId" value={form.hospitalId} onChange={handleChange} required>
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
          <input type="text" name="type" value={form.type} onChange={handleChange} required />
        </label>
      </div>

      <div style={{ marginBottom: '0.5rem' }}>
        <label>
          Available:
          <input type="number" name="available" value={form.available} onChange={handleChange} required />
        </label>
      </div>

      <div style={{ marginBottom: '0.5rem' }}>
        <label>
          In Use:
          <input type="number" name="inUse" value={form.inUse} onChange={handleChange} required />
        </label>
      </div>

      <button type="submit">Submit Resource</button>
    </form>
  );
};

export default ResourceForm;
