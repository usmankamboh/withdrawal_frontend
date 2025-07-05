import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>Welcome, {user?.user?.name || "Student"} 🎓</h2>
        <p>You can request a subject withdrawal or view your previous requests below.</p>

        <div className="dashboard-options">
          <button className="dashboard-btn" onClick={() => navigate('/request')}>
            Request Withdrawal
          </button>
          <button className="dashboard-btn secondary" onClick={() => navigate('/my-requests')}>
            View My Requests
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
