import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserResults } from "../../actions/resultAction";
import TablePagination from "./TablePagination";
import { useTranslation } from "react-i18next";
import { FaSearch, FaInfoCircle } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
const Mentirobluelogo = "/assets/Mentirobluelogo.png"; // Ensure this path is correct

const ViewTestResult = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { results } = useSelector((state) => state.results);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTests, setSelectedTests] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    dispatch(getUserResults()); // Fetch results on component mount
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(results)) {
      const filtered = results.filter((result) =>
        result.companies && result.companies.length > 0
      );
      setFilteredResults(filtered);
    }
  }, [results]);

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

  const openModal = (tests) => {
    if (tests.length > 0) {
      const allTests = [];

      tests.forEach((test) => {
        allTests.push(test);

        if (Array.isArray(test.previous_attempts)) {
          test.previous_attempts.forEach((attempt) => {
            allTests.push({
              ...test,
              score: attempt.score,
              status: "Previous Attempt",
              date: attempt.date,
            });
          });
        }
      });

      setSelectedTests(allTests);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTests([]);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const progressBarColors = ["bg-blue-900", "bg-green-500", "bg-yellow-500", "bg-red-500"];

  return (
    <div className="rounded-xl p-6 min-h-screen font-roboto">
      <div className="flex items-center mb-4">
        <h1 className="font-bold mt-1 text-gray-700 text-3xl">
          {t("candidatesResult.title")}
        </h1>
      </div>
      <div className="mb-3 flex items-center justify-between">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={t("candidatesResult.searchPlaceholder")}
            className="border-2 border-gray-300 rounded-lg px-10 py-2 w-full md:w-1/3 lg:w-1/4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-300 hover:border-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex space-x-2 mr-5 mt-4">
          <button className="text-blue-900 px-4 py-2 rounded-md border-2 border-blue-900 hover:bg-blue-800 flex hover:text-white items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105">
            Filter
          </button>
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 text-12px">
          <tr>
            <th
              scope="col"
              className="px-6 py-4 text-left font-bold text-gray-900 uppercase tracking-wider"
            >
              {t("candidatesResult.Name")}
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left font-bold text-gray-900 uppercase tracking-wider relative flex items-center"
            >
              {t("candidatesResult.assessmentName")}
              <div className="group inline-block ml-2">
                <span className="relative z-10 block text-lg">
                  <FaInfoCircle size={14} />
                </span>
                <div className="absolute hidden group-hover:block bg-gray-500 text-white text-xs rounded py-1 px-2 -mt-8 ml-6 w-40">
                  Click on 'Candidates Result' to view the test details of assessments.
                </div>
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left font-bold text-gray-900 uppercase tracking-wider"
            >
              recent attempt
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left font-bold text-gray-900 uppercase tracking-wider"
            >
              {t("candidatesResult.assessmentScore")}
            </th>
           
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-14px">
          {filteredResults.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="text-center px-4 py-4 border bg-white-100 text-black-700"
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
                  onClick={() => openModal(assessment.tests)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 group-hover:text-white">
                    {candidate.candidate_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 group-hover:text-white">
                    {assessment.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 group-hover:text-white">
                    {formatDate(assessment.started_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 group-hover:text-white">
                    <div className="flex items-center">
                      <span>
                        {assessment.assessment_percentage !== null
                          ? assessment.assessment_percentage !== 0
                            ? assessment.assessment_percentage % 1 !== 0
                              ? `${assessment.assessment_percentage.toFixed(1)}%`
                              : `${assessment.assessment_percentage}%`
                            : "0%"
                          : "-"}
                      </span>
                      <div className="flex flex-col w-50 h-4 ml-5 bg-gray-200 overflow-hidden">
                        <div
                          className="h-full bg-blue-900"
                          style={{ width: `${assessment.assessment_percentage || 0}%` }}
                        ></div>
                      </div>
                    </div>
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
    <div className="bg-white rounded-lg shadow-lg p-4 w-1/2 relative">
      <AiOutlineClose
        className="absolute top-4 right-6 text-red-500 cursor-pointer"
        size={24}
        onClick={closeModal}
      />
      <div className="flex flex-col items-center">
        <img
          src={Mentirobluelogo}
          alt="Mentiro Logo"
          className="h-20 mt-0"
        />
      </div>
      <h2 className="text-2xl font-medium mb-4 mt-4 items-center justify-center text-center">Marks Breakdown</h2>
      <div>
        {selectedTests.length > 0 && (
          <div className="mb-4">
            {selectedTests.map((test, index) => (
              <div key={index} className="flex items-center justify-between p-2 mb-2 border border-gray-200 rounded-lg">
                <div className="text-gray-700 font-medium w-1/3">{test.name}</div>
                <div className="text-gray-500 w-1/3 text-center">{test.status}</div>
                <div className="text-gray-500 w-1/3 text-right">{test.score}%</div>
                <div className="flex flex-col w-50 h-4 ml-5 bg-gray-200 overflow-hidden w-1/3">
                  <div
                    className={`${progressBarColors[index % progressBarColors.length]} h-full`}
                    style={{ width: `${test.score || 0}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ViewTestResult;
