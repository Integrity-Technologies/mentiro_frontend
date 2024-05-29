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

  return (
    <div className="bg-gray-100 shadow-xl rounded-xl p-6 min-h-screen transition duration-500 ease-in-out transform hover:shadow-2xl">
      {" "}
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
            <th className="border px-4 py-2">
              {t("candidatesResult.Status")}
            </th>
            <th className="border px-4 py-2">{t("candidatesResult.Score")}</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="text-center px-4 py-4 border bg-yellow-100 text-yellow-700"
              >
                {t("candidatesResult.noData")}
              </td>
            </tr>
          ) : (
            currentResults.map((candidate) =>
              candidate.assessments.map((assessment, index) =>
                assessment.tests.map((test, index2) => (
                  <tr
                    key={`${candidate.id}-${index}-${index2}`}
                    className="hover:bg-gray-100 cursor-pointer transition duration-150"
                  >
                    {index === 0 && index2 === 0 && (
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
                    {index2 === 0 && (
                      <td
                        rowSpan={assessment.tests.length}
                        className="border px-4 py-2"
                      >
                        {assessment.name}
                      </td>
                    )}
                    <td className="border px-4 py-2">{test.name}</td>
                    <td className="border px-4 py-2">{test.status}</td>
                    <td className="border px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full ${
                          test.score
                            ? test.score >= 50
                              ? "bg-green-500"
                              : "bg-red-500"
                            : ""
                        }`}
                      >
                        {test.score ? `${test.score}%` : "-"}
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