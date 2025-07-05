// src/pages/MyRequests.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import './MyRequest.css';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await API.get("/requests/my");
        setRequests(res.data);
      } catch (err) {
        alert("Failed to fetch requests");
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="my-requests-wrapper">
      <div className="my-requests-container">
        <h2>My Withdrawal Requests</h2>
        {requests.length === 0 ? (
          <p className="no-requests">No requests found.</p>
        ) : (
          <div className="requests-list">
            {requests.map((req) => (
              <div key={req._id} className="request-card">
                <h3>{req.subject}</h3>
                <p className="reason">{req.reason}</p>
                <span className={`status ${req.status.toLowerCase()}`}>
                  {req.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequests;
