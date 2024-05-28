import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCandidates, getUserCandidates } from "../../actions/candidateAction";
import TablePagination from "../Admin/TablePagination";
import { useTranslation } from "react-i18next";
import { FaUserCircle } from "react-icons/fa";

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
    <div className="bg-gray-100 shadow-xl rounded-xl p-6 min-h-screen transition duration-500 ease-in-out transform hover:shadow-2xl">
      <div className="flex items-center mb-6">
        <FaUserCircle className="mr-3 text-blue-500" size={24} />
        <h1 className="text-2xl font-bold text-gray-700 mt-1">
          {t("candidates.title")}
        </h1>
      </div>
      <hr className="mb-6 border-gray-300" />
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder={t("candidates.searchPlaceholder")}
          className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 lg:w-1/4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-300 hover:border-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="w-full table-auto border-collapse bg-white rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr className="border-b-2 border-blue-700">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">{t("candidates.firstName")}</th>
            <th className="border px-4 py-2">{t("candidates.lastName")}</th>
            <th className="border px-4 py-2">{t("candidates.email")}</th>
            <th className="border px-4 py-2">{t("candidates.dateJoined")}</th>
          </tr>
        </thead>
        <tbody>
          {error ? (
            <tr>
              <td
                colSpan="5"
                className="text-center px-4 py-4 border bg-yellow-100 text-yellow-700"
              >
                {t("candidates.noData")}
              </td>
            </tr>
          ) : filteredCandidates.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="text-center px-4 py-4 border bg-yellow-100 text-yellow-700"
              >
                {t("candidates.noData")}
              </td>
            </tr>
          ) : (
            currentCandidates.map((candidate) => (
              <tr
                key={candidate.id}
                className="hover:bg-blue-100 cursor-pointer transition duration-150"
              >
                <td className="border px-4 py-2">{candidate.id}</td>
                <td className="border px-4 py-2">{candidate.first_name}</td>
                <td className="border px-4 py-2">{candidate.last_name}</td>
                <td className="border px-4 py-2">{candidate.email}</td>
                <td className="border px-4 py-2">{candidate.created_at}</td>
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
