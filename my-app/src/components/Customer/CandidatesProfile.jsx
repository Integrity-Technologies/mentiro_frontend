import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCandidates } from "../../actions/candidateAction";
import TablePagination from "../Admin/TablePagination";
import { useTranslation } from 'react-i18next';

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
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('candidates.title')}</h1>
      <div className="mb-3">
        <input
          type="text"
          placeholder={t('candidates.searchPlaceholder')}
          className="border border-gray-300 rounded px-3 py-1 w-1/4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="border-collapse w-full mb-4">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">{t('candidates.id')}</th>
            <th className="border border-gray-400 px-4 py-2">{t('candidates.firstName')}</th>
            <th className="border border-gray-400 px-4 py-2">{t('candidates.lastName')}</th>
            <th className="border border-gray-400 px-4 py-2">{t('candidates.email')}</th>
            <th className="border border-gray-400 px-4 py-2">{t('candidates.dateJoined')}</th>
          </tr>
        </thead>
        <tbody>
          {currentCandidates.map((candidate) => (
            <tr key={candidate.id}>
              <td className="border border-gray-400 px-4 py-2">{candidate.id}</td>
              <td className="border border-gray-400 px-4 py-2">{candidate.first_name}</td>
              <td className="border border-gray-400 px-4 py-2">{candidate.last_name}</td>
              <td className="border border-gray-400 px-4 py-2">{candidate.email}</td>
              <td className="border border-gray-400 px-4 py-2">{candidate.created_at}</td>
            </tr>
          ))}
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
