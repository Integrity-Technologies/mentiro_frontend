import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCandidates } from "../../actions/candidateAction";
import { getUserResults } from "../../actions/resultAction";
import { useTranslation } from "react-i18next";
import ViewTestResult from "./ViewTestResult";
import TablePagination from "./TablePagination";

const CandidateGraph = ({ onRowClick }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const results = useSelector((state) => state.results.results);
  console.log("🚀 ~ CandidateGraph ~ results:", results);
  const { t } = useTranslation();
  const [showResult, setShowResult] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getUserCandidates());
        await dispatch(getUserResults());
      } catch (err) {
        setError("No Candidate Result Found");
      }
    };

    fetchData();
  }, [dispatch]);

  // const goToResultMenu = () => {
  //   setShowResult(true);
  // };

  const handlePageChange = (page) => setCurrentPage(page);

  const filteredResults = Array.isArray(results) ? results.filter((candidate) => candidate.candidate_name.toLowerCase().includes(searchTerm.toLowerCase()) ) : [];

  // Helper function to compare assessment dates
  const compareDates = (a, b) => {
    const dateA = new Date(a.assessments[0]?.started_at);
    const dateB = new Date(b.assessments[0]?.started_at);
    return dateB - dateA;
  };

  // Sorting filtered results array based on assessment date
  const sortedResults = filteredResults.sort(compareDates);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedResults.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentResults = sortedResults.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("graphView.Candidate.Name")}
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("graphView.Candidate.Assessment")}
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("graphView.Candidate.Scores")}
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("graphView.Candidate.Date")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {error ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center px-4 py-4 border bg-yellow-100 text-yellow-700"
                >
                  {error.includes("404") ? `${t("graphView.noData")}` : error}                </td>
              </tr>
            ) : currentResults.length > 0 ? (
              currentResults.map((candidate) =>
                candidate.assessments.map((assessment) =>
                  assessment.tests.map((test, index) => (
                    <tr
                      key={`${candidate.id}-${assessment.id}-${index}`}
                      className="hover:bg-active-link-bg cursor-pointer transition duration-150 group"
                      onClick={() =>
                        onRowClick(candidate, assessment, test)
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 group-hover:text-white">
                        {candidate.candidate_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-white">
                        {assessment.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-white">
                        {test.score === null
                          ? "0%"
                          : test.score === undefined
                          ? "-"
                          : `${test.score}%`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-white">
                        {new Date(
                          assessment.started_at
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )
              )
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center px-4 py-4 border bg-yellow-100 text-yellow-700"
                >
                  {t("graphView.noData")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {sortedResults.length > 0 && (
          <TablePagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      {showResult && <ViewTestResult />}
    </div>
  );
};

export default CandidateGraph;
