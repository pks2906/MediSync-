import React from 'react';
import './index.css';
import NotificationPanel from './components/NotificationPanel';
import HospitalForm from './components/HospitalForm';
import HospitalList from './components/HospitalList';
import ResourceForm from './components/ResourceForm';
import ResourceList from './components/ResourceList';
import RequestForm from './components/RequestForm';
import RequestList from './components/RequestList';

function App() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Medical Resource Coordination Platform
      </h1>

      <NotificationPanel />

      <div className="card">
        <HospitalForm />
      </div>

      <div className="card">
        <HospitalList />
      </div>

      <div className="card">
        <ResourceForm />
      </div>

      <div className="card">
        <ResourceList />
      </div>

      <div className="card">
        <RequestForm />
      </div>

      <div className="card">
        <RequestList />
      </div>
    </div>
  );
}

export default App;
