import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCandidates, getUserCandidates } from "../../actions/candidateAction";
import TablePagination from "../Admin/TablePagination";
import { useTranslation } from "react-i18next";
import { FaUserCircle, FaSearch } from "react-icons/fa";

const CandidateProfile = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const candidates = useSelector((state) => state.candidates?.candidates || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getUserCandidates());
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [dispatch]);

  const filteredCandidates = candidates.filter((candidate) => {
    const fullName = `${candidate.first_name} ${candidate.last_name}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCandidates = filteredCandidates.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="rounded-xl p-6 min-h-screen font-roboto">
      <div className="flex items-center mb-6">
        <FaUserCircle className="mr-3" size={24} />
        <h1 className="text-3xl font-bold text-gray-700 mt-2">
          {t("candidates.title")}
        </h1>
      </div>
      <hr className="mb-6 border-gray-300" />
      <div className="mb-4 relative">
        <div className="relative">
          <input
            type="text"
            placeholder={t("candidates.searchPlaceholder")}
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
            <th  scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("candidates.firstName")}</th>
            <th scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("candidates.lastName")}</th>
            <th scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("candidates.email")}</th>
            <th scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("candidates.dateJoined")}</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {error ? (
            <tr>
              <td
                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                {t("candidates.noData")}
              </td>
            </tr>
          ) : filteredCandidates.length === 0 ? (
            <tr>
              <td
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
              >
                {t("candidates.noData")}
              </td>
            </tr>
          ) : (
            currentCandidates.map((candidate) => (
              <tr
                key={candidate.id}
                className="hover:bg-active-link-bg cursor-pointer transition duration-150"
                >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.first_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.last_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.created_at}</td>
              </tr>
            ))
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

export default CandidateProfile;
