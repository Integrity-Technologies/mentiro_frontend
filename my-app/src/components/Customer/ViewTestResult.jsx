import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserResults } from "../../actions/resultAction";
import TablePagination from "./TablePagination";
import { useTranslation } from "react-i18next";
import { FaSearch, FaInfoCircle, FaEllipsisV } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Mentirobluelogo = "/assets/Mentirobluelogo.png"; // Ensure this path is correct

const ViewTestResult = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { results } = useSelector((state) => state.results);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false); // New state for the history modal
  const [selectedTests, setSelectedTests] = useState([]);
  const [historyTests, setHistoryTests] = useState([]); // New state for history tests
  const [filteredResults, setFilteredResults] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState({});
  const [selectedAssessmentName, setSelectedAssessmentName] = useState("");
const [selectedCandidateName, setSelectedCandidateName] = useState("");

  

  useEffect(() => {
    dispatch(getUserResults()); // Fetch results on component mount
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(results)) {
      const filtered = results.filter(
        (result) => result.companies && result.companies.length > 0
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

  const openModal = (tests, assessmentName, candidateName) => {
    if (tests.length > 0) {
      const allTests = [];
  
      tests.forEach((test) => {
        allTests.push(test);
      });
  
      setSelectedTests(allTests);
      setSelectedAssessmentName(assessmentName); // Set the assessment name
      setSelectedCandidateName(candidateName); // Set the candidate name
      setIsModalOpen(true);
    }
  };
  

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTests([]);
  };

  const openHistoryModal = (assessments) => {
    if (assessments.length > 0) {
      // console.log(assessments.assessment_percentage);
      setHistoryTests(assessments);
      setIsHistoryModalOpen(true);
    }
  };

  const closeHistoryModal = () => {
    setIsHistoryModalOpen(false);
    setHistoryTests([]);
  };

  const toggleDropdown = (candidateId, assessmentIndex) => {
    setDropdownVisible((prev) => ({
      ...prev,
      [`${candidateId}-${assessmentIndex}`]: !prev[`${candidateId}-${assessmentIndex}`],
    }));
  };

  const hideDropdown = () => {
    setDropdownVisible({});
  };

  useEffect(() => {
    document.addEventListener("click", hideDropdown);
    return () => {
      document.removeEventListener("click", hideDropdown);
    };
  }, []);

  const handleDropdownClick = (event, candidateId, assessmentIndex) => {
    event.stopPropagation();
    toggleDropdown(candidateId, assessmentIndex);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const progressBarColors = [
    "bg-blue-900",
    
  ];


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
                  Click on 'Candidates Result' to view the test details of
                  assessments.
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
            <th className="px-6 py-4 text-left font-bold text-gray-900 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-14px">
          {filteredResults.length === 0 ? (
            <tr>
              <td
                colSpan="5"
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
                  onClick={() => openModal(assessment.tests, assessment.name, candidate.candidate_name)}
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
                              ? `${assessment.assessment_percentage.toFixed(
                                  1
                                )}%`
                              : `${assessment.assessment_percentage}%`
                            : "0%"
                          : "-"}
                      </span>
                      <div className="w-100 h-5 bg-gray-200 ml-2">
                        <div
                          className={`h-full ${progressBarColors[
                            assessment.assessment_percentage === null
                              ? 0
                              : Math.min(
                                  Math.floor(assessment.assessment_percentage / 25),
                                  progressBarColors.length - 1
                                )
                          ]} `}
                          style={{
                            width: `${assessment.assessment_percentage}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="relative group-hover:text-white">
                    <button
                      className="text-gray-500 hover:text-gray-900 ml-10 focus:outline-none"
                      onClick={(event) =>
                        handleDropdownClick(event, candidate.id, index)
                      }
                    >
                      <FaEllipsisV />
                    </button>
                    {dropdownVisible[`${candidate.id}-${index}`] && (
                      <div className="absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg group-hover:text-white">
                        {/* <button
                          className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 focus:outline-none"
                          onClick={() => openModal(assessment.tests)}
                        >
                          View Details
                        </button> */}
                        <button
                          className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 focus:outline-none"
                          onClick={() => openHistoryModal(assessment.tests)} // Open the history modal
                        >
                          History of Attempts
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
      {currentResults.length > 0 && (
        <TablePagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}

{isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 font-roboto">
    <div className="bg-white rounded-lg shadow-lg p-4 w-1/2 relative max-h-screen">
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
      
      <div className="mb-4">
        <label className="font-sm font-bold text-blue-900">Assessment Name:</label>
        <h4 className="font-md">{selectedAssessmentName}</h4>
      </div>
      
      <div className="mb-4">
        <label className="font-sm font-bold text-blue-900">Candidate Name:</label>
        <h4 className="font-md">{selectedCandidateName}</h4>
      </div>
      
      <div className="overflow-y-auto max-h-60"> {/* Adjust max-height as needed */}
        <table className="w-full table-auto">
          <thead>
            <tr className="text-gray-700 border-t">
              <th className="px-4 py-2">Test Name</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {selectedTests.length > 0 ? (
              selectedTests.map((test, index) => (
                <tr key={index} className="border-t mb-0"> {/* Added margin-bottom */}
                  <td className="px-3 py-3 text-gray-700"> {/* Increased padding */}
                    {test.name}
                  </td>
                  <td className="px-3 py-3 text-gray-500"> {/* Increased padding */}
                    {test.status}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center">
                      <div className="text-gray-500 mr-2">{test.score}%</div>
                      <div className="flex flex-col w-full h-4 bg-gray-200 overflow-hidden rounded-lg">
                        <div
                          className={`${progressBarColors[index % progressBarColors.length]} h-full`}
                          style={{ width: `${test.score || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-4 py-2 text-center text-gray-500">
                  No tests available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}





 {isHistoryModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 font-roboto">
    <div className="bg-white rounded-lg shadow-lg p-4 w-1/2 relative">
      <AiOutlineClose
        className="absolute top-4 right-6 text-red-500 cursor-pointer"
        size={24}
        onClick={closeHistoryModal}
      />
      <div className="flex flex-col items-center">
        <img
          src={Mentirobluelogo}
          alt="Mentiro Logo"
          className="h-20 mt-0"
        />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-medium mb-4 mt-4 items-center justify-center text-center">
          History of Attempts
        </h2>
      </div>
      <div className="flex flex-col  mb-4">
        <h3 className="text-xl font-semibold">Assessment Name</h3>
        <p className="text-lg text-gray-700">Web developer</p>
      </div>
      <div className="flex flex-col  mb-4">
        <h3 className="text-xl font-semibold">Candidate Name</h3>
        <p className="text-lg text-gray-700">Hamza</p>
      </div>
      <div>
        {historyTests.length === 0 ? (
          <p className="text-center text-gray-500">No previous attempts available</p>
        ) : (
          <div>
            {historyTests.map((test, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-black rounded-md mb-2"
              >
                <span className="font-semibold">{test.test_name}</span>
                <span>{test.status}</span>
                <span>{test.score}%</span>
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
