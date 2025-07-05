// src/pages/AdminPanel.jsx
import { useEffect, useState } from 'react';
import API from '../services/api';
import './adminPanel.css';

const AdminPanel = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await API.get('/requests/admin/pending');
      setRequests(res.data || []);
    } catch (err) {
      console.error('Failed to fetch withdrawal requests:', err);
    }
  };

  const handleAction = async (id, status) => {
    try {
      await API.patch(`/requests/admin/${id}`, { status });
      fetchRequests();
    } catch (err) {
      console.error('Failed to update request status:', err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      {requests.length === 0 ? (
        <p>No pending requests found.</p>
      ) : (
        requests.map((req) => (
          <div key={req._id} className="request-card">
            <p><strong>Student:</strong> {req.user?.name || 'N/A'}</p>
            <p><strong>Email:</strong> {req.user?.email || 'N/A'}</p>
            <p><strong>Subject:</strong> {req.subject || 'N/A'}</p>
            <p><strong>Reason:</strong> {req.reason || 'N/A'}</p>
            <p><strong>Status:</strong> {req.status || 'pending'}</p>
            <div className="actions">
              <button className="approve" onClick={() => handleAction(req._id, 'Approved')}>Approve</button>
              <button className="reject" onClick={() => handleAction(req._id, 'Rejected')}>Reject</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPanel;
