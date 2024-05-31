import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResults, getUserResults } from "../../actions/resultAction";
import TablePagination from "./TablePagination";
import { useTranslation } from "react-i18next";
import { TiChartBarOutline } from "react-icons/ti";

const ViewTestResult = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { results, error } = useSelector((state) => state.results);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);

  // const mockResult2 = [
  //   {
  //     id: 1,
  //     candidate_name: "candidate1",
  //     candidate_email: "candidate1@gmail.com",
  //     assessments: [
  //       {
  //         name: "assessment1",
  //         tests: [
  //           {
  //             name: "test1",
  //             total_questions: 1,
  //             attempted_questions: 0,
  //             status: "Not attempted",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     candidate_name: "candidate2",
  //     candidate_email: "candidate2@gmail.com",
  //     assessments: [
  //       {
  //         name: "assessment2",
  //         tests: [
  //           {
  //             name: "testa",
  //             total_questions: 1,
  //             attempted_questions: 1,
  //             score: 60,
  //             status: "Attempted",
  //           },
  //           {
  //             name: "testb",
  //             total_questions: 1,
  //             attempted_questions: 1,
  //             score: 60,
  //             status: "Attempted",
  //           },
  //           {
  //             name: "testc",
  //             total_questions: 1,
  //             attempted_questions: 1,
  //             score: 60,
  //             status: "Attempted",
  //           },
  //         ],
  //         assessment_score: 60,
  //         assessment_percentage: 60,
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     candidate_name: "mirza",
  //     candidate_email: "user1@gmail.com",
  //     assessments: [
  //       {
  //         name: "assessment3",
  //         tests: [
  //           {
  //             name: "test-alpha",
  //             total_questions: 1,
  //             attempted_questions: 1,
  //             score: 80,
  //             status: "Attempted",
  //           },
  //           {
  //             name: "test-beta",
  //             total_questions: 1,
  //             attempted_questions: 1,
  //             score: 20,
  //             status: "Attempted",
  //           },
  //           {
  //             name: "test-btavo",
  //             total_questions: 1,
  //             attempted_questions: 1,
  //             score: 20,
  //             status: "Attempted",
  //           },
  //         ],
  //         assessment_score: 40,
  //         assessment_percentage: 40,
  //       },
  //     ],
  //   },
  // ];

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

  const handleViewMore = (tests) => {
    setModalContent(tests.slice(2));
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-100 shadow-xl rounded-xl p-6 min-h-screen transition duration-500 ease-in-out transform hover:shadow-2xl">
      <div className="flex items-center mb-4">
        <TiChartBarOutline className="mr-2 text-blue-500" size={24} />
        <h1 className="text-2xl font-bold text-gray-700">
          {t("candidatesResult.title")}
        </h1>
      </div>
      <hr className="mb-6 border-gray-400" />
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder={t("candidatesResult.searchPlaceholder")}
          className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 lg:w-1/4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-300 hover:border-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="w-full table-auto border-collapse bg-white">
        <thead className="bg-blue-600 text-white">
          <tr className="border-b-2 border-blue-700">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">{t("candidatesResult.Name")}</th>
            <th className="border px-4 py-2">
              {t("candidatesResult.assessmentName")}
            </th>
            <th className="border px-4 py-2">
              {t("candidatesResult.testName")}
            </th>
            <th className="border px-4 py-2">{t("candidatesResult.Status")}</th>
            <th className="border px-4 py-2">
              {t("candidatesResult.testScore")}
            </th>
            <th className="border px-4 py-2">
              {t("candidatesResult.assessmentScore")}
            </th>
          </tr>
        </thead>
        <tbody>
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
                  className="hover:bg-gray-100 cursor-pointer transition duration-150"
                >
                  <td className="border px-4 py-2">{candidate.id}</td>
                  <td className="border px-4 py-2">
                    {candidate.candidate_name}
                  </td>
                  <td className="border px-4 py-2">{assessment.name}</td>

                  <td className="border px-4 py-2" style={{ width: "300px" }}>
                    {assessment.tests.slice(0, 2).map((test, index2) => (
                      <div key={index2}>
                        {test.name}
                        {index2 === 1 && assessment.tests.length > 2 && (
                          <span
                            className="text-blue-500 cursor-pointer"
                            onClick={() => handleViewMore(assessment.tests)}
                          >
                            , view more
                          </span>
                        )}
                      </div>
                    ))}
                  </td>

                  <td className="border px-4 py-2">
                    <span>
                      {assessment.tests.slice(0, 2).map((test, index2) => (
                        <React.Fragment key={index2}>
                          {test.status.includes("Attempted 1 questions") ||
                          test.status.includes("Attempted 2 questions")
                            ? "Incomplete"
                            : test.status.includes(
                                "Not attempted any questions from this test"
                              )
                            ? "Not Attempted"
                            : test.status}
                          {index2 === 0 && assessment.tests.length > 1 && ", "}
                        </React.Fragment>
                      ))}
                    </span>
                  </td>
                  <td className="border px-4 py-2">
                    <span>
                      {assessment.tests.slice(0, 2).map((test, index2) => (
                        <React.Fragment key={index2}>
                          {test.score !== null
                            ? test.score
                              ? `${test.score}%`
                              : "0"
                            : "-"}
                          {index2 === 0 && assessment.tests.length > 1 && ", "}
                        </React.Fragment>
                      ))}
                    </span>
                  </td>
                  <td className="border px-4 py-2">
                    <span>
                      {assessment.assessment_percentage !== null
                        ? assessment.assessment_percentage !== 0
                          ? `${assessment.assessment_percentage}%`
                          : "0"
                        : "-"}
                    </span>

                    {/* {assessment.tests.slice(0, 2).map((test, index2) => (
                      <span
                        key={index2}
                        className={`px-2 py-1 rounded-full ${
                          test.score
                            ? test.score >= 50
                              ? "bg-green-500"
                              : "bg-red-500"
                            : ""
                        }`}
                      >
                        {index2 > 0 ? ", " : ""}
                        {test.score ? `${test.score}%` : "-"}
                      </span>
                    ))} */}
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
        <Modal tests={modalContent} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

const Modal = ({ tests, onClose }) => {
  return (
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
            {tests.map((test, index) => (
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
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewTestResult;
