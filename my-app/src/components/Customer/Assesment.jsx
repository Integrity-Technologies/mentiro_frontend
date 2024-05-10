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
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
      setShowAddModal(false);
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
    <div className="container mx-auto">
      {showTestSelection ? (
        <TestSelection
          assessments={assessments}
          handleBackButtonClick={handleBackButtonClick}
        />
      ) : (
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-bold">Create New Assessment</h2>
            <Button onClick={() => setShowAddModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add Assessment
            </Button>
          </div>

          <table className="table-auto w-100">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Assessment Name</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {assessments?.assessments?.length > 0 ? (
                assessments?.assessments.map((assessment) => (
                  <tr key={assessment.id}>
                    <td className="border px-4 py-2">{assessment.id}</td>
                    <td className="border px-4 py-2">{assessment.assessment_name}</td>
                    <td className="border px-4 py-2">
                      <button variant="primary" onClick={() => handleEditAssessment(assessment.id, assessment.assessment_name)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Edit
                      </button>
                      <button variant="danger" onClick={() => handleDeleteAssessment(assessment.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="border px-4 py-2">No assessments found</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="text-center mb-2">
            <button variant="outline-success" onClick={handleNextButtonClick} className="border-2 mt-5 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold py-2 px-4 rounded">
              Next
            </button>
          </div>
        </div>
      )}

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Assessment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAssessmentName">
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
          <Button variant="secondary" onClick={() => setShowAddModal(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddAssessment} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Assessment
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Assessment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAssessmentName">
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
          <Button variant="secondary" onClick={() => setShowEditModal(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assessment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this assessment?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Assessment;