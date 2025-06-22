import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResourceList = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/resources');
      setResources(res.data);
    } catch (err) {
      console.error('Error fetching resources:', err);
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Hospital Resource Inventory</h2>
      {resources.length === 0 ? (
        <p>No resources found.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Hospital</th>
              <th>Location</th>
              <th>Type</th>
              <th>Available</th>
              <th>In Use</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((r, i) => (
              <tr key={i}>
                <td>{r.hospital.name}</td>
                <td>{r.hospital.location}</td>
                <td>{r.type}</td>
                <td>{r.available}</td>
                <td>{r.inUse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ResourceList;
