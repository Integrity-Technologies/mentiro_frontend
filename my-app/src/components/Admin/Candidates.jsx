import React, { useState } from "react";
import { Table, Button, Modal, Form, FormControl } from "react-bootstrap";


const Candidates = () => {
    const [users, setUsers] = useState([
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          phone: "123-456-7890",
          email: "john@example.com",
          dateJoined: "2024-04-15",
        },
        {
          id: 2,
          firstName: "Jane",
          lastName: "Doe",
          phone: "987-654-3210",
          email: "jane@example.com",
          dateJoined: "2024-04-16",
        },
      ]);
    
      const [showAddModal, setShowAddModal] = useState(false);
      const [showEditModal, setShowEditModal] = useState(false);
      const [editUser, setEditUser] = useState(null);
      const [newUser, setNewUser] = useState({
        id: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        dateJoined: "",
      });
    
      const [searchTerm, setSearchTerm] = useState("");
    
      const handleCloseAddModal = () => setShowAddModal(false);
      const handleShowAddModal = () => setShowAddModal(true);
    
      const handleCloseEditModal = () => setShowEditModal(false);
      const handleShowEditModal = (user) => {
        setShowEditModal(true);
        setEditUser(user);
        setNewUser(user); 
      };
    
      const handleAddUser = () => {
        const id = users.length > 0 ? users[users.length - 1].id + 1 : 1; // Generate a unique ID
        const newUserWithId = { ...newUser, id }; // Add ID to the new user object
        setUsers([...users, newUserWithId]);
        setNewUser({
          id: "",
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          dateJoined: "",
        });
        handleCloseAddModal();
      };
    
      const handleEditUser = () => {
        setUsers(users.map((user) => (user.id === editUser.id ? newUser : user)));
        setEditUser(null);
        handleCloseEditModal();
      };
    
      const handleDeleteUser = (id) => {
        setUsers(users.filter((user) => user.id !== id));
      };
    
      const filteredUsers = users.filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`;
        return fullName.toLowerCase().includes(searchTerm.toLowerCase());
      });
    
      return (
        <div>
          <h1>Candidates</h1>
          <Form inline className="mb-3">
            <FormControl
              type="text"
              placeholder="Search by name"
              className="mr-sm-2 w-25 text-left"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>
          <Button variant="success" onClick={handleShowAddModal}>Add Candidate</Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Date Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.dateJoined}</td>
                  <td>
                    <Button variant="primary" size="sm" onClick={() => handleShowEditModal(user)}>Edit</Button>{" "}
                    <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
    
          </Table>
    
          {/* Add User Modal */}
          <Modal show={showAddModal} onHide={handleCloseAddModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" value={newUser.firstName} onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" value={newUser.lastName} onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="formDateJoined">
                  <Form.Label>Date Joined</Form.Label>
                  <Form.Control type="date" value={newUser.dateJoined} onChange={(e) => setNewUser({ ...newUser, dateJoined: e.target.value })} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAddModal} >Close</Button>
              <Button variant="primary" onClick={handleAddUser} className="text-left">Add User</Button>
            </Modal.Footer>
          </Modal>
    
          {/* Edit User Modal */}
          <Modal show={showEditModal} onHide={handleCloseEditModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" value={newUser.firstName} onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" value={newUser.lastName} onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="formDateJoined">
                  <Form.Label>Date Joined</Form.Label>
                  <Form.Control type="date" value={newUser.dateJoined} onChange={(e) => setNewUser({ ...newUser, dateJoined: e.target.value })} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEditModal}>Close</Button>
              <Button variant="primary" onClick={handleEditUser}>Save Changes</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
}

export default Candidates