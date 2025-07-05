// src/pages/RequestForm.jsx
import { useState } from 'react';
import API from '../services/api';
import './Form.css'; // Optional: if you're using a common form style

const RequestForm = () => {
  const [form, setForm] = useState({
    subject: '',   // ✅ correct field name
    reason: ''
  });

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("🔁 Submitting form:", form); // Debug log
      await API.post('/requests', form);
      alert('✅ Request submitted successfully');
      setForm({ subject: '', reason: '' }); // Clear form
    } catch (err) {
      console.error("❌ Submit error:", err.response?.data);
      alert(err.response?.data?.message || 'Failed to submit request');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Subject Withdrawal Form</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="auth-input"
            type="text"
            name="subject"
            placeholder="Subject Name"
            value={form.subject}
            onChange={handleChange}
            required
          />

          <textarea
            className="auth-input"
            name="reason"
            placeholder="Reason for withdrawal"
            value={form.reason}
            onChange={handleChange}
            rows={4}
            required
          />

          <button className="auth-button" type="submit">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
