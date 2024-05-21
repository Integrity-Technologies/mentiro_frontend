import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Badge } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { fetchTests } from "../../actions/testAction";
import {
  addAssessmentWithTests,
  getAllAssessments,
} from "../../actions/AssesmentAction";
import Preview from "./Preview";
import { FaClipboardCheck, FaTimes } from "react-icons/fa";
import { MdPreview } from "react-icons/md";

const TestSelection = ({ handleBackButtonClick }) => {
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
        category: test.categories || "Uncategorized", // Add category information here with a default value
        company: company_name,
      };
    });

    localStorage.setItem("selectedTests", JSON.stringify(formattedTestsData));
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
    // Close modal after saving
    closeModal();
    // Add the test to selectedTests
    setSelectedTests([...selectedTests, modalTestId]);
  };

  const calculateTotalQuestionCount = (testId) => {
    const counts = selectedQuestionCounts[testId];
    if (!counts) return 10;
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
    }); // State to hold the selected question counts for each difficulty
    const [difficulty, setDifficulty] = useState("easy"); // State to hold the selected difficulty level
    const [showAlert, setShowAlert] = useState(false);

    const handleQuestionCountChange = (event, selectedDifficulty) => {
      const newQuestionCounts = {
        ...questionCounts,
        [selectedDifficulty]: parseInt(event.target.value),
      };
      setQuestionCounts(newQuestionCounts); // Update the question counts state for the selected difficulty
    };

    const saveQuestionCount = () => {
      // Check if all three question counts are zero
      const allCountsZero = Object.values(questionCounts).every(
        (count) => count === 0
      );

      if (allCountsZero) {
        setShowAlert(true);
      } else {
        // Call the updateQuestionCount function and pass the questionCounts
        updateQuestionCount(questionCounts);
        closeModal(); // Close modal after saving
      }
    };

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg w-25">
          <div className="flex items-center mb-4">
            <FaClipboardCheck className="mr-2" size={20} />
            <h2 className="text-xl font-bold">{test.test_name}</h2>
            {/* <FaTimes
              className="cursor-pointer ml-20"
              size={20}
              onClick={closeModal}
            /> */}
          </div>
          <hr className="mb-6 border-gray-400" />
          {showAlert && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline ml-2">
                Please add questions before saving.
              </span>
            </div>
          )}
          <div className="mb-4">
            <h3 className="text-base font-semibold mb-2">Easy</h3>
            <div className="flex items-center mb-4">
              <input
                type="range"
                value={questionCounts["easy"]}
                min="0"
                max="10"
                onChange={(event) => handleQuestionCountChange(event, "easy")}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer mr-2 bg-yellow-300"
              />
              <div className="w-10 h-8 bg-gray-200 rounded-full flex justify-center items-center">
                {questionCounts["easy"]}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-base font-semibold mb-2">Medium</h3>
            <div className="flex items-center mb-4">
              <input
                type="range"
                value={questionCounts["medium"]}
                min="0"
                max="10"
                onChange={(event) => handleQuestionCountChange(event, "medium")}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer mr-2 bg-green-300"
              />
              <div className="w-10 h-8 bg-gray-200 rounded-full flex justify-center items-center">
                {questionCounts["medium"]}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold mb-2">Hard</h3>
            <div className="flex items-center mb-4">
              <input
                type="range"
                value={questionCounts["hard"]}
                min="0"
                max="10"
                onChange={(event) => handleQuestionCountChange(event, "hard")}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer mr-2 bg-red-500"
              />
              <div className="w-10 h-8 bg-gray-200 rounded-full flex justify-center items-center">
                {questionCounts["hard"]}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="bg-gray-300 px-4 py-2 rounded-lg mr-2"
              onClick={closeModal}
            >
              Close
            </button>
            <Button
              variant="success"
              className=" px-4 py-2 rounded-lg"
              onClick={saveQuestionCount}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {showQuestion ? (
        <Preview
          Preview={Preview}
          handleBackButtonClick={handleBackButtonClick}
        />
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 min-h-screen">
          <div className="flex items-center justify-center mb-4">
            <FaClipboardCheck className="mr-2" size={22} />
            <h2 className="text-center text-xl font-bold">Test Selection</h2>
          </div>
          <hr className="mb-6 border-gray-400" />
          {showAlert && <Alert message="Please select at least one test." />}
          <Row className="justify-content-center align-items-center">
            {tests.map((test) => (
              <Col key={test.id} md={4} className="mb-3 ml-md-15">
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <div className="flex items-center mb-4">
                      <MdPreview className="mr-2" size={22} />
                      <Card.Title>Test Review</Card.Title>
                    </div>
                    Please review the test details before proceeding.
                    <hr className="mb-6 border-gray-400" />
                    <Card.Text>
                      <strong>Test Name:</strong> {test.test_name}
                      <br />
                      <strong>Category:</strong>
                      <span class="inline-block px-2 py-1 text-sm font-semibold leading-none bg-green-500 text-white rounded">
                        {test.categories}
                      </span>
                      <br />
                      <strong>Total Question:</strong>{" "}
                      {calculateTotalQuestionCount(test.id)}
                      <span
                        onClick={() => openModal(test.id)}
                        className="cursor-pointer ml-2"
                      ></span>
                    </Card.Text>
                    <Button
                      variant={
                        selectedTests.includes(test.id) ? "success" : "primary"
                      }
                      onClick={() => handleTestSelection(test.id)}
                    >
                      {selectedTests.includes(test.id)
                        ? "Selected"
                        : "Add Test"}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Button variant="success" size="lg" onClick={handleNextButtonClick}>
              Next
            </Button>{" "}
            <Button
              variant="outline-primary"
              size="lg"
              onClick={handleBackButtonClick}
            >
              Back
            </Button>{" "}
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
