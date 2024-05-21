import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { getToken } from "../../actions/authActions";
import TestSelection from "./TestSelection";
import { RiAddFill } from "react-icons/ri";
import {FaClipboardList} from 'react-icons/fa'
import { FaEye, FaTrash } from "react-icons/fa"; // Import the icons
import { MdAssessment } from "react-icons/md"

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

  const assessments = useSelector(
    (state) => state.assessment.assessments || []
  );
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

    console.log("🚀 ~ handleAddAssessment ~ assessments:", assessments);
    const isDuplicate = assessments?.assessments?.some(
      (assessment) =>
        assessment.assessment_name.toLowerCase() ===
        assessmentName.trim().toLowerCase()
    );

    if (isDuplicate) {
      setAssessmentNameError("Assessment name already exists.");
      return;
    }

    const newAssessment = {
      id: Object.keys(assessments).length + 1,
      assessment_name: assessmentName.trim(),
    };
    localStorage.setItem("assessments", newAssessment.assessment_name);
    setNewAssessment([...Object.values(assessments), newAssessment]);
    setNextButton(true);
    setAssessmentName("");
    setShowAddModal(false);
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
        {currentView === "list" && (
          <>
            {showTestSelection ? (
              <TestSelection
                assessments={assessments}
                handleBackButtonClick={handleBackButtonClick}
              />
            ) : (
              
              <div className="bg-white shadow-md rounded-lg p-6 min-h-screen">


                <div className="flex items-center mb-4">
                  <FaClipboardList className="mr-2" size={22} />
                  <h2 className="text-xl font-bold">
                    Create New Assessment
                  </h2>
                  </div>
                  <hr className="mb-6 border-gray-400" />
                  <Button
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    <RiAddFill className="inline-block mr-1" />
                    Create Assessment{" "}
                    {/* Adding the add icon inline with the button text */}
                  </Button>
                {assessments?.assessments?.length > 0 && (
                  <>
                  
                  <div className="flex items-center mb-4 mt-10">
                  <MdAssessment  className="mr-2" size={22} />
                    <h2 className="text-xl font-bold">
                      My Assessments
                    </h2>
                    </div>
                    <hr className="mb-6 border-gray-400" />
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border border-gray-300 px-4 py-2 font-bold">
                            #
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            Assessment Name
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                      {assessments?.assessments?.length > 0 ? (
                    assessments.assessments.map((assessment) => (
                      <tr key={assessment.id} className="hover:bg-gray-100 cursor-pointer">
                        <td className="border border-gray-300 px-4 py-2">
                          {assessment.id}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {assessment.assessment_name}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <button
                            className="text-blue-500 font-bold rounded inline-flex items-center"
                            onClick={() => handlePreview(assessment.uniquelink)} // Call handlePreview
                          >
                            <FaEye className="mr-2" size={22}/>
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteAssessment(assessment.id)
                            }
                            className="text-red-500 font-bold rounded ml-2 inline-flex items-center"
                          >
                            <FaTrash className="mr-2" size={20}/>
                          </button>
                        </td>
                      </tr>
                    ))
                  )  : (
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
                  </>
                )}
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
        <Modal.Title className="d-flex align-items-center">
          <FaClipboardList className="me-2" /> {/* Add some margin to the right */}
          Create Assessment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="relative">
          <input
            type="text"
            id="formAssessmentName"
            placeholder=" "
            className={`block px-2 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${assessmentNameError ? 'border-red-500' : ''}`}
            value={assessmentName}
            onChange={handleAssessmentNameChange}
          />
          <label
            htmlFor="formAssessmentName"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Assessment Name
          </label>
          {assessmentNameError && <p className="mt-2 text-sm text-red-600">{assessmentNameError}</p>}
        </div>
      </Modal.Body>
      <Modal.Footer>
        
        <Button variant="primary" onClick={handleAddAssessment}>
          Create
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
                <Button
                  variant="secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleEditSave}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal
              show={showDeleteModal}
              onHide={() => setShowDeleteModal(false)}
            >
              <Modal.Header closeButton>
              <Modal.Title className="d-flex align-items-center">
          <FaTrash className="me-2 text-red-500 font-bold" size={20} /> {/* Add some margin to the right */}
          Delete Assessment
        </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Are you sure you want to delete this assessment?</p>
              </Modal.Body>
              <Modal.Footer>
                
                <Button variant="danger" onClick={handleConfirmDelete}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
            </>
        )}
        {currentView === "preview" && <PreviewExistingAssessment />}
    </div>
  );
};

export default Assessment;
