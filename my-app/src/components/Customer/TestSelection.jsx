import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { fetchTests } from "../../actions/testAction";
import { addAssessmentWithTests, getAllAssessments } from "../../actions/AssesmentAction";
import Preview from "./Preview";

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
    if (selectedTests.length === 0) {
      setShowAlert(true);
      return;
    }

    setShowQuestion(true);
    
    const selectedTestObjects = tests.filter(test => selectedTests.includes(test.id));
    
    localStorage.setItem('selectedTests', JSON.stringify(selectedTestObjects));

    const testsPayload = selectedTests.map(testId => {
      const test = tests.find(t => t.id === testId);
      return {
        test_name: test.test_name,
        test_difficulty: test.difficulty_level,
        question_count: selectedQuestionCounts[testId] || 0
      };
    });
  }

    const handleTestSelection = (testId) => {
      const alreadySelected = selectedTests.includes(testId);
      if (alreadySelected) {
        setSelectedTests(selectedTests.filter((id) => id !== testId));
      } else {
        setSelectedTests([...selectedTests, testId]);
      }
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
    setSelectedQuestionCounts({ ...selectedQuestionCounts, [modalTestId]: counts });
  };

  // Function to calculate total question count for a test
  const calculateTotalQuestionCount = (testId) => {
    const counts = selectedQuestionCounts[testId];
    if (!counts) return 10;
    return Object.values(counts).reduce((total, count) => total + count, 0);
  };

  const Alert = ({ message }) => (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
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
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">
          {test.test_name} - Edit Question Count
        </h2>
        {showAlert && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline ml-2">Please add questions before saving.</span>
          </div>
        )}
        {/* Easy difficulty */}
        <div className="mb-4">
          <h3 className="text-base font-semibold mb-2">Easy</h3>
          {/* Range input */}
          <div className="flex items-center mb-4">
            {/* Range input */}
            <input
              type="range"
              value={questionCounts["easy"]} // Show question count only for easy difficulty
              min="0"
              max="10"
              onChange={(event) =>
                handleQuestionCountChange(event, "easy")
              }
              className="w-full h-2 rounded-lg appearance-none cursor-pointer mr-2 bg-yellow-300"
            />
            {/* Box to display selected question count */}
            <div className="w-10 h-8 bg-gray-200 rounded-full flex justify-center items-center">
              {questionCounts["easy"]}{" "}
              {/* Show question count only for easy difficulty */}
            </div>
          </div>
        </div>
        {/* Medium difficulty */}
        <div className="mb-4">
          <h3 className="text-base font-semibold mb-2">Medium</h3>

          {/* Range input */}

          <div className="flex items-center mb-4">
            {/* Range input */}
            <input
              type="range"
              value={questionCounts["medium"]} // Show question count only for medium difficulty
              min="0"
              max="10"
              onChange={(event) =>
                handleQuestionCountChange(event, "medium")
              }
              className="w-full h-2 rounded-lg appearance-none cursor-pointer mr-2 bg-green-300"
            />
            {/* Box to display selected question count */}
            <div className="w-10 h-8 bg-gray-200 rounded-full flex justify-center items-center">
              {questionCounts["medium"]}{" "}
              {/* Show question count only for medium difficulty */}
            </div>
          </div>
        </div>
        {/* Hard difficulty */}
        <div>
          <h3 className="text-base font-semibold mb-2">Hard</h3>
          {/* Range input */}
          <div className="flex items-center mb-4">
            {/* Range input */}
            <input
              type="range"
              value={questionCounts["hard"]} // Show question count only for hard difficulty
              min="0"
              max="10"
              onChange={(event) =>
                handleQuestionCountChange(event, "hard")
              }
              className="w-full h-2 rounded-lg appearance-none cursor-pointer mr-2 bg-red-500"
            />
            {/* Box to display selected question count */}
            <div className="w-10 h-8 bg-gray-200 rounded-full flex justify-center items-center">
              {questionCounts["hard"]}{" "}
              {/* Show question count only for hard difficulty */}
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
          <button
            className="bg-green-500 px-4 py-2 rounded-lg"
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
        <Preview
          Preview={Preview}
          handleBackButtonClick={handleBackButtonClick}
        />
      ) : (
        <div>
        <h2 className="text-center mb-4">Test Selection</h2>
        {showAlert && <Alert message="Please select at least one test." />} {/* Added this line */}
        <Row className="justify-content-center align-items-center">
          {tests.map((test) => (
            <Col key={test.id} md={4} className="mb-3 ml-md-15">
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Test Review</Card.Title>
                  <Card.Text>
                    Please review the test details before proceeding.
                    <br />
                    Test Name: {test.test_name}
                    <br />
                    Category: SEO
                    <br />
                    Question Count: {test.question_count}
                    <br />
                    {/* Display total question count */}
                    Total Question: {calculateTotalQuestionCount(test.id)}
                    <span
                      onClick={() => openModal(test.id)}
                      className="cursor-pointer ml-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </span>
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
          <Button
            variant="outline-primary"
            size="lg"
            onClick={handleBackButtonClick}
          >
            Back
          </Button>{" "}
          <Button
            variant="outline-success"
            size="lg"
            onClick={handleNextButtonClick}
          >
            Next
          </Button>
        </div>
      </div>
    )}
    {showModal && (
      <Modal
        test={tests.find((test) => test.id === modalTestId)}
        updateQuestionCount={updateQuestionCount} // Pass updateQuestionCount function to the Modal
      />
    )}
  </div>
);
};


export default TestSelection;