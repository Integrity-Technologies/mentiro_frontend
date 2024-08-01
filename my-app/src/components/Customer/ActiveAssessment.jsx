import React, { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaEllipsisV, FaCheckCircle } from "react-icons/fa";
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

const Mentirobluelogo = "/assets/Mentirobluelogo.png"; // Logo

const ActiveAssessment = () => {
  const { t } = useTranslation();
  const [currentView, setCurrentView] = useState("activeassessment");
  const [selectedAssessmentId, setSelectedAssessmentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [uniqueLink, setUniqueLink] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [popupMessage, setPopupMessage] = useState(""); // State for popup message
  const errorAssessment = useSelector((state) => state.assessment.error); // Access the error message
  console.log("🚀 ~ ActiveAssessment ~ errorAssessment:", errorAssessment);
  const [errorAssessmentVisible, setErrorAssessmentVisible] = useState(false);

  const [currentPreviewView, setCurrentPreviewView] =
    useState("activeassessment");
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState({});
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
  useEffect(() => {
    if (
      errorAssessment ===
      'update or delete on table "assessments" violates foreign key constraint "results_assessment_id_fkey" on table "results"'
    ) {
      setErrorAssessmentVisible(true);
      setTimeout(() => setErrorAssessmentVisible(false), 3000);
    }
  }, [errorAssessment]);
  const confirmDelete = async () => {
    await dispatch(deleteAssessment(selectedAssessmentId));
    setShowDeleteConfirmation(false);
    if (!errorAssessment) {
      setDeleteSuccess(true);
      await dispatch(getAllAssessments());
      setTimeout(() => setDeleteSuccess(false), 3000);
    }
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
  const filteredAssessments = Array.isArray(assessments?.assessments)
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
  const toggleDropdown = (index) => {
    setDropdownVisible((prev) => ({
      ...prev,
      [index]: !prev[index],
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
  const handleDropdownClick = (event, index) => {
    event.stopPropagation();
    toggleDropdown(index);
  };
  const copyLinkToClipboard = (link) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link).then(() => {
        setPopupMessage("Link copied successfully!");
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      }).catch(err => {
        console.error("Failed to copy: ", err);
        setPopupMessage("Failed to copy link.");
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      });
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement("textarea");
      textArea.value = link;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setPopupMessage("Link copied successfully!");
      } catch (err) {
        console.error("Failed to copy: ", err);
        setPopupMessage("Failed to copy link.");
      }
      document.body.removeChild(textArea);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };
  
  if (currentView === "newassessment") {
    return <Assessment />;
  }
  if (currentPreviewView === "preview") {
    return <PreviewExistingAssessment />;
  }
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredAssessments.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = filteredAssessments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const handlePageChange = (page) => setCurrentPage(page);
  const getStatus = (isActive) => {
    return isActive ? (
      <span className="text-green-500 group-hover:text-white">• Active</span>
    ) : (
      <span className="text-red-600">• InAcive</span>
    );
  };
  const calculateTotalTests = (tests) => {
    return tests.length;
  };
  return (
    <div className="min-h-screen flex flex-col px-6 py-10 relative font-roboto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {t("ActiveAssessment.title")}
        </h1>
        <button
          onClick={handleAssessment}
          className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800 flex items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105"
        >
          <FaPlus />
          <span>{t("ActiveAssessment.create")}</span>
        </button>
      </div>

      <div className="mb-4 flex items-center justify-between">
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
        <div className="flex space-x-2">
          {/* <button className="bg-blue-900 text-white px-4 py-2 rounded-md border border-blue-900 hover:bg-blue-800 flex items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105">
            Bulk Action
          </button> */}
          <button className="text-blue-900 px-4 py-2 rounded-md border-2 border-blue-900 hover:text-white hover:bg-blue-800 flex items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105">
            Filter
          </button>
        </div>
      </div>
      {errorAssessmentVisible && (
        <div className=" inset-0 flex items-center z-50">
          <div className="bg-red-100 text-black w-100 p-6 rounded-lg shadow-lg flex items-center space-x-2">
            <span className="text-lg font-semibold">
              The result for this assessment is created, cannot be updated or
              deleted.
            </span>
          </div>
        </div>
      )}
      {deleteSuccess && !errorAssessmentVisible && (
        <div className=" inset-0 flex items-center z-50">
          <div className="bg-green-100 text-black w-100 p-6 rounded-lg shadow-lg flex items-center space-x-2">
            <FaCheckCircle className="text-black text-3xl" />
            <span className="text-lg font-semibold">
              Assessment Deleted Successfully
            </span>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50 text-12px">
            <tr>
              <th
                scope="col"
                className="py-4 px-6 border-b border-gray-200 text-left"
              >
                Assessment Name
              </th>
              <th className="py-4 px-6 border-b border-gray-200 text-left">
                Job Title
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">
                Total Test
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">
                Duration
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">
                Created on
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">
                Status
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-14px">
            {currentResults.length > 0 ? (
              currentResults.map((assessment, index) => (
                <tr
                  key={index}
                  className="hover:bg-active-link-bg cursor-pointer transition duration-150 group"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 group-hover:text-white">
                    {assessment.assessment_name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 group-hover:text-white">
                    {assessment.job_role_name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 group-hover:text-white">
                    {calculateTotalTests(assessment.tests)}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 group-hover:text-white">
                    {assessment.assessment_time} min
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 group-hover:text-white">
                    {new Date(assessment.created_date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 group-hover:text-white">
                    {getStatus(assessment.is_active)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center group-hover:text-white relative">
                    <FaEllipsisV
                      className="cursor-pointer"
                      onClick={(event) => handleDropdownClick(event, index)}
                    />
                    {dropdownVisible[index] && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                        <button
                          className="block px-4 py-2 text-left w-full text-gray-800 hover:bg-gray-100"
                          onClick={() => handlePreview(assessment.uniquelink)}
                        >
                          Preview
                        </button>
                        <button
                          className="block px-4 py-2 text-left w-full text-red-600 hover:bg-gray-100"
                          onClick={() => handleDelete(assessment.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="block px-4 py-2 text-left w-full text-gray-800 hover:bg-gray-100"
                          onClick={() =>
                            copyLinkToClipboard(assessment.shareablelink)
                          }
                        >
                          Copy Link
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center px-4 py-4 border bg-white-100 text-black-700"
                >
                  {t("ActiveAssessment.noData")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {currentResults.length > 0 && (
        <TablePagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
      <CSSTransition
        in={showDeleteConfirmation}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="mb-4">
              <img
                src={Mentirobluelogo}
                alt="Mentiro Logo"
                className="h-20 mx-auto"
              />
            </div>
            <p className="mb-4 text-gray-800">
              Are you sure you want to delete this assessment?
            </p>
            <div className="flex justify-center gap-36">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="mr-2 bg-blue-900 px-4 py-2 rounded-md text-white hover:bg-gray-400"
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

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-90 z-50">
          <div className="bg-green-100 p-6 rounded-lg shadow-lg flex  items-center">
            <FaCheckCircle className="text-green-500 text-3xl" />
            <p className="text-black text-lg mt-3 ml-2">{popupMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default ActiveAssessment;