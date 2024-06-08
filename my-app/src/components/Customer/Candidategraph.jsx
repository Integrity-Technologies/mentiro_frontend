import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCandidates } from "../../actions/candidateAction";
import { getUserResults } from "../../actions/resultAction";
import { useTranslation } from "react-i18next";
import ViewTestResult from "./ViewTestResult";
import TablePagination from "./TablePagination";

const CandidateGraph = () => {
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
        setError(err.message);
      }
    };

    fetchData();
  }, [dispatch]);

  const goToResultMenu = () => {
    setShowResult(true);
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const filteredResults = results.filter((candidate) =>
    candidate.candidate_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = filteredResults.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full">
        {results && results.length > 0 ? (
          <>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("graphView.Candidate.Name")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("graphView.Candidate.Assessment")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("graphView.Candidate.Scores")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentResults.map((candidate) =>
                  candidate.assessments.map((assessment) =>
                    assessment.tests.map((test, index) => (
                      <tr key={`${candidate.id}-${assessment.id}-${index}`} className="hover:bg-active-link-bg cursor-pointer transition duration-150 group">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 group-hover:text-white">
                          {candidate.candidate_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-white">
                          {assessment.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-white">
                          {test.score === null ? "0%" : test.score === undefined ? "-" : `${test.score}%`}
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
          </>
        ) : (
          <div className="text-center py-6">{t("graphView.noData")}</div>
        )}
      </div>
      {showResult && <ViewTestResult />}
    </div>
  );
};

export default CandidateGraph;