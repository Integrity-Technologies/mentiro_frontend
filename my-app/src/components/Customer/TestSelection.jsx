import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTests } from "../../actions/testAction";
import Preview from "./Preview";
import { FaPlus, FaClipboardCheck, FaTimes, FaSearch } from "react-icons/fa";
import { IoCreateSharp } from "react-icons/io5";
import { MdPreview } from "react-icons/md";
import { useTranslation } from "react-i18next";

const TestSelection = ({ handleBackButtonClick, goToNextStep }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tests = useSelector((state) => state.test.tests);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedTests, setSelectedTests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTestId, setModalTestId] = useState(null);
  const [showTestSelection, setShowTestSelection] = useState(false);
  const [selectedQuestionCounts, setSelectedQuestionCounts] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [fullDescription, setFullDescription] = useState("");
  const [searchInput, setSearchInput] = useState(""); // State for search input


  useEffect(() => {
    dispatch(fetchTests());
  }, [dispatch]);

  const handleNextButtonClick = async () => {
    setShowAlert(false);

    if (selectedTests.length === 0) {
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
    setShowAlert(false);
    if (selectedTests.includes(testId)) {
      setSelectedTests(selectedTests.filter((id) => id !== testId));
    } else {
      setShowModal(true);
      setModalTestId(testId);
    }
  };

  const handleBackButton = () => {
    setCurrentStep((prevStep) => Math.max(0, prevStep - 1));
    setShowTestSelection(true);
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

  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 8) {
      return words.slice(0, 8).join(" ") + "...";
    }
    return description;
  };

  const showFullDescription = (description) => {
    setFullDescription(description);
    setShowModal(true);
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
            <FaClipboardCheck className="text-black-500 mr-2" size={24} />
            <h2 className="text-xl font-bold text-gray-700 mt-2">
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
          <h3 className="text-sm text-gray-500 mb-4">Questions Split</h3>

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
                value={questionCounts["easy"]}
                min="0"
                max="10"
                onChange={(event) => handleQuestionCountChange(event, "easy")}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer mr-2 bg-yellow-300"
              />
              <div className="w-10 h-8  border-2 border-yellow-300 flex justify-center items-center text-gray-700">
                {questionCounts["easy"]}
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
                value={questionCounts["medium"]}
                min="0"
                max="10"
                onChange={(event) => handleQuestionCountChange(event, "medium")}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer mr-2 bg-green-300"
              />
              <div className="w-10 h-8  border-2 border-green-500 flex justify-center items-center text-gray-700">
                {questionCounts["medium"]}
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
                value={questionCounts["hard"]}
                min="0"
                max="10"
                onChange={(event) => handleQuestionCountChange(event, "hard")}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer mr-2 bg-red-500"
              />
              <div className="w-10 h-8 border-2  border-red-500 flex justify-center items-center text-gray-700">
                {questionCounts["hard"]}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="bg-black hover:bg-black text-white font-bold px-4 py-2 rounded-lg transition-colors duration-300"
              onClick={saveQuestionCount}
            >
              {t("TestSelection.save")}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const DescriptionModal = ({ description, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto">
        <div className="flex items-center mb-4">
          <FaClipboardCheck className="text-black-500 mr-2" size={24} />
          <h2 className="text-xl font-bold text-gray-700 mt-2">
            Full Description
          </h2>
          <button
            className="ml-auto text-gray-500 hover:text-gray-700"
            onClick={onClose}
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
        <p className="text-gray-700">{description}</p>
        <div className="flex justify-end mt-6"></div>
      </div>
    </div>
  );

  const SelectedTestCard = ({ test, removeTest }) => (
    <div className="flex justify-between items-center bg-blue-100 p-4 rounded-lg shadow mb-4 w-full sm:w-auto sm:flex-1">
      <div>
        <span className="font-semibold text-blue-900">{test.test_name}</span>
        <span className="text-sm text-gray-600 font-semibold flex items-center mt-2">
          <IoCreateSharp className="mr-1" />
          {calculateTotalQuestionCount(test.id)} Questions
        </span>
      </div>
      <button
        className="text-blue-900 hover:text-blue-700"
        onClick={() => removeTest(test.id)}
      >
        <FaTimes size={20} />
      </button>
    </div>
  );

  const removeTest = (testId) => {
    setSelectedTests(selectedTests.filter((id) => id !== testId));
  };

    const filteredTests = tests.filter(test =>
    test.test_name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      {showQuestion ? (
        <Preview handleBackButton={handleBackButton} />
      ) : (
        <div className="min-h-screen flex flex-col px-6 py-10 relative">
          <div className="flex items-center mb-4">
            <FaClipboardCheck className="mr-2" size={22} />
            <h3 className="text-center text-1xl font-bold mt-2">
              {t("TestSelection.title")}
            </h3>
          </div>

          <div className="mb-4 relative">
        <div className="relative">
        <input
          type="text"
          placeholder="Search test..."
          className="border-2 border-gray-300 rounded-lg px-10 py-2 w-full md:w-1/3 lg:w-1/4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-300 hover:border-blue-400"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)} // Update search input value
        />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
          
          <p className="text-gray-500">{filteredTests.length} test available </p>

          {showAlert && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 transition-opacity duration-500 ease-in-out"
              role="alert"
            >
              <span className="block sm:inline">
                {t("TestSelection.select")}
              </span>
            </div>
          )}

<div className="grid grid-cols-4 gap-4 mb-6">
  {selectedTests.map((testId) => {
    const test = tests.find((test) => test.id === testId);
    return (
      <SelectedTestCard
        key={test.id}
        test={test}
        removeTest={removeTest}
      />
    );
  })}
</div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
            {filteredTests.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 border w-80 border-black"
              >
                <div className="relative">
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <MdPreview className="text-gray-600" size={22} />
                      <h5 className="font-bold text-lg text-gray-800 ml-3 mt-2">
                        {test.test_name}
                      </h5>
                    </div>
                    <div className="mb-2 flex flex-wrap">
                      {test.categories.map((category, index) => (
                        <span
                          key={index}
                          className="bg-category-tag-bg text-black py-2 px-6 rounded-lg text-xs font-semibold mr-2 mb-2"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">
                      {t("TestSelection.overview")}
                    </h2>
                    <p className="text-gray-600 mb-2">
                      {truncateDescription(test.test_description)}
                      {test.test_description.split(" ").length > 15 && (
                        <span
                          className="text-blue-500 cursor-pointer ml-2"
                          onClick={() =>
                            showFullDescription(test.test_description)
                          }
                        >
                          See More
                        </span>
                      )}
                    </p>
                    {/* <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 font-semibold flex items-center mt-2">
                        <IoCreateSharp className="mr-1" />
                        {calculateTotalQuestionCount(test.id)} Total Questions
                      </span>
                    </div> */}
                  </div>
                </div>
                <div className="px-6 py-2 flex justify-end items-center">
                  <button
                    className={`py-2 px-4 rounded font-bold text-white shadow ${
                      selectedTests.includes(test.id)
                        ? "bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                        : "bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-black"
                    } transition-colors duration-300 flex items-center gap-2`}
                    onClick={() => handleTestSelection(test.id)}
                  >
                    {selectedTests.includes(test.id) ? "Selected" : "Add"}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded mr-2 transition-colors duration-300"
              onClick={handleNextButtonClick}
            >
              {t("TestSelection.next")}
            </button>
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded transition-colors duration-300"
              onClick={handleBackButtonClick}
            >
              {t("TestSelection.back")}
            </button>
          </div>
        </div>
      )}
      {showModal && modalTestId && (
        <Modal
          test={tests.find((test) => test.id === modalTestId)}
          updateQuestionCount={updateQuestionCount}
        />
      )}
      {showModal && !modalTestId && (
        <DescriptionModal
          description={fullDescription}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default TestSelection;
