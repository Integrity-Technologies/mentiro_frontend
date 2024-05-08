import React, { useState, useEffect } from "react";
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
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by candidate name"
          className="border border-gray-300 rounded px-3 py-1 w-1/4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="border-collapse w-full mb-4">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">ID</th>
            <th className="border border-gray-400 px-4 py-2">Candidate Name</th>
            <th className="border border-gray-400 px-4 py-2">Assessment Name</th>
            <th className="border border-gray-400 px-4 py-2">Test Name</th>
            <th className="border border-gray-400 px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {currentCandidates.map((candidate) => (
            <tr key={candidate.id}>
              <td className="border border-gray-400 px-4 py-2">{candidate.id}</td>
              <td className="border border-gray-400 px-4 py-2">{candidate.candidate_name}</td>
              <td className="border border-gray-400 px-4 py-2">{candidate.assessment_name}</td>
              <td className="border border-gray-400 px-4 py-2">{candidate.test_name}</td>
              <td className="border border-gray-400 px-4 py-2">{candidate.score}--</td>
            </tr>
          ))}
        </tbody>
      </table>
      <TablePagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
};

export default ViewTestResult;
