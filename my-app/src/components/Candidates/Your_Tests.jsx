import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAssessmentByUniqueLink } from "../../actions/AssesmentAction";
import { getUserResults } from "../../actions/resultAction";
import TestTime from "./TestTime";

const YourTests = () => {
  const [tests, setTests] = useState([]);
  const [currentTestIndex, setCurrentTestIndex] = useState(null);
  const [assessmentId, setAssessmentId] = useState(null);
  const [userResults, setUserResults] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showTestTime, setShowTestTime] = useState(false);
  const [completedTests, setCompletedTests] = useState(new Set());

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uniqueLink = localStorage.getItem("uniqueLink");
        if (uniqueLink) {
          const data = await dispatch(getAssessmentByUniqueLink(uniqueLink));
          if (data) {
            if (data.id) {
              setAssessmentId(data.id);
              localStorage.setItem("assessmentId", data.id);

              const userData = await dispatch(getUserResults(data.id));
              if (userData) {
                setUserResults(userData);
                const completed = new Set(
                  userData
                    .filter((result) => result.status === "Completed")
                    .map((result) => result.test_id)
                );
                setCompletedTests(completed);
              }
            }
            if (data.tests) {
              setTests(data.tests);
              localStorage.setItem("tests", JSON.stringify(data.tests));
            }
          }
        } else {
          console.error("uniqueLink is undefined");
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleTestStart = (index) => {
    const selectedTest = tests[index];
    if (selectedTest) {
      localStorage.setItem("testId", selectedTest.test_id);
      localStorage.setItem("questions", JSON.stringify(selectedTest.questions));
      localStorage.setItem("total_time", selectedTest.total_time);

      setShowQuestions(true);
      setCurrentTestIndex(index);
    }
  };

  const handleTestCompletion = () => {
    if (currentTestIndex !== null) {
      setCompletedTests(
        new Set(completedTests).add(tests[currentTestIndex].test_id)
      );
      setShowQuestions(false);
      setCurrentTestIndex(null);
    }
  };

  const handleBack = () => {
    setShowTestTime(false);
  };

  const getTestStatus = (testId) => {
    if (completedTests.has(testId)) {
      return "Completed";
    }
    return "Not Attempted";
  };

  const totalTests = tests.length;
  const completedTestCount = Array.from(completedTests).length;

  const showTestsSection = totalTests !== completedTestCount;

  return (
    <div className="min-h-screen flex items-center justify-center font-roboto">
        {showQuestions ? (
          <TestTime onComplete={handleTestCompletion} onBack={handleBack} />
        ) : (
          <>
         <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
            {showTestsSection && (
              <div className="container mx-auto px-4 py-3">
                <div className="flex justify-center mb-6">
                  <img
                    src="/assets/icon.jpg"
                    alt="Mentiro Logo"
                    className="h-24 rounded-full"
                  />
                </div>
                <div className="mb-2">
                  <h1 className="text-4xl font-bold mb-4 text-gray-800 text-center">
                    Your Tests
                  </h1>
                  <p className="text-center mt-2">
                    Click the Start button when you are ready to continue your
                    assessment.
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b text-left">Test Name</th>
                        <th className="py-2 px-4 border-b text-left ml-5">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tests.map((test, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="py-2 px-4 border-b">{test.test_name}</td>
                          <td className="py-2 px-4 border-b">
                            <button
                              className={`py-2 px-4 rounded-lg text-white font-medium transition ${
                                getTestStatus(test.test_id) === "Not Attempted"
                                  ? "bg-black hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  : "bg-green-600 cursor-not-allowed"
                              }`}
                              onClick={() => handleTestStart(index)}
                              disabled={getTestStatus(test.test_id) !== "Not Attempted"}
                            >
                              {getTestStatus(test.test_id) === "Not Attempted"
                                ? "Start Test"
                                : "Completed"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {!showTestsSection && (
              <div className="container mx-auto px-4 py-5 flex flex-col items-center justify-center">
                <div className="flex justify-center mb-6 rounded-circle">
                  <img
                    src="/assets/icon.jpg"
                    alt="Mentiro Logo"
                    className="h-24 rounded-circle"
                  />
                </div>
                <h1 className="text-4xl font-bold mb-4 text-gray-800 text-center">
                  Thank you for completing the tests!
                </h1>
                <p className="text-xl text-gray-600 text-center">
                  We appreciate your time and effort.
                </p>
              </div>
            )}
         </div>

          </>
        )}
    </div>
  );
};

export default YourTests;
