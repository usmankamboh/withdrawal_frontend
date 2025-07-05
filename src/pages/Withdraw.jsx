// src/pages/Withdraw.jsx
import React from "react";
import "./Withdraw.css"; // We'll style this too

const Withdraw = () => {
  return (
    <div className="withdraw-container">
      <div className="withdraw-card">
        <h2>Welcome to the Subject Withdrawal Portal</h2>
        <p>If you need to withdraw from a subject, you're in the right place.</p>
        <p>Click "Apply for Withdrawal" above to begin the process. More features coming soon!</p>
        <button className="withdraw-button" disabled>Apply for Withdrawal</button>
      </div>
    </div>
  );
};

export default Withdraw;
