import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RequestList = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/requests');
      setRequests(res.data);
    } catch (err) {
      console.error('Error fetching requests:', err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/requests/${id}`, { status });
      fetchRequests(); // refresh list
    } catch (err) {
      console.error('Error updating request status:', err);
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>All Resource Requests</h2>
      {requests.length === 0 ? (
        <p>No requests yet.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Type</th>
              <th>Qty</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id}>
                <td>{r.fromHospital?.name}</td>
                <td>{r.toHospital?.name}</td>
                <td>{r.resourceType}</td>
                <td>{r.quantity}</td>
                <td>{r.status}</td>
                <td>
                  {r.status === 'pending' ? (
                    <>
                      <button onClick={() => updateStatus(r.id, 'approved')}>Approve</button>
                      <button onClick={() => updateStatus(r.id, 'declined')} style={{ marginLeft: '0.5rem' }}>
                        Decline
                      </button>
                    </>
                  ) : (
                    <em>{r.status}</em>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RequestList;
