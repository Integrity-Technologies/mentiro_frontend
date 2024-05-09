import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { getToken } from "../../actions/authActions";
import TestSelection from "./TestSelection";
import {
  getAllAssessments,
  addAssessment,
  editAssessment,
  deleteAssessment,
} from "../../actions/AssesmentAction";

const Assessment = () => {
  const [showAddModal, setShowAddModal] = useState(false); // State for controlling add modal visibility
  const [showEditModal, setShowEditModal] = useState(false); // State for controlling edit modal visibility
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for controlling delete modal visibility
  const [assessmentName, setAssessmentName] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showTestSelection, setShowTestSelection] = useState(false);


  const assessments = useSelector((state) => state.assessment.assessments || []);
  const token = useSelector(getToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAssessments());
  }, [dispatch]);

  const handleAssessmentNameChange = (e) => {
    setAssessmentName(e.target.value);
  };

  const handleAddAssessment = () => {
    if (assessmentName.trim() !== "") {
      dispatch(addAssessment({ assessment_name: assessmentName.trim() }));
      setAssessmentName("");
      setShowAddModal(false); // Close add modal after adding assessment
    }
  };

  const handleDeleteAssessment = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleEditAssessment = (id, name) => {
    setEditId(id);
    setEditedName(name);
    setShowEditModal(true);
  };

  const handleEditSave = () => {
    if (editedName.trim() !== "") {
      dispatch(editAssessment(editId, { assessment_name: editedName.trim() }));
      setShowEditModal(false);
    }
  };

  const handleConfirmDelete = () => {
    dispatch(deleteAssessment(deleteId));
    setShowDeleteModal(false);
  };

  const handleNextButtonClick = () => {
    setShowTestSelection(true);
  };

  const handleBackButtonClick = () => {
    setShowTestSelection(false);
  };


  return (
    <div>
      {/* Add Assessment Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Assessment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formAssessmentName">
              <Form.Label>Assessment Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter assessment name"
                value={assessmentName}
                onChange={handleAssessmentNameChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddAssessment}>
            Add Assessment
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Assessment Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Assessment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formAssessmentName">
              <Form.Label>Assessment Name</Form.Label>
              <Form.Control
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Assessment Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assessment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this assessment?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        <h2>Create New Assessment</h2>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          Add Assessment
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Assessment Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {assessments?.assessments?.length > 0 ? (
            assessments?.assessments.map((assessment) => (
              <tr key={assessment.id}>
                <td>{assessment.id}</td>
                <td>{assessment.assessment_name}</td>
                <td>
                  <Button
                    variant="primary"
                    className="mr-2"
                    onClick={() => handleEditAssessment(assessment.id, assessment.assessment_name)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteAssessment(assessment.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No assessments found</td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="text-center mb-2">
        <Button
          variant="outline-success"
          size="lg"
          onClick={handleNextButtonClick}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Assessment;
