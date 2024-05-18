import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { getToken } from "../../actions/authActions";
import TestSelection from "./TestSelection";
import {
  getAllAssessments,
  editAssessment,
  deleteAssessment,
} from "../../actions/AssesmentAction";
import PreviewExistingAssessment from "./PreviewExistingAssesment";

const Assessment = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assessmentName, setAssessmentName] = useState("");
  const [assessmentNameError, setAssessmentNameError] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showTestSelection, setShowTestSelection] = useState(false);
  const [newAssessment, setNewAssessment] = useState(null);
  const [nextButton, setNextButton] = useState(false);
  const [uniqueLink, setUniqueLink] = useState(""); // State for unique link
  const [currentView, setCurrentView] = useState("list"); // State for tracking the current view

  const assessments = useSelector((state) => state.assessment.assessments || []);
  const token = useSelector(getToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAssessments());
  }, [dispatch]);

  const handleAddAssessment = () => {
    if (assessmentName.trim() === "") {
      setAssessmentNameError("Assessment name is required.");
      return;
    }
    
    console.log("🚀 ~ handleAddAssessment ~ assessments:", assessments)
    const isDuplicate = assessments?.assessments?.some(
      (assessment) => assessment.assessment_name.toLowerCase() === assessmentName.trim().toLowerCase()
    );

    if (isDuplicate) {
      setAssessmentNameError("Assessment name already exists.");
      return;
    }

    // if (assessmentName.trim() !== "") {
    const newAssessment = {
      id: Object.keys(assessments).length + 1,
      assessment_name: assessmentName.trim(),
    };
    localStorage.setItem("assessments", newAssessment.assessment_name);
    setNewAssessment([...Object.values(assessments), newAssessment]);
    setNextButton(true);
    setAssessmentName("");
    setShowAddModal(false);
    // }
  };

  const handleAssessmentNameChange = (e) => {
    setAssessmentName(e.target.value);
    if (e.target.value.trim() !== "") {
      setAssessmentNameError("");
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

  const handleEditSave = async () => {
    if (editedName.trim() !== "") {
      await dispatch(
        editAssessment(editId, { assessment_name: editedName.trim() })
      );

      await dispatch(getAllAssessments());

      setShowEditModal(false);
    }
  };

  const handleConfirmDelete = async () => {
    await dispatch(deleteAssessment(deleteId));

    await dispatch(getAllAssessments());
    setShowDeleteModal(false);
  };

  const handleNextButtonClick = () => {
    setShowTestSelection(true);
  };

  const handleBackButtonClick = () => {
    setShowTestSelection(false);
  };

  const handlePreview = (uniqueLink) => {
    setUniqueLink(uniqueLink);
    localStorage.setItem("uniqueLink", uniqueLink);
    setCurrentView("preview"); // Set the current view to "preview"
  };

  return (
    <div className="container mx-auto p-4">
      {showTestSelection ? (
        <TestSelection
          assessments={assessments}
          handleBackButtonClick={handleBackButtonClick}
        />
      ) : (
        <div>
          <div className="mb-4">
            <h2 className="text-3xl font-bold mb-6">Create New Assessment</h2>
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Assessment
            </Button>
          </div>
          <h2 className="text-3xl font-bold mb-6 mt-5">My Assessments</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">
                  Assessment Name
                </th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {assessments?.assessments?.length > 0 ? (
                assessments?.assessments?.map((assessment) => (
                  <tr key={assessment.id} className="bg-white">
                    <td className="border border-gray-300 px-4 py-2">
                      {assessment.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {assessment.assessment_name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Preview
                      </button>
                      <button
                        onClick={() => handleDeleteAssessment(assessment.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white">
                  <td
                    colSpan="3"
                    className="border border-gray-300 px-4 py-2 text-center"
                  >
                    No assessments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {nextButton && (
            <div className="text-center mt-4">
              <button
                onClick={handleNextButtonClick}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Assessment</Modal.Title>
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
                isInvalid={!!assessmentNameError}
              />
              <Form.Control.Feedback type="invalid">
                {assessmentNameError}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddAssessment}>
            Create Assessment
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
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSave}>
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
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      
      
      {currentView === "preview" && <PreviewExistingAssessment />}
    </div>
  );
};

export default Assessment;
