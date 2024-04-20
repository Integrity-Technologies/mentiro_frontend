import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import TestSelection from "./TestSelection";

const Assessment = () => {
  const [assessmentName, setAssessmentName] = useState("");
  const [assessments, setAssessments] = useState([]);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState(null);
  const [showTestSelection, setShowTestSelection] = useState(false); // State to manage test selection visibility

  const handleAssessmentNameChange = (e) => {
    setAssessmentName(e.target.value);
  };

  const addAssessment = () => {
    if (assessmentName.trim() !== "") {
      const newAssessment = {
        id: assessments.length + 1,
        name: assessmentName.trim(),
      };
      setAssessments([...assessments, newAssessment]);
      setAssessmentName("");
    }
  };

  const deleteAssessment = (id) => {
    const updatedAssessments = assessments.filter(
      (assessment) => assessment.id !== id
    );
    setAssessments(updatedAssessments);
  };

  const editAssessment = (id) => {
    const selectedAssessment = assessments.find(
      (assessment) => assessment.id === id
    );
    if (selectedAssessment) {
      setSelectedAssessmentId(id);
      setAssessmentName(selectedAssessment.name);
    }
  };

  const updateAssessment = () => {
    if (assessmentName.trim() !== "") {
      const updatedAssessments = assessments.map((assessment) => {
        if (assessment.id === selectedAssessmentId) {
          return { ...assessment, name: assessmentName.trim() };
        }
        return assessment;
      });
      setAssessments(updatedAssessments);
      setAssessmentName("");
      setSelectedAssessmentId(null);
    }
  };

  const handleNextButtonClick = () => {
    setShowTestSelection(true); // Show test selection when next button is clicked
  };

  const handleBackButtonClick = () => {
    setShowTestSelection(false); // Hide test selection when back button is clicked
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

            <Button variant="primary" onClick={addAssessment}>
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
              {assessments.map((assessment) => (
                <tr key={assessment.id}>
                  <td>{assessment.id}</td>
                  <td>{assessment.name}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => editAssessment(assessment.id)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => deleteAssessment(assessment.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
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
