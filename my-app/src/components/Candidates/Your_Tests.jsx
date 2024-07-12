import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAssessmentByUniqueLink } from "../../actions/AssesmentAction";
import { getUserResults } from "../../actions/resultAction";
import TestTime from "./TestTime";

const logo = "/assets/logo.png"; 

const Mentirobluelogo = "/assets/Mentirobluelogo.png"; // Logo

const YourTests = () => {
  const [tests, setTests] = useState([]);
  const [currentTestIndex, setCurrentTestIndex] = useState(null);
  const [assessmentId, setAssessmentId] = useState(null);
  const [userResults, setUserResults] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [completedTests, setCompletedTests] = useState(new Set());
  const [uniqueLink, setUniqueLink] = useState(null);

  const dispatch = useDispatch();


  useEffect(() => {
    const searchParams = window.location.search;
    if (searchParams.startsWith("?")) {
      const uniqueLinkParam = searchParams.substring(1); // Remove the "?" at the start
      setUniqueLink(uniqueLinkParam);
      console.log("Extracted uniqueLink:", uniqueLinkParam);
    } else {
      console.error("uniqueLink parameter is missing in the URL");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
  }, [dispatch, uniqueLink]);

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
    setShowQuestions(false);
  };

  const getTestStatus = (testId) => {
    if (completedTests.has(testId)) {
      return "Completed";
    }
    return "Not Attempted";
  };

  const totalTests = tests.length;
  const completedTestCount = Array.from(completedTests).length;

  const showTestsSection = totalTests > completedTestCount;

  const [timeExpired, setTimeExpired] = useState(false);

  const handleTimeExpired = () => {
    setTimeExpired(true);
    setShowQuestions(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-poppins">
      {showQuestions ? (
        <TestTime
          onComplete={handleTestCompletion}
          onBack={handleBack}
          onTimeExpired={handleTimeExpired}
        />
      ) : (
        <>
          {timeExpired ? (
            <div className="flex w-full min-h-screen">
            <div className="w-1/2 bg-blue-900 flex flex-col items-center justify-center text-white">
              <img
                src={logo}
                alt="Mentiro Logo"
                className="h-24 mt-4"
              />
              <div className="p-8 text-center">
                <h2 className="text-2xl font-bold">Time Expired</h2>
                <p className="mt-4">
                  Finishing the assessment will give you a chance to show your skills and be noticed by the recruiters
                </p>
              </div>
            </div>
            <div className="w-1/2 flex flex-col items-center justify-center bg-blue-100 p-8">
              <div className="bg-white p-12 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold mb-4 text-blue-900">
                  Thank You
                </h1>
                <p className="text-lg text-gray-600">
                  Thank you for participating in the assessment. Unfortunately, the allotted time for the test has ended. Your responses have been saved. You may reattempt the assessment by simply opening the link again at your convenience.
                </p>
              </div>
            </div>
          </div>
          ) : (
            
            <>
              {showTestsSection ? (
                <>
                  <div className="flex justify-center mt-4 mb-0">
                    <img
                      src={Mentirobluelogo}
                      alt="Mentiro Logo"
                      className="h-24"
                    />
                  </div>
                  <div className="w-full max-w-4xl mt-4 p-2 bg-white rounded-lg shadow-md border border-gray-300">
                    <div className="container mx-auto px-4 py-3">
                      <div className="mb-2">
                        <p className="mt-2 font-semibold">
                          Click the Start button when you are ready to continue
                          your assessment.
                        </p>
                      </div>
                      <div className="overflow-x-auto">
                        {tests.map((test, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-3 mb-4 border border-gray-300 rounded-lg"
                          >
                            <span>
                              {test.test_name}{" "}
                              <span
                                className="ml-2"
                                style={{ fontSize: "0.75rem" }}
                              >
                                Total {test.total_questions} Question
                              </span>
                            </span>
                            <button
                              className={`py-2 px-4 rounded-lg text-white font-medium transition ${
                                getTestStatus(test.test_id) === "Not Attempted"
                                  ? "bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  : "bg-green-600 cursor-not-allowed"
                              }`}
                              onClick={() => handleTestStart(index)}
                              disabled={
                                getTestStatus(test.test_id) !== "Not Attempted"
                              }
                            >
                              {getTestStatus(test.test_id) === "Not Attempted"
                                ? "Start Test"
                                : "Completed"}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex w-full min-h-screen">
                  <div className="w-1/2 bg-blue-900 flex flex-col items-center justify-center text-white">
                    <img
                      src={logo}
                      alt="Mentiro Logo"
                      className="h-24 mt-4"
                    />
                    <div className="p-8 text-center">
                      <h2 className="text-2xl font-bold">All Tests Completed</h2>
                      <p className="mt-4">
                        Thank you for participating in all the assessments. We appreciate your effort and time.
                      </p>
                    </div>
                  </div>
                  <div className="w-1/2 flex flex-col items-center justify-center bg-blue-100 p-8">
                    <div className="bg-white p-12 rounded-lg shadow-lg text-center">
                      <h1 className="text-4xl font-bold mb-4 text-blue-900">
                        Thank You
                      </h1>
                      <p className="text-lg text-gray-600">
                        Thank you for completing the tests! We appreciate your time and effort.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          
        </>
      )}
    </div>
  );
};

export default YourTests;