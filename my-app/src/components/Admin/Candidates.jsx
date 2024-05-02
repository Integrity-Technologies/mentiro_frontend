import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCandidates,
  addCandidate,
  editCandidate,
  deleteCandidate,
} from "../../actions/candidateAction";

const Candidates = () => {
  const dispatch = useDispatch();
  const candidates = useSelector((state) => state.candidates.candidates);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCandidateData, setEditCandidateData] = useState(null);
  const [newCandidateData, setNewCandidateData] = useState({
    first_name: "",
    last_name: "",
    // phone: "",
    email: "",
    // password: "",
    created_at: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const validateEmail = (email) => {
    // Regular expression for email validation
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };


  useEffect(() => {
    dispatch(getAllCandidates());
  }, [dispatch]);

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    resetForm();
  };

  const handleShowAddModal = () => setShowAddModal(true);

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    resetForm();
  };

  const handleShowEditModal = (candidate) => {
    setShowEditModal(true);
    setEditCandidateData(candidate);
    setNewCandidateData(candidate);
  };

  const handleAddCandidate = async () => {
    let hasError = false;

    if (!newCandidateData.first_name.trim()) {
      setFirstNameError("First name is required");
      hasError = true;
    } else {
      setFirstNameError("");
    }
    if (!newCandidateData.last_name.trim()) {
      setLastNameError("Last name is required");
      hasError = true;
    } else {
      setLastNameError("");
    }
    // if (!newCandidateData.phone.trim()) {
    //   setPhoneError("Phone number is required");
    //   hasError = true;
    // } else {
    //   setPhoneError("");
    // }
    if (!newCandidateData.email.trim() || !validateEmail(newCandidateData.email.trim())) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    } else {
      setEmailError("");
    }


    // if (!newCandidateData.password.trim()) {
    //   setPasswordError("Password is required");
    //   hasError = true;
    // } else {
    //   setPasswordError("");
    // }

    if (hasError) {
      return;
    }
    const duplicateEmail = candidates.some((user) => user.email === newCandidateData.email);
    if (duplicateEmail) {
      setEmailError("User with this email already registered");
      return;
    }

    dispatch(addCandidate(newCandidateData)).then(() => {
      resetForm();

      dispatch(getAllCandidates());
      handleCloseAddModal();
    });
  };

  const handleEditCandidate = () => {
    dispatch(editCandidate(editCandidateData.id, newCandidateData)).then(() => {
      dispatch(getAllCandidates());
      handleCloseEditModal();
    });
  };

  const handleDeleteCandidate = async (id) => {
    await dispatch(deleteCandidate(id));
    await dispatch(getAllCandidates());
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const fullName = `${candidate.first_name} ${candidate.last_name}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const resetForm = () => {
    setNewCandidateData({
      first_name: "",
      last_name: "",
      // phone: "",
      email: "",
      // password: "",
      created_at: "",
    });
    setFirstNameError("");
    setLastNameError("");
    setPhoneError("");
    setEmailError("");
    setPasswordError("");
  };

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
      <Button variant="success" onClick={handleShowAddModal}>
        Add Candidate
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            {/* <th>Phone</th> */}
            <th>Email</th>
            {/* <th>password</th> */}
            <th>Date Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>{candidate.id}</td>
              <td>{candidate.first_name}</td>
              <td>{candidate.last_name}</td>
              {/* <td>{candidate.phone}</td> */}
              <td>{candidate.email}</td>
              {/* <td>{candidate.password}</td> */}
              <td>{candidate.created_at}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleShowEditModal(candidate)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteCandidate(candidate.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Candidate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={newCandidateData.first_name}
                onChange={(e) => {
                  setNewCandidateData({
                    ...newCandidateData,
                    first_name: e.target.value,
                  });
                  setFirstNameError("");
                }}
              />
              {firstNameError && (
                <div className="text-danger">{firstNameError}</div>
              )}
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={newCandidateData.last_name}
                onChange={(e) => {
                  setNewCandidateData({
                    ...newCandidateData,
                    last_name: e.target.value,
                  });
                  setLastNameError("");
                }}
              />
              {lastNameError && (
                <div className="text-danger">{lastNameError}</div>
              )}
            </Form.Group>
            {/* <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={newCandidateData.phone}
                onChange={(e) => {
                  setNewCandidateData({
                    ...newCandidateData,
                    phone: e.target.value,
                  });
                  setPhoneError("");
                }}
              />
              {phoneError && <div className="text-danger">{phoneError}</div>}
            </Form.Group> */}
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newCandidateData.email}
                onChange={(e) => {
                  setNewCandidateData({
                    ...newCandidateData,
                    email: e.target.value,
                  });
                  setEmailError("");
                }}
              />
              {emailError && <div className="text-danger">{emailError}</div>}
            </Form.Group>
            {/* <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={newCandidateData.password}
                onChange={(e) => {
                  setNewCandidateData({
                    ...newCandidateData,
                    password: e.target.value,
                  });
                  setPasswordError("");
                }}
              />
              {passwordError && (
                <div className="text-danger">{passwordError}</div>
              )}
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleAddCandidate}
            className="text-left"
          >
            Add Candidate
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Candidate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={newCandidateData.first_name}
                onChange={(e) =>
                  setNewCandidateData({
                    ...newCandidateData,
                    first_name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={newCandidateData.last_name}
                onChange={(e) =>
                  setNewCandidateData({
                    ...newCandidateData,
                    last_name: e.target.value,
                  })
                }
              />
            </Form.Group>
            {/* <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={newCandidateData.phone}
                onChange={(e) =>
                  setNewCandidateData({
                    ...newCandidateData,
                    phone: e.target.value,
                  })
                }
              />
            </Form.Group> */}
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newCandidateData.email}
                onChange={(e) =>
                  setNewCandidateData({
                    ...newCandidateData,
                    email: e.target.value,
                  })
                }
              />
            </Form.Group>
            {/* <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={newCandidateData.password}
                onChange={(e) =>
                  setNewCandidateData({
                    ...newCandidateData,
                    password: e.target.value,
                  })
                }
              />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditCandidate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Candidates;
