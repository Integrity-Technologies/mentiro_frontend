import React, { useState } from "react";
import { Table, Form, FormControl } from "react-bootstrap";

const ViewTestResult = () => {
  const [candidate] = useState([
    {
      id: 1,
      candidateName: "John Doe",
      assessmentName: "Assessment 1",
      testName: "Test 1",
      score: 85,
    },
    {
      id: 2,
      candidateName: "Jane Doe",
      assessmentName: "Assessment 2",
      testName: "Test 2",
      score: 92,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCandidates = candidate.filter(candidate => {
    return candidate.candidateName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>Candidates Result</h1>
      <Form inline className="mb-3">
        <FormControl
          type="text"
          placeholder="Search by candidate name"
          className="mr-sm-2 w-25"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Candidate Name</th>
            <th>Assessment Name</th>
            <th>Test Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>{candidate.id}</td>
              <td>{candidate.candidateName}</td>
              <td>{candidate.assessmentName}</td>
              <td>{candidate.testName}</td>
              <td>{candidate.score} %</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewTestResult;