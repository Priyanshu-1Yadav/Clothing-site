import React, { useState, useEffect } from 'react';
import { useVariableContext } from '../../../context/VariableContext';
import './editUsers.css';

export default function EditUser({ user, onClose }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    role: user?.role || '',
  });

  const {host, token} = useVariableContext();

  const [message, setMessage] = useState({ text: '', type: '' }); // For success/error messages

  useEffect(() => {
    // Initialize formData when user prop changes
    setFormData({
      name: user?.name || '',
      // email: user?.email || '',
      // mobile: user?.mobile || '',
      role: user?.role || '',
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/admin/edituser/${user.id}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage({ text: 'User updated successfully!', type: 'success' });
        setTimeout(onClose, 1500); // Close popup after showing success message
      } else {
        setMessage({ text: 'Error updating user. Please try again.', type: 'error' });
      }
    } catch (error) {
      console.error('API call failed:', error);
      setMessage({ text: 'Error updating user. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          {/* <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Mobile:
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </label> */}
          <label>
            Role:
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          {message.text && (
            <p className={`message ${message.type}`}>
              {message.text}
            </p>
          )}

          <button type="submit" className="submit-button">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
