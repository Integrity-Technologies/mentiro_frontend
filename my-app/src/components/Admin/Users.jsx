import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, FormControl } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { fetchUsers } from '../../actions/userAction'; // Import actions

const Users = () => {
  const { t, i18n } = useTranslation(); // Use useTranslation hook here

  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [newUser, setNewUser] = useState({
    id: "",
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    created_at: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };
    fetchData();
  }, []);


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
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      created_at: "",
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

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>{t("users.title")}</h1>
      <Form inline className="mb-3">
        <FormControl
          type="text"
          placeholder={t("users.searchPlaceholder")}
          className="mr-sm-2 w-25 text-left"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>
      <Button variant="success" onClick={handleShowAddModal}>
        {t("users.addUserButton")}
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>{t("users.tableHeaders.firstName")}</th>
            <th>{t("users.tableHeaders.lastName")}</th>
            <th>{t("users.tableHeaders.phone")}</th>
            <th>{t("users.tableHeaders.email")}</th>
            <th>{t("users.tableHeaders.dateJoined")}</th>
            <th>{t("users.tableHeaders.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.created_at}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleShowEditModal(user)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add User Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t("users.modals.addUser.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>
                {t("users.modals.addUser.formLabels.firstName")}
              </Form.Label>
              <Form.Control
                type="text"
                value={newUser.firstName}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>
                {t("users.modals.addUser.formLabels.lastName")}
              </Form.Label>
              <Form.Control
                type="text"
                value={newUser.lastName}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>
                {t("users.modals.addUser.formLabels.phone")}
              </Form.Label>
              <Form.Control
                type="text"
                value={newUser.phone}
                onChange={(e) =>
                  setNewUser({ ...newUser, phone: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>
                {t("users.modals.addUser.formLabels.email")}
              </Form.Label>
              <Form.Control
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formDateJoined">
              <Form.Label>
                {t("users.modals.addUser.formLabels.dateJoined")}
              </Form.Label>
              <Form.Control
                type="date"
                value={newUser.dateJoined}
                onChange={(e) =>
                  setNewUser({ ...newUser, dateJoined: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            {t("users.modals.addUser.buttons.close")}
          </Button>
          <Button
            variant="primary"
            onClick={handleAddUser}
            className="text-left"
          >
            {t("users.modals.addUser.buttons.addUser")}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit User Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t("users.modals.editUser.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>
                {t("users.modals.editUser.formLabels.firstName")}
              </Form.Label>
              <Form.Control
                type="text"
                value={newUser.firstName}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>
                {t("users.modals.editUser.formLabels.lastName")}
              </Form.Label>
              <Form.Control
                type="text"
                value={newUser.lastName}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>
                {t("users.modals.editUser.formLabels.phone")}
              </Form.Label>
              <Form.Control
                type="text"
                value={newUser.phone}
                onChange={(e) =>
                  setNewUser({ ...newUser, phone: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>
                {t("users.modals.editUser.formLabels.email")}
              </Form.Label>
              <Form.Control
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formDateJoined">
              <Form.Label>
                {t("users.modals.editUser.formLabels.dateJoined")}
              </Form.Label>
              <Form.Control
                type="date"
                value={newUser.dateJoined}
                onChange={(e) =>
                  setNewUser({ ...newUser, dateJoined: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            {t("users.modals.editUser.buttons.close")}
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            {t("users.modals.editUser.buttons.saveChanges")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;
