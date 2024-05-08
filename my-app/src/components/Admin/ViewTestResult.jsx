import React, { useState, useEffect } from "react";
import { Table, Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { fetchResults } from "../../actions/resultAction";
import TablePagination from "./TablePagination";

  // Mock result data for demonstration
  const mockResult = [
    {
      id: 1,
      candidate_name: "faizan",
      assessments: [
        {
          name: "testing assessment",
          tests: [
            {
              name: "Result testing 2",
              questions: [
                {
                  answer_id: 9,
                  is_correct: 1,
                  question_id: 5,
                },
              ],
              score: 1,
            },
            {
              name: "Result testing",
              questions: [
                {
                  answer_id: 9,
                  is_correct: 1,
                  question_id: 5,
                },
                {
                  answer_id: 9,
                  is_correct: 1,
                  question_id: 5,
                },
                {
                  answer_id: 9,
                  is_correct: 1,
                  question_id: 5,
                },
              ],
              score: 3,
            },
          ],
        },
        {
          name: "testing assessment 1",
          tests: [
            {
              name: "Demo test upgraded final",
              questions: [
                {
                  answer_id: 9,
                  is_correct: 1,
                  question_id: 5,
                },
              ],
              score: 1,
            },
          ],
        },
      ],
    },
  ];

const ViewTestResult = () => {
  const dispatch = useDispatch();
  const { results, error } = useSelector((state) => state.results);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchResults()); // Dispatch the fetchResults action when component mounts
  }, [dispatch]);

  // Filter results based on search term
  const filteredResults = results.filter((candidate) =>
    candidate.candidate_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of users per page
  // Pagination logic
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = filteredResults.slice(indexOfFirstItem, indexOfLastItem);

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
          {currentResults.map((candidate) =>
            candidate.assessments.map((assessment, index) =>
              assessment.tests.map((test, index2) => (
                <tr key={`${candidate.id}-${index}-${index2}`}>
                  {index === 0 &&
                    index2 === 0 && ( // Only render candidate id and name for the first assessment and test
                      <>
                        <td
                          rowSpan={
                            candidate.assessments.length *
                            assessment.tests.length
                          }
                        >
                          {candidate.id}
                        </td>
                        <td
                          rowSpan={
                            candidate.assessments.length *
                            assessment.tests.length
                          }
                        >
                          {candidate.candidate_name}
                        </td>
                      </>
                    )}
                  {index2 === 0 && ( // Only render assessment name for the first test
                    <td rowSpan={assessment.tests.length}>{assessment.name}</td>
                  )}
                  <td>{test.name}</td>
                  <td>{test.score}%</td>
                </tr>
              ))
            )
          )}
        </tbody>
      </Table>
      <TablePagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
};

export default ViewTestResult;
