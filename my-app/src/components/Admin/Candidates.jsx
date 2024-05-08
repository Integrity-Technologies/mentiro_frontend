import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCandidates,
  addCandidate,
  editCandidate,
  deleteCandidate,
} from "../../actions/candidateAction";
import TablePagination from "./TablePagination"; // Import your TablePagination component

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

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [candidateIdToDelete, setCandidateIdToDelete] = useState(null);

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

  const handleShowDeleteModal = (candidateId) => {
    setCandidateIdToDelete(candidateId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

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
    if (
      !newCandidateData.email.trim() ||
      !validateEmail(newCandidateData.email.trim())
    ) {
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
    const duplicateEmail = candidates.some(
      (user) => user.email === newCandidateData.email
    );
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
    setShowDeleteModal(false)
    await dispatch(getAllCandidates());
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const fullName = `${candidate.first_name} ${candidate.last_name}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of users per page
  // Pagination logic
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCandidates = filteredCandidates.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const handlePageChange = (page) => setCurrentPage(page);
  
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
      <h1 className="text-2xl font-bold mb-4">Candidates</h1>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by name"
          className="border border-gray-300 rounded px-3 py-1 w-1/4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleShowAddModal}
      >
        Add Candidate
      </button>
      <table className="border-collapse w-full mb-4">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">ID</th>
            <th className="border border-gray-400 px-4 py-2">First Name</th>
            <th className="border border-gray-400 px-4 py-2">Last Name</th>
            <th className="border border-gray-400 px-4 py-2">Email</th>
            <th className="border border-gray-400 px-4 py-2">Date Joined</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCandidates.map((candidate) => (
            <tr key={candidate.id}>
              <td className="border border-gray-400 px-4 py-2">{candidate.id}</td>
              <td className="border border-gray-400 px-4 py-2">{candidate.first_name}</td>
              <td className="border border-gray-400 px-4 py-2">{candidate.last_name}</td>
              <td className="border border-gray-400 px-4 py-2">{candidate.email}</td>
              <td className="border border-gray-400 px-4 py-2">{candidate.created_at}</td>
              <td className="border border-gray-400 px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2"
                  onClick={() => handleShowEditModal(candidate)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleDeleteCandidate(candidate.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TablePagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
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

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Candidate</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this candidate?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDeleteCandidate(candidateIdToDelete)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Candidates;
