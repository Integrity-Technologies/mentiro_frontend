import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllCandidates, addCandidate, editCandidate, deleteCandidate } from "../../actions/candidateAction";

const Candidates = () => {
  const dispatch = useDispatch();
  const candidates = useSelector((state) => state.candidates.candidates);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCandidateData, setEditCandidateData] = useState(null);
  const [newCandidateData, setNewCandidateData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    created_at: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAllCandidates());
  }, [dispatch]);

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = (candidate) => {
    setShowEditModal(true);
    setEditCandidateData(candidate);
    setNewCandidateData(candidate); 
  };

  const handleAddCandidate = () => {
    dispatch(addCandidate(newCandidateData)).then(() => {
      setNewCandidateData({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        password: "",
        created_at: "",
      });
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

  const filteredCandidates = candidates.filter(candidate => {
    const fullName = `${candidate.firstName} ${candidate.lastName}`;
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
            <th>password</th>
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
              <td>{candidate.phone}</td>
              <td>{candidate.email}</td>
              <td>{candidate.password}</td>
              <td>{candidate.created_at}</td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleShowEditModal(candidate)}>Edit</Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDeleteCandidate(candidate.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Add Candidate Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Candidate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" value={newCandidateData.first_name} onChange={(e) => setNewCandidateData({ ...newCandidateData, first_name: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" value={newCandidateData.last_name} onChange={(e) => setNewCandidateData({ ...newCandidateData, last_name: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" value={newCandidateData.phone} onChange={(e) => setNewCandidateData({ ...newCandidateData, phone: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={newCandidateData.email} onChange={(e) => setNewCandidateData({ ...newCandidateData, email: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={newCandidateData.password} onChange={(e) => setNewCandidateData({ ...newCandidateData, password: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formDateJoined">
              <Form.Label>Date Joined</Form.Label>
              <Form.Control type="date" value={newCandidateData.created_at} onChange={(e) => setNewCandidateData({ ...newCandidateData, dateJoined: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal} >Close</Button>
          <Button variant="primary" onClick={handleAddCandidate} className="text-left">Add Candidate</Button>
        </Modal.Footer>
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
              <Form.Control type="text" value={newCandidateData.first_name} onChange={(e) => setNewCandidateData({ ...newCandidateData, first_name: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" value={newCandidateData.last_name} onChange={(e) => setNewCandidateData({ ...newCandidateData, last_name: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" value={newCandidateData.phone} onChange={(e) => setNewCandidateData({ ...newCandidateData, phone: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={newCandidateData.email} onChange={(e) => setNewCandidateData({ ...newCandidateData, email: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={newCandidateData.password} onChange={(e) => setNewCandidateData({ ...newCandidateData, password: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formDateJoined">
              <Form.Label>Date Joined</Form.Label>
              <Form.Control type="date" value={newCandidateData.dateJoined} onChange={(e) => setNewCandidateData({ ...newCandidateData, dateJoined: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>Close</Button>
          <Button variant="primary" onClick={handleEditCandidate}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Candidates;
