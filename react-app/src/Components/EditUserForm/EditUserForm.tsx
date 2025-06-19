import React, { useState } from "react";
import "./EditUserForm.css"; // Assuming you have a CSS file for styling

interface EditUserFormProps {
  id: number;
  fullName: string;
  email: string;
  onUpdate: (updatedUser: { id: number; fullName: string; email: string }) => void;
  onCancel: () => void;
}

export default function EditUserForm({ id, fullName, email, onUpdate, onCancel }: EditUserFormProps) {
  const [name, setName] = useState(fullName);
  const [userEmail, setUserEmail] = useState(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ id, fullName: name, email: userEmail });
  };

  return (
<div className="edit-user-container">
  <form onSubmit={handleSubmit} className="edit-user-form">
    <h2 className="edit-form-title">Edit Profile</h2>
    
    <div className="form-group">
      <label htmlFor="fullName">Full Name</label>
      <input
        id="fullName"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
    </div>
    
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        required
      />
    </div>
    
    <div className="btn-row">
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </div>
  </form>
</div>

  );
}
