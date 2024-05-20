import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResults } from "../../actions/resultAction";
import TablePagination from "./TablePagination";
import { useTranslation } from "react-i18next";
import { TiChartBarOutline } from "react-icons/ti";

const ViewTestResult = () => {
  const { t } = useTranslation();
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
  const currentResults = filteredResults.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (page) => setCurrentPage(page);

  // Handle error state
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 min-h-screen">
      <div className="flex items-center mb-4">
        <TiChartBarOutline className="mr-2" size={24} />
        <h1 className="text-xl font-bold">{t("candidatesResult.title")}</h1>
      </div>
      <hr className="mb-6 border-gray-400" />
      <div className="mb-4">
        <input
          type="text"
          placeholder={t("candidatesResult.searchPlaceholder")}
          className="border border-gray-300 rounded-md py-2 px-4 w-full sm:w-64 focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="w-full table-auto border-collapse">
        <thead className="bg-gray-200">
          <tr className="border-b-2">
            <th className="border px-4 py-2">{t("candidatesResult.id")}</th>
            <th className="border px-4 py-2">{t("candidatesResult.Name")}</th>
            <th className="border px-4 py-2">
              {t("candidatesResult.assessmentName")}
            </th>
            <th className="border px-4 py-2">{t("candidatesResult.testName")}</th>
            <th className="border px-4 py-2">{t("candidatesResult.Score")}</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center px-4 py-2 border">
                {t("candidatesResult.noData")}
              </td>
            </tr>
          ) : (
            currentResults.map((candidate) =>
              candidate.assessments.map((assessment, index) =>
                assessment.tests.map((test, index2) => (
                  <tr key={`${candidate.id}-${index}-${index2}`} className="border-b">
                    {index === 0 &&
                      index2 === 0 && ( // Only render candidate id and name for the first assessment and test
                        <>
                          <td
                            rowSpan={
                              candidate.assessments.length *
                              assessment.tests.length
                            }
                            className="border px-4 py-2"
                          >
                            {candidate.id}
                          </td>
                          <td
                            rowSpan={
                              candidate.assessments.length *
                              assessment.tests.length
                            }
                            className="border px-4 py-2"
                          >
                            {candidate.candidate_name}
                          </td>
                        </>
                      )}
                    {index2 === 0 && ( // Only render assessment name for the first test
                      <td
                        rowSpan={assessment.tests.length}
                        className="border px-4 py-2"
                      >
                        {assessment.name}
                      </td>
                    )}
                    <td className="border px-4 py-2">{test.name}</td>
                    <td className="border px-4 py-2">
                      {/* Render a badge with the percentage score */}
                      <span
                        className={`px-2 py-1 rounded-md text-white ${
                          test.score >= 50 ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {test.score}%
                      </span>
                    </td>
                  </tr>
                ))
              )
            )
          )}
        </tbody>
      </table>
      <TablePagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ViewTestResult;