import React, { useState, useEffect } from "react";
import { Table, Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { fetchResults } from "../../actions/resultAction";
import TablePagination from "./TablePagination";

const ViewTestResult = () => {
  const dispatch = useDispatch();
  const { results, error } = useSelector((state) => state.results);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchResults()); // Dispatch the fetchResults action when component mounts
  }, [dispatch]);

  // Filter candidates based on search term
  const filteredCandidates = results.filter((candidate) =>
    candidate.candidate_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of users per page
  // Pagination logic
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCandidates = filteredCandidates.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => setCurrentPage(page);

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
          {currentCandidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>{candidate.id}</td>
              <td>{candidate.candidate_name}</td>
              <td>{candidate.assessment_name}</td>
              <td>{candidate.test_name}</td>
              <td>{candidate.score}--</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <TablePagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
};

export default ViewTestResult;
