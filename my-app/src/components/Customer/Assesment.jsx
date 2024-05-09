import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { getToken } from "../../actions/authActions"; // Import getToken function
import TestSelection from "./TestSelection";
import {
  getAllAssessments,
  addAssessment,
  editAssessment,
  deleteAssessment,
} from "../../actions/AssesmentAction";

const Assessment = () => {
  const [assessmentName, setAssessmentName] = useState("");
  const [showTestSelection, setShowTestSelection] = useState(false);
  
  // Set assessments default state to an empty array to prevent errors
  const assessments = useSelector((state) => state.assessment.assessments || []);
  const token = useSelector(getToken); // Get token from Redux store
  const dispatch = useDispatch();
  console.log("🚀 ~ Assessment ~ assessments:", assessments)

  useEffect(() => {
    dispatch(getAllAssessments());
  }, [dispatch]);

  const handleAssessmentNameChange = (e) => {
    setAssessmentName(e.target.value);
  };

  const handleAddAssessment = () => {
    if (assessmentName.trim() !== "") {
      dispatch(addAssessment({ assessment_name: assessmentName.trim() }));
      console.log(token); // Console log the token
      setAssessmentName("");
    }
  };

  const handleDeleteAssessment = (id) => {
    dispatch(deleteAssessment(id));
  };

  const handleEditAssessment = (id) => {
    const editedName = prompt("Enter new name for assessment:");
    if (editedName !== null && editedName.trim() !== "") {
      dispatch(editAssessment(id, { assessment_name: editedName.trim() }));
    }
  };

  const handleNextButtonClick = () => {
    setShowTestSelection(true);
  };

  const handleBackButtonClick = () => {
    setShowTestSelection(false);
  };

  return (
    <div>
      {showTestSelection ? (
        <TestSelection
          assessments={assessments}
          handleBackButtonClick={handleBackButtonClick}
        />
      ) : (
        <div>
          <h2>Create New Assessment</h2>

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

            <Button variant="primary" onClick={handleAddAssessment}>
              Add Assessment
            </Button>
          </Form>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Assessment Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
  {assessments.length > 0 ? (
    assessments.map((assessment) => (
      <tr key={assessment.id}>
        <td>{assessment.id}</td>
        <td>{assessment.assessment_name}</td>
        <td>
          <Button
            variant="primary"
            onClick={() => handleEditAssessment(assessment.id)} // Change _id to id
          >
            Edit
          </Button>{" "}
          <Button
            variant="danger"
            onClick={() => handleDeleteAssessment(assessment.id)} // Change _id to id
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
      )}
    </div>
  );
};

export default Assessment;