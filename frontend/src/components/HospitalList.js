import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/hospitals');
      setHospitals(res.data);
    } catch (err) {
      console.error('Error fetching hospitals:', err);
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>All Registered Hospitals</h2>
      {hospitals.length === 0 ? (
        <p>No hospitals found.</p>
      ) : (
        <ul>
          {hospitals.map((h) => (
            <li key={h.id} style={{ marginBottom: '0.5rem' }}>
              <strong>{h.name}</strong> ({h.location}) — {h.contactPerson}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HospitalList;
