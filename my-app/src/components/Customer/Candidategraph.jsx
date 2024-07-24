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

  const handlePageChange = (page) => setCurrentPage(page);

  const filteredResults = Array.isArray(results)
    ? results.filter((candidate) =>
        candidate.candidate_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const compareDates = (a, b) => {
    const dateA = new Date(a.assessments[0]?.started_at);
    const dateB = new Date(b.assessments[0]?.started_at);
    return dateB - dateA;
  };

  const sortedResults = filteredResults.sort(compareDates);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedResults.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentResults = sortedResults.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center font-roboto">
      <div className="w-full">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr>
              <th className="px-6 py-4 border-b text-left text-xs font-bold text-gray-900 uppercase ">
                {t("graphView.Candidate.Name")}
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase ">
                {t("graphView.Candidate.Assessment")}
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase ">
                {t("graphView.Candidate.Scores")}
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase ">
                {t("graphView.Candidate.Date")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {error ? (
                <tr>
                <td
                  colSpan="4"
                  className="text-center px-4 py-4 border bg-white text-black"
                >
                  {error.includes("404") ? `${t("graphView.noData")}` : error}
                </td>
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
                        <div className="flex items-center">
                          <span className="mr-2">
                            {test.score === null
                              ? "0%"
                              : test.score === undefined
                              ? "-"
                              : `${test.score}%`}
                          </span>
                          <div className="flex flex-col w-full h-4 bg-gray-200 overflow-hidden">
                            <div
                              className="h-full bg-blue-900"
                              style={{ width: `${test.score || 0}%` }}
                            ></div>
                          </div>
                        </div>
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
                  className="text-center px-4 py-4 border bg-white text-black"
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
