import axios from "axios";

// userAction.jsx

export const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/Allusers');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };
  
  
  export const addUser = async (newUser) => {
    try {
      const response = await fetch('your_backend_api_url/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding user:', error);
      return null;
    }
  };
  
  export const editUser = async (userId, updatedUser) => {
    try {
      const response = await fetch(`your_backend_api_url/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error editing user:', error);
      return null;
    }
  };
  
  export const deleteUser = async (userId) => {
    try {
      const response = await fetch(`your_backend_api_url/users/${userId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting user:', error);
      return null;
    }
  };
  