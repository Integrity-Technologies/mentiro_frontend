import React, { useState } from "react";
import { FaClipboardCheck } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Mentirobluelogo = "/assets/Mentirobluelogo.png"; // Logo


const Modal = ({ updateQuestionCount, closeModal }) => {
  const { t } = useTranslation();
  const [questionCounts, setQuestionCounts] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleQuestionCountChange = (event, difficulty) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setQuestionCounts((prevCounts) => ({
        ...prevCounts,
        [difficulty]: value,
      }));
    }
  };

  const saveQuestionCount = () => {
    const allCountsZero = Object.values(questionCounts).every(
      (count) => count === 0
    );
    if (allCountsZero) {
      setShowAlert(true);
    } else {
      updateQuestionCount(questionCounts);
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-50 max-w-md mx-auto">
        <div className="flex items-center mb-4">
        
          <button
            className="ml-auto text-gray-500 hover:text-gray-700"
            onClick={closeModal}
          >
          
            <svg
              className="w-6 h-6 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* <hr className="mb-6 border-gray-300" /> */}
        <div className="flex flex-col items-center justify-center">
        <img
          src={Mentirobluelogo}
          alt="Mentiro Logo"
          className="h-20 -mt-4 justify-center items-center"
        />
      </div>

        <div className="text-center mt-2">
          <h3 className="text-xl text-black mb-2">Questions Split</h3>
          <p className="text-sm text-gray-500 mb-6">
            Each test can have up to 10 questions. Use the slider to set the
            number of questions for each difficulty level.
          </p>
        </div>

        {showAlert && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 transition-opacity duration-500 ease-in-out"
            role="alert"
          >
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline ml-2">
              Please add questions before saving.
            </span>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-base font-semibold mb-2 text-gray-700">
            {t("TestSelection.easy")}
          </h3>
          <div className="flex items-center mb-4">
            <input
              type="range"
              value={questionCounts.easy}
              min="0"
              max="10"
              onChange={(event) => handleQuestionCountChange(event, "easy")}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer mr-2 bg-green-600 slider-thumb-easy"
            />
            <div className="w-10 h-8 border-2 border-green-600 flex justify-center items-center text-gray-700">
              {questionCounts.easy}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-base font-semibold mb-2 text-gray-700">
            {t("TestSelection.medium")}
          </h3>
          <div className="flex items-center mb-4">
            <input
              type="range"
              value={questionCounts.medium}
              min="0"
              max="10"
              onChange={(event) => handleQuestionCountChange(event, "medium")}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer mr-2 bg-yellow-500 slider-thumb-medium"
            />
            <div className="w-10 h-8 border-2 border-yellow-500 flex justify-center items-center text-gray-700">
              {questionCounts.medium}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-base font-semibold mb-2 text-gray-700">
            {t("TestSelection.hard")}
          </h3>
          <div className="flex items-center mb-4">
            <input
              type="range"
              value={questionCounts.hard}
              min="0"
              max="10"
              onChange={(event) => handleQuestionCountChange(event, "hard")}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer mr-2 bg-red-500 slider-thumb-hard"
            />
            <div className="w-10 h-8 border-2 border-red-500 flex justify-center items-center text-gray-700">
              {questionCounts.hard}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="bg-blue-900 w-full hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-lg transition-colors duration-300"
            onClick={saveQuestionCount}
          >
            {t("TestSelection.save")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
