import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResults, getUserResults } from "../../actions/resultAction";
import TablePagination from "./TablePagination";
import { useTranslation } from "react-i18next";
import { TiChartBarOutline } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";

const ViewTestResult = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { results, error } = useSelector((state) => state.results);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTests, setSelectedTests] = useState([]);

  useEffect(() => {
    dispatch(getUserResults()); // Dispatch the fetchResults action when component mounts
  }, [dispatch]);

  const filteredResults = results.filter((candidate) =>
    candidate.candidate_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Collect all unique test names
  const testNames = [
    ...new Set(
      results.flatMap((candidate) =>
        candidate.assessments.flatMap((assessment) =>
          assessment.tests.map((test) => test.name)
        )
      )
    ),
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = filteredResults.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (page) => setCurrentPage(page);

  const getStatusMessage = (status) => {
    if (status.includes("Not attempted any questions from this test")) {
      return "Not Attempted";
    } else if (status.includes("Attempted")) {
      const attemptedCount = status.match(/Attempted (\d+) questions/);
      if (attemptedCount && attemptedCount[1]) {
        return "Incomplete";
      }
    }
    return status;
  };

  const openModal = (tests) => {
    if (tests.length > 2) {
      const filteredTests = tests.slice(2); // Filter out the first two tests
      setSelectedTests(filteredTests);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTests([]);
  };

  return (
    <div className="rounded-xl p-6 min-h-screen font-roboto">
      <div className="flex items-center mb-4">
        <TiChartBarOutline className="mr-2" size={24} />
        <h1 className="text-3xl font-bold mt-1 text-gray-700 font-roboto">
          {t("candidatesResult.title")}
        </h1>
      </div>
      <hr className="mb-6 border-gray-400" />
      <div className="mb-4 relative">
        <div className="relative">
          <input
            type="text"
            placeholder={t("candidatesResult.searchPlaceholder")}
            className="border-2 border-gray-300 rounded-lg px-10 py-2 w-full md:w-1/3 lg:w-1/4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-300 hover:border-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {t("candidatesResult.Name")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {t("candidatesResult.assessmentName")}
            </th>
            {testNames.slice(0, 2).map((testName, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {testName}
              </th>
            ))}
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {t("candidatesResult.assessmentScore")}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredResults.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="text-center px-4 py-4 border bg-yellow-100 text-yellow-700"
              >
                {t("candidatesResult.noData")}
              </td>
            </tr>
          ) : (
            currentResults.map((candidate) =>
              candidate.assessments.map((assessment, index) => (
                <tr
                  key={`${candidate.id}-${index}`}
                  className="hover:bg-active-link-bg cursor-pointer transition duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {candidate.candidate_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {assessment.name}
                  </td>
                  {testNames.slice(0, 2).map((testName, index2) => {
                    const test = assessment.tests.find(
                      (test) => test.name === testName
                    );
                    return (
                      <td
                        key={index2}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        onClick={() => openModal(assessment.tests)} // Add onClick event
                      >
                        {test ? (
                          <>
                            {test.score ? `${test.score}%` : "0%"}
                            <span
                              className="px-2 py-1 ml-2 rounded"
                              style={{ backgroundColor: "#ccffcc" }}
                            >
                              {getStatusMessage(test.status)}
                            </span>
                          </>
                        ) : (
                          "-"
                        )}
                      </td>
                    );
                  })}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span>
                      {assessment.assessment_percentage !== null
                        ? assessment.assessment_percentage !== 0
                          ? `${assessment.assessment_percentage}%`
                          : "0%"
                        : "-"}
                    </span>
                  </td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
      <TablePagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-2/3">
            <h2 className="text-xl font-bold mb-4">Tests</h2>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Test Name</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Test Score</th>
                </tr>
              </thead>
              <tbody>
                {selectedTests.map((test, index) => (
                  <tr key={index} className="border-b">
                    <td className="border px-4 py-2">{test.name}</td>
                    <td className="border px-4 py-2">{test.status}</td>
                    <td className="border px-4 py-2">
                      {test.score ? `${test.score}%` : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTestResult;
