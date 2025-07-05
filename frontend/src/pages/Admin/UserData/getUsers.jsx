import React, { useState } from 'react';
import './getUsers.css';
import useGetUsers from '../../../hooks/Admin/useGetUsers';
import EditUser from './editUsers';

export default function GetUsers() {
  const { loading, error, users } = useGetUsers();
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user
  const [isEditing, setIsEditing] = useState(false); // State for edit popup visibility

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
  };

  const closeEditPopup = () => {
    setSelectedUser(null);
    setIsEditing(false);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {users?.length > 0 ? (
        <div>
        <h2>Users List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td data-label="ID">{user.id}</td>
                <td data-label="Name">{user.name}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Mobile">{user.mobile}</td>
                <td data-label="Role">{user.role}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      ) : (
        !loading && !error && <p>No users found</p>
      )}

      {isEditing && (
        <EditUser user={selectedUser} onClose={closeEditPopup} />
      )}
    </div>
  );
}
