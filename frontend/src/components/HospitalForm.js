import React, { useState } from 'react';
import axios from 'axios';

const HospitalForm = () => {
  const [form, setForm] = useState({
    name: '',
    location: '',
    contactPerson: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/hospitals', form);
      alert('Hospital registered!');
      setForm({ name: '', location: '', contactPerson: '', email: '', password: '' });
    } catch (err) {
      console.error(err);
      alert('Error registering hospital');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
      <h2>Register Hospital</h2>

      {['name', 'location', 'contactPerson', 'email', 'password'].map(field => (
        <div key={field} style={{ marginBottom: '0.5rem' }}>
          <label>
            {field.charAt(0).toUpperCase() + field.slice(1)}:
            <input
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              style={{ marginLeft: '0.5rem' }}
            />
          </label>
        </div>
      ))}

      <button type="submit">Register</button>
    </form>
  );
};

export default HospitalForm;
