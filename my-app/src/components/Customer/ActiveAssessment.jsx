import React, { useState, useEffect } from "react";
import { FaClipboardList, FaTrashAlt, FaPlus, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllAssessments, deleteAssessment } from "../../actions/AssesmentAction";
import Assessment from "./Assesment";
import PreviewExistingAssessment from "./PreviewExistingAssesment";
import { CSSTransition } from "react-transition-group";
import { useTranslation } from "react-i18next";

const ActiveAssessment = () => {
  const { t } = useTranslation();
  const [currentView, setCurrentView] = useState("activeassessment");
  const [selectedAssessmentId, setSelectedAssessmentId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [uniqueLink, setUniqueLink] = useState("");
  const [currentPreviewView, setCurrentPreviewView] = useState("activeassessment");
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const dispatch = useDispatch();
  const assessments = useSelector((state) => state.assessment.assessments);

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

  const handlePreview = (uniqueLink) => {
    setUniqueLink(uniqueLink);
    localStorage.setItem("uniqueLink", uniqueLink);
    setCurrentPreviewView("preview");
  };

  if (currentView === "newassessment") {
    return <Assessment />;
  }

  if (currentPreviewView === "preview") {
    return <PreviewExistingAssessment />
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col px-6 py-10 relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FaClipboardList className="text-xl text-primary" />
          <h1 className="text-2xl font-bold">{t("ActiveAssessment.title")}</h1>
        </div>
        <button
          onClick={handleAssessment}
          className="bg-black text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105"
        >
          <FaPlus />
          <span>{t("ActiveAssessment.create")}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {assessments?.assessments?.map((assessment, index) => (
          <div
            key={index}
            className="border p-6 rounded shadow flex flex-col justify-between transition duration-300 transform hover:-translate-y-1 hover:shadow-lg bg-gray-200 hover:bg-gray-300"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-4">{assessment.assessment_name}</h2>
              <div className="flex rounded border border-black w-20 h-9 mt-8">
                <p className="text-center justify-center font-bold mt-1 ml-3">
                  {getMonthName(assessment.created_date)}
                </p>
                <div className="flex flex-grow justify-end items-center gap-3 ml-40 mt-1">
                  <button
                    onClick={() => handleDelete(assessment.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete Assessment"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                  <button
                    className="text-blue-500 font-bold rounded inline-flex items-center transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => handlePreview(assessment.uniquelink)}
                    title="Preview Assessment"
                  >
                    <FaEye size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CSSTransition
        in={showDeleteConfirmation}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="mb-4">Are you sure you want to delete this assessment?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="mr-2 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </CSSTransition>

      {deleteSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          Assessment deleted successfully!
        </div>
      )}
    </div>
  );
};

export default ActiveAssessment;