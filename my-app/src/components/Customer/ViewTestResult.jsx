import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResults, getUserResults } from "../../actions/resultAction";
import TablePagination from "./TablePagination";
import { useTranslation } from "react-i18next";
import { TiChartBarOutline } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai"; // Import the close icon
import { FaInfoCircle } from "react-icons/fa"; // Importing the info icon component from react-icons

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
    if (tests.length > 0) {
      setSelectedTests(tests);
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
        <TiChartBarOutline className="mr-2" size={40} />
        <h1 className="font-bold mt-1 text-gray-700 text-20px">
          {t("candidatesResult.title")}
        </h1>
      </div>
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
        <thead className="bg-gray-50 text-12px">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
            >
              {t("candidatesResult.Name")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider relative flex items-center"
            >
              {t("candidatesResult.assessmentName")}
              <div className="group inline-block ml-2">
                <span className="relative z-10 block text-lg">
                  <FaInfoCircle size={14} />{" "}
                  {/* Render the info icon component */}
                </span>
                <div className="absolute hidden group-hover:block bg-gray-500 text-white text-xs rounded py-1 px-2 -mt-8 ml-6 w-40">
                  Click on 'Candidates Result' to view the test details of
                  assessments.
                </div>
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
            >
              {t("candidatesResult.assessmentScore")}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-14px">
          {filteredResults.length === 0 ? (
            <tr>
              <td
                colSpan="3"
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
                  className="hover:bg-active-link-bg cursor-pointer transition duration-150 hover:text-white group"
                  onClick={() => openModal(assessment.tests)} // Add onClick event
                >
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 group-hover:text-white">
                    {candidate.candidate_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 group-hover:text-white">
                    {assessment.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 group-hover:text-white">
                    <span>
                      {assessment.assessment_percentage !== null
                        ? assessment.assessment_percentage !== 0
                          ? assessment.assessment_percentage % 1 !== 0 // Check if not a whole number
                            ? `${assessment.assessment_percentage.toFixed(1)}%`
                            : `${assessment.assessment_percentage}%` // Display without decimal and trailing zero
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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 font-roboto">
          <div className="bg-white rounded-lg shadow-lg p-4 w-2/3 relative">
            <AiOutlineClose
              className="absolute top-4 right-6 text-gray-500 cursor-pointer"
              size={12}
              onClick={closeModal}
            />
            <h2 className="text-14px font-bold mb-4">Included tests</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 text-12px">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Test
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Test Score
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-14px">
                {selectedTests.length === 0 ? (
                  <tr>
                    <td
                      colSpan="3"
                      className="text-center px-4 py-4 border bg-yellow-100 text-yellow-700"
                    >
                      No Tests Available
                    </td>
                  </tr>
                ) : (
                  selectedTests.map((test, index) => (
                    <tr
                      key={index}
                      className="hover:bg-active-link-bg cursor-pointer transition duration-150 group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 group-hover:text-white">
                        {test.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 group-hover:text-white">
                        {getStatusMessage(test.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 group-hover:text-white">
                        {test.score ? `${test.score}%` : "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTestResult;
