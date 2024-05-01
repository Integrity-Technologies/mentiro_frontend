import React, { useState, useEffect } from "react";
import { Table, Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { fetchResults } from "../../actions/resultAction";


const ViewTestResult = () => {
  const dispatch = useDispatch();
  const { results, error } = useSelector((state) => state.results);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchResults()); // Dispatch the fetchResults action when component mounts
  }, [dispatch]);




  // const filteredCandidates = results.filter((result) => {
  //   const fullName = `${candidate.candidate_id} ${test.testDescription}`;
  //   return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  // });


  // Check if results is an array before filtering
  // const filteredCandidates = Array.isArray(results) ? 
  //   results.filter((candidate) => 
  //     candidate.candidateName.toLowerCase().includes(searchTerm.toLowerCase())
  //   ) : [];

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

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
          {results.map((candidate) => (
            <tr key={candidate.id}>
              <td>{candidate.id}</td>
              <td>{candidate.candidate_name}</td>
              <td>{candidate.assessment_name}</td>
              <td>{candidate.test_name}</td>
              <td>{candidate.score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewTestResult;
