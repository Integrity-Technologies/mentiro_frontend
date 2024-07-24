import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
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
  const error = useSelector((state) => state.candidates.error); // Get error from state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCandidateData, setEditCandidateData] = useState(null);
  const [newCandidateData, setNewCandidateData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    created_at: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");

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
    if (
      !newCandidateData.email.trim() ||
      !validateEmail(newCandidateData.email.trim())
    ) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    } else {
      setEmailError("");
    }

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
    setShowDeleteModal(false);
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
      email: "",
      created_at: "",
    });
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
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
          {currentCandidates.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center bg-gray-200 p-3">
                Candidates not found
              </td>
            </tr>
          ) : (
            currentCandidates.map((candidate) => (
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
                    onClick={() => handleShowDeleteModal(candidate.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {/* Add Candidate Modal */}
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
                placeholder="Enter first name"
                value={newCandidateData.first_name}
                onChange={(e) =>
                  setNewCandidateData({
                    ...newCandidateData,
                    first_name: e.target.value,
                  })
                }
              />
              {firstNameError && (
                <Form.Text className="text-danger">{firstNameError}</Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={newCandidateData.last_name}
                onChange={(e) =>
                  setNewCandidateData({
                    ...newCandidateData,
                    last_name: e.target.value,
                  })
                }
              />
              {lastNameError && (
                <Form.Text className="text-danger">{lastNameError}</Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={newCandidateData.email}
                onChange={(e) =>
                  setNewCandidateData({
                    ...newCandidateData,
                    email: e.target.value,
                  })
                }
              />
              {emailError && (
                <Form.Text className="text-danger">{emailError}</Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Date Joined</Form.Label>
              <Form.Control
                type="date"
                placeholder="Select date"
                value={newCandidateData.created_at}
                onChange={(e) =>
                  setNewCandidateData({
                    ...newCandidateData,
                    created_at: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddCandidate}>
              Add Candidate
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Edit Candidate Modal */}
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
                placeholder="Enter first name"
                value={newCandidateData.first_name}
                onChange={(e) =>
                  setNewCandidateData({
                    ...newCandidateData,
                    first_name: e.target.value,
                  })
                }
              />
              {firstNameError && (
                <Form.Text className="text-danger">{firstNameError}</Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={newCandidateData.last_name}
                onChange={(e) =>
                  setNewCandidateData({
                    ...newCandidateData,
                    last_name: e.target.value,
                  })
                }
              />
              {lastNameError && (
                <Form.Text className="text-danger">{lastNameError}</Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={newCandidateData.email}
                onChange={(e) =>
                  setNewCandidateData({
                    ...newCandidateData,
                    email: e.target.value,
                  })
                }
              />
              {emailError && (
                <Form.Text className="text-danger">{emailError}</Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Date Joined</Form.Label>
              <Form.Control
                type="date"
                placeholder="Select date"
                value={newCandidateData.created_at}
                onChange={(e) =>
                  setNewCandidateData({
                    ...newCandidateData,
                    created_at: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Button variant="primary" onClick={handleEditCandidate}>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Delete Candidate Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Candidate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this candidate?
        </Modal.Body>
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
      {/* {error && <div className="alert alert-danger">{error}</div>} */}
    </div>
  );
};

export default Candidates;
