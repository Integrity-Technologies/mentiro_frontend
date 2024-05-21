import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCandidates } from "../../actions/candidateAction";
import TablePagination from "../Admin/TablePagination";
import { useTranslation } from "react-i18next";
import { FaUserCircle } from "react-icons/fa";

const CandidateProfile = () => {
  const dispatch = useDispatch();
  const candidates = useSelector((state) => state.candidates.candidates);
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAllCandidates());
  }, [dispatch]);

  const filteredCandidates = candidates.filter((candidate) => {
    const fullName = `${candidate.first_name} ${candidate.last_name}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of users per page
  // Pagination logic
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCandidates = filteredCandidates.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 min-h-screen">
      <div className="flex items-center mb-4">
        <FaUserCircle className="mr-2" size={24} />
        <h1 className="text-xl font-bold">{t("candidates.title")}</h1>
      </div>
      <hr className="mb-6 border-gray-400" />
      <div className="mb-3">
        <input
          type="text"
          placeholder={t("candidates.searchPlaceholder")}
          className="border border-gray-300 rounded px-3 py-1 w-1/4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="w-full table-auto border-collapse">
        <thead className="bg-gray-200">
          <tr className="border-b-2">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">{t("candidates.firstName")}</th>
            <th className="border px-4 py-2">{t("candidates.lastName")}</th>
            <th className="border px-4 py-2">{t("candidates.email")}</th>
            <th className="border px-4 py-2">{t("candidates.dateJoined")}</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidates.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center px-4 py-2 border">
                {t("candidates.noData")}
              </td>
            </tr>
          ) : (
            currentCandidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-gray-100 cursor-pointer">
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
