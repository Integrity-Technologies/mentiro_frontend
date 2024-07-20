import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTests } from "../../actions/testAction";
import Preview from "./Preview";
import { FaClipboardCheck, FaTimes, FaSearch } from "react-icons/fa";
import { IoCreateSharp } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import Modal from "./TestModal";

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

    const company_name = String(localStorage.getItem("CompanyName")); // Convert to string explicitly

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
    console.log(currentStep);
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
    setSelectedQuestionCounts((prevCounts) => ({
      ...prevCounts,
      [modalTestId]: counts,
    }));
    closeModal();
    setSelectedTests((prevTests) => [...prevTests, modalTestId]);
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
    <div className="relative flex bg-blue-900 whitespace-nowrap p-3 shadow mb-4" style={{ width: 200 }}>
      <div>
        <span className="font-semibold text-white justify-center">{test.test_name}</span>
        <span className="text-sm text-white font-semibold flex items-center mt-2">
          <IoCreateSharp className="mr-1 text-white" />
          {calculateTotalQuestionCount(test.id)} Questions
        </span>
      </div>
      {/* <button
        className="absolute top-0 right-0 text-white m-2"
        onClick={() => removeTest(test.id)}
      >
        <FaTimes size={20} />
      </button> */}
    </div>
  );

  const PlaceholderCard = () => (
    <div className="border-solid border-1 border-gray-200 p-3 mb-12" style={{ width: 200 }}>
      
      <div className="flex justify-between">
        <div className="flex flex-col items-center">
          <span className="text-gray-500 font-semibold">test name</span>
        </div>
        
       
      </div>
      
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
        <Preview    
        currentStep={currentStep}
        handleBackButton={handleBackButton} />
      ) : (
        <div className="min-h-screen flex flex-col px-6 py-10 relative font-roboto">
          <div className="mb-4">
            <h3 className=" text-xl font-medium mt-2">
              {t("TestSelection.title")}
            </h3>
            <p className="text-sm font-bold">Your Assesments  can have up to five tests. Look through the test library and picks the ones that fit best</p>
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

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-16 mt-2">
  {selectedTests.map((testId) => {
    const test = tests.find((t) => t.id === testId);
    return (
      <SelectedTestCard key={test.id} test={test} removeTest={removeTest} />
    );
  })}
  {selectedTests.length < 5 &&
    Array.from({ length: 5 - selectedTests.length }, (_, index) => (
      <PlaceholderCard key={index} />
    ))}
</div>



          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 gap-y-6">
          {filteredTests.map((test) => (
              <div
              key={test.id}
              onClick={() => handleTestSelection(test.id)}
              className={`bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 border border-gray-500 ${
                selectedTests.includes(test.id) ? "bg-blue-100" : ""
              }`}
              style={{ height: "350px", width: "320px" }}
            >
              <div className="relative p-6 flex flex-col h-full ">
                <div className="items-center relative flex flex-col ">
              <div className="flex items-center justify-center rounded-full bg-blue-200 p-2 w-16 h-16">
  <IoDocumentTextOutline className="text-blue-900" size={32} />
</div>
</div>

                <h5 className="font-bold text-lg text-gray-800 mt-3 text-center">
                  {test.test_name}
                </h5>
                <div className="mb-2 flex flex-wrap justify-center">
                  {test.categories.map((category, index) => (
                    <span
                      key={index}
                      className="bg-category-tag-bg text-black py-2 px-6 rounded-lg text-xs font-semibold mr-2 mb-2"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg font-semibold text-gray-700 mb-2 text-center">
                  {t("TestSelection.overview")}
                </h2>
                <p className="text-gray-600 mb-2 text-center flex-grow">
                  {truncateDescription(test.test_description)}
                  {test.test_description.split(" ").length > 15 && (
                    <span
                      className="text-blue-500 cursor-pointer ml-2"
                      onClick={() => showFullDescription(test.test_description)}
                    >
                      See More
                    </span>
                  )}
                </p>
                <div className="flex justify-end mt-auto">
                  <button
                    className={`px-4 p-2 rounded ${
                      selectedTests.includes(test.id) ? "bg-red-500 text-white" : "bg-blue-900 text-white"
                    }`}
                    onClick={() => handleTestSelection(test.id)}
                  >
                    {selectedTests.includes(test.id) ? t("TestSelection.remove") : t("TestSelection.add")}
                  </button>
                </div>
              </div>
            </div>     
                 ))}
          </div>

          <div className="mt-5 bottom-0 left-0 right-0  p-3  flex justify-between">
            <button
              onClick={handleBackButtonClick}
              className="bg-white text-blue-900 border-1 border-blue-900 font-semibold py-2 px-4 rounded"
            >
              {t("TestSelection.back")}
            </button>
            <button
              onClick={handleNextButtonClick}
              className="bg-blue-900 hover:bg-blue-800 border-blue-900 text-white font-semibold py-2 px-16  rounded"
            >
              {t("TestSelection.next")}
            </button>
          </div>
        </div>
      )}
      {showModal && modalTestId && (
        <Modal
          test={tests.find((test) => test.id === modalTestId)}
          updateQuestionCount={updateQuestionCount}
          closeModal={closeModal}
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