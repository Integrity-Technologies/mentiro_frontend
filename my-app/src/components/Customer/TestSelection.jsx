import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTests } from "../../actions/testAction";
import Preview from "./Preview";
import { FaClipboardCheck } from "react-icons/fa";
import { MdPreview } from "react-icons/md";

const TestSelection = ({ handleBackButtonClick, goToNextStep }) => {
  const dispatch = useDispatch();
  const tests = useSelector((state) => state.test.tests);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedTests, setSelectedTests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTestId, setModalTestId] = useState(null);
  const [selectedQuestionCounts, setSelectedQuestionCounts] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    dispatch(fetchTests());
  }, [dispatch]);

  const handleNextButtonClick = async () => {
    if (
      selectedTests.length === 0 ||
      Object.keys(selectedQuestionCounts).length !== selectedTests.length
    ) {
      setShowAlert(true);
      return;
    }

    setShowQuestion(true);

    const activeCompany = JSON.parse(localStorage.getItem("activeCompany"));
    const company_name = activeCompany.name;

    const formattedTestsData = selectedTests.map((testId) => {
      const test = tests.find((t) => t.id === testId);
      return {
        test_name: test.test_name,
        test_difficulty: selectedQuestionCounts[testId] || {
          easy: 0,
          medium: 0,
          hard: 0,
        },
        category: test.categories || "Uncategorized",
        company: company_name,
      };
    });

    localStorage.setItem("selectedTests", JSON.stringify(formattedTestsData));

    goToNextStep();
  };

  const handleTestSelection = (testId) => {
    setShowModal(true);
    setModalTestId(testId);
  };

  const openModal = (testId) => {
    setShowModal(true);
    setModalTestId(testId);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalTestId(null);
  };

  const updateQuestionCount = (counts) => {
    setSelectedQuestionCounts({
      ...selectedQuestionCounts,
      [modalTestId]: counts,
    });
    closeModal();
    setSelectedTests([...selectedTests, modalTestId]);
  };

  const calculateTotalQuestionCount = (testId) => {
    const counts = selectedQuestionCounts[testId];
    if (!counts) return 0;
    return Object.values(counts).reduce((total, count) => total + count, 0);
  };

  const Alert = ({ message }) => (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Error:</strong>
      <span className="block sm:inline ml-2">{message}</span>
    </div>
  );

  const Modal = ({ test, updateQuestionCount }) => {
    const [questionCounts, setQuestionCounts] = useState({
      easy: 10,
      medium: 10,
      hard: 10,
    });
    const [showAlert, setShowAlert] = useState(false);

    const handleQuestionCountChange = (event, selectedDifficulty) => {
      const newQuestionCounts = {
        ...questionCounts,
        [selectedDifficulty]: parseInt(event.target.value),
      };
      setQuestionCounts(newQuestionCounts);
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
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto">
          <div className="flex items-center mb-4">
            <FaClipboardCheck className="text-blue-500 mr-2" size={24} />
            <h2 className="text-xl font-bold text-gray-700">
              {test.test_name}
            </h2>
            <button
              className="ml-auto text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <svg
                className="w-6 h-6"
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
          <hr className="mb-6 border-gray-300" />
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
          <div className="mb-4">
            <h3 className="text-base font-semibold mb-2 text-gray-700">Easy</h3>
            <div className="flex items-center mb-4">
              <input
                type="range"
                value={questionCounts["easy"]}
                min="0"
                max="10"
                onChange={(event) => handleQuestionCountChange(event, "easy")}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer mr-2 bg-yellow-300"
              />
              <div className="w-10 h-8 bg-gray-200 rounded-full flex justify-center items-center text-gray-700">
                {questionCounts["easy"]}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-base font-semibold mb-2 text-gray-700">
              Medium
            </h3>
            <div className="flex items-center mb-4">
              <input
                type="range"
                value={questionCounts["medium"]}
                min="0"
                max="10"
                onChange={(event) => handleQuestionCountChange(event, "medium")}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer mr-2 bg-green-300"
              />
              <div className="w-10 h-8 bg-gray-200 rounded-full flex justify-center items-center text-gray-700">
                {questionCounts["medium"]}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold mb-2 text-gray-700">Hard</h3>
            <div className="flex items-center mb-4">
              <input
                type="range"
                value={questionCounts["hard"]}
                min="0"
                max="10"
                onChange={(event) => handleQuestionCountChange(event, "hard")}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer mr-2 bg-red-500"
              />
              <div className="w-10 h-8 bg-gray-200 rounded-full flex justify-center items-center text-gray-700">
                {questionCounts["hard"]}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg transition-colors duration-300"
              onClick={saveQuestionCount}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {showQuestion ? (
        <Preview handleBackButtonClick={handleBackButtonClick} />
      ) : (
        <div className="bg-gray-100 min-h-screen flex flex-col px-6 py-10 relative">
          <div className="flex items-center justify-center mb-4">
            <FaClipboardCheck className="mr-2" size={22} />
            <h2 className="text-center text-xl font-bold mt-1">Test Selection</h2>
          </div>
          <hr className="mb-4 border-gray-400" />
          {showAlert && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 transition-opacity duration-500 ease-in-out"
              role="alert"
            >
              <span className="block sm:inline">
                Please select at least one test.
              </span>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test) => (
              <div
                key={test.id}
                className="bg-gray-100 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 border border-gray-200"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <MdPreview className="text-gray-600 mr-2" size={22} />
                    <h5 className="font-bold text-lg text-gray-700">
                      {test.test_name}
                    </h5>
                  </div>
                  <hr className="mb-6 border-black-300" />
                  <p className="mb-2">
                    <strong className="text-gray-700">Description:</strong>{" "}
                    {test.test_description}
                  </p>
                  <p className="mb-2">
                    <strong className="text-gray-700">Category:</strong>
                    <span className="inline-block px-2 py-1 text-sm font-semibold leading-none bg-green-500 text-white rounded ml-2">
                      {test.categories}
                    </span>
                  </p>
                  <p className="mb-4">
                    <strong className="text-gray-700">
                      Total Questions:
                    </strong>{" "}
                    {calculateTotalQuestionCount(test.id)}
                  </p>
                  <button
                    className={`w-full py-2 rounded font-bold text-white ${
                      selectedTests.includes(test.id)
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-black hover:bg-black"
                    } transition-colors duration-300`}
                    onClick={() => handleTestSelection(test.id)}
                  >
                    {selectedTests.includes(test.id) ? "Selected" : "Add Test"}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2 transition-colors duration-300"
              onClick={handleNextButtonClick}
            >
              Next
            </button>
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded transition-colors duration-300"
              onClick={handleBackButtonClick}
            >
              Back
            </button>
          </div>
        </div>
      )}
      {showModal && (
        <Modal
          test={tests.find((test) => test.id === modalTestId)}
          updateQuestionCount={updateQuestionCount}
        />
      )}
    </div>
  );
};

export default TestSelection;
