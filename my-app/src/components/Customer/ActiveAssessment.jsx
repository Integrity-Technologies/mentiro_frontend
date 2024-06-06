import React, { useState, useEffect } from "react";
import {
  FaClipboardList,
  FaTrashAlt,
  FaPlus,
  FaEye,
  FaSearch,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import TablePagination from "./TablePagination";

import {
  getAllAssessments,
  deleteAssessment,
} from "../../actions/AssesmentAction";
import Assessment from "./Assesment";
import PreviewExistingAssessment from "./PreviewExistingAssesment";
import { CSSTransition } from "react-transition-group";
import { useTranslation } from "react-i18next";

const ActiveAssessment = () => {
  const { t } = useTranslation();
  const [currentView, setCurrentView] = useState("activeassessment");
  const [selectedAssessmentId, setSelectedAssessmentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [uniqueLink, setUniqueLink] = useState("");
  const [currentPreviewView, setCurrentPreviewView] =
    useState("activeassessment");
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const dispatch = useDispatch();
  const assessments = useSelector((state) => state.assessment.assessments);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllAssessments());
  }, [dispatch]);

  const handleAssessment = () => {
    setCurrentView("newassessment");
  };

  const handleDelete = (assessmentId) => {
    setSelectedAssessmentId(assessmentId);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    await dispatch(deleteAssessment(selectedAssessmentId));
    await dispatch(getAllAssessments());
    setShowDeleteConfirmation(false);
    setDeleteSuccess(true);
    setTimeout(() => setDeleteSuccess(false), 3000);
  };

  const getMonthName = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const getRelativeCreationDate = (dateString) => {
    const date = new Date(dateString);
    const currentDate = new Date();
    const diffInMilliseconds = currentDate - date;
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return "today";
    } else if (diffInDays === 1) {
      return "yesterday";
    } else {
      return `${diffInDays} days ago`;
    }
  };

  const filteredAssessment = Array.isArray(assessments?.assessments)
    ? assessments?.assessments?.filter((assessment) => {
        const fullName = `${assessment.assessment_name} ${assessment.last_name}`;
        return fullName.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : [];

  const handlePreview = (uniqueLink) => {
    setUniqueLink(uniqueLink);
    localStorage.setItem("uniqueLink", uniqueLink);
    setCurrentPreviewView("preview");
  };

  if (currentView === "newassessment") {
    return <Assessment />;
  }

  if (currentPreviewView === "preview") {
    return <PreviewExistingAssessment />;
  }

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredAssessment.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = filteredAssessment.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  console.log("🚀 ~ ActiveAssessment ~ currentResults:", currentResults);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="min-h-screen flex flex-col px-6 py-10 relative font-roboto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <FaClipboardList className="text-3xl" size={40} />
          <h1 className="font-bold text-gray-800 mt-2 text-20px">
            {t("ActiveAssessment.title")}
          </h1>
        </div>
        <button
          onClick={handleAssessment}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-black flex items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105"
        >
          <FaPlus />
          <span>{t("ActiveAssessment.create")}</span>
        </button>
      </div>

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
        <thead className="bg-gray-50 text-12px">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Assessment Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Created Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-14px">
          {currentResults.map((assessment, index) => (
            <tr
              key={index}
              className="hover:bg-active-link-bg cursor-pointer transition duration-150"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {assessment.assessment_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {getRelativeCreationDate(assessment.created_date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center">
                <button
                  onClick={() => handleDelete(assessment.id)}
                  className="text-red-600 hover:text-red-800 mr-2"
                  title="Delete Assessment"
                >
                  <FaTrashAlt size={20} />
                </button>
                <button
                  className="text-blue-600 font-bold rounded inline-flex items-center transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => handlePreview(assessment.uniquelink)}
                  title="Preview Assessment"
                >
                  <FaEye size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TablePagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <CSSTransition
        in={showDeleteConfirmation}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4 text-gray-800">
              Are you sure you want to delete this assessment?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="mr-2 bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </CSSTransition>

      {deleteSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg">
          Assessment deleted successfully!
        </div>
      )}
    </div>
  );
};

export default ActiveAssessment;