import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCandidates } from "../../actions/candidateAction";
import TablePagination from "./TablePagination";
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

  // Get the active company from local storage
  // const activeCompany = JSON.parse(localStorage.getItem("activeCompany"));

  // Filter candidates based on the active company
  const filteredCandidates = candidates?.filter((candidate) => {
    return (
      `${candidate?.first_name} ${candidate?.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
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
        <h1 className="font-bold text-gray-700 mt-2 text-3xl">
          {t("candidates.title")}
        </h1>
      </div>
      <div className="mb-3 flex items-center justify-between">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={t("candidates.searchPlaceholder")}
            className="border-2 border-gray-300 rounded-lg px-10 py-2 w-full md:w-1/3 lg:w-1/4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-300 hover:border-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex space-x-2 mr-5 mt-4">
        
          <button className="bg-blue-900 text-white px-4 py-2 rounded-md border border-blue-900 hover:bg-blue-800 flex items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105">
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
              {t("candidates.firstName")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left font-bold text-gray-900 uppercase tracking-wider"
            >
              {t("candidates.lastName")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left font-bold text-gray-900 uppercase tracking-wider"
            >
              {t("candidates.email")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left font-bold text-gray-900 uppercase tracking-wider"
            >
              {t("candidates.dateJoined")}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-14px">
          {error ? (
            <tr>
              <td
                colSpan="4"
                className="text-center px-4 py-4 border bg-yellow-100 text-yellow-700"
              >
                {t("candidates.noData")}
              </td>
            </tr>
          ) : filteredCandidates.length === 0 ? (
            <tr>
           <td
              colSpan="4"
              className="text-center px-4 py-4 border bg-yellow-100 text-yellow-700"
            >
              {t("candidates.noData")}
            </td>
          </tr>
          ) : (
            currentCandidates.map((candidate) => (
              <tr
                key={candidate.id}
                className="hover:bg-active-link-bg cursor-pointer transition duration-150 hover:text-white group"
              >
                <td className="px-6 py-4 whitespace-nowrap text-gray-500 group-hover:text-white">
                  {candidate.first_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500 group-hover:text-white">
                  {candidate.last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500 group-hover:text-white">
                  {candidate.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500 group-hover:text-white">
                  {candidate.created_at}
                </td>
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
