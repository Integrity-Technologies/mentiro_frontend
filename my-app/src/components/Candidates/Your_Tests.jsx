import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAssessmentByUniqueLink } from "../../actions/AssesmentAction"; // Update the path accordingly
import {getUserResults} from "../../actions/resultAction"
import TestTime from "./TestTime";

const YourTests = () => {
  const [showTime, setShowTime] = useState(false);
  const [tests, setTests] = useState([]);
  const [assessmentId, setAssessmentId] = useState(null);
  const [userResults, setUserResults] = useState([]);

  const dispatch = useDispatch();
  const location = useLocation();

  // Extract the uniqueLink from the URL (part after '?')
  const uniqueLink = location.search ? location.search.substring(1) : null;

  console.log("uniqueLink:", uniqueLink); // Log uniqueLink to verify it

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (uniqueLink) {
          // Save uniqueLink to local storage
          localStorage.setItem('uniqueLink', uniqueLink);

          const data = await dispatch(getAssessmentByUniqueLink(uniqueLink));
          if (data) {
            if (data.id) {
              setAssessmentId(data.id);
              localStorage.setItem('assessmentId', data.id); // Save assessment ID to local storage

              // Fetch user results based on the assessment ID
              const userData = await dispatch(getUserResults(data.id)); // Assuming getUserResults function exists
              if (userData) {
                setUserResults(userData);
              }
            }
            if (data.tests) {
              setTests(data.tests); // Assuming the data structure contains a 'tests' array
            }
          }
        } else {
          console.error('uniqueLink is undefined');
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [dispatch, uniqueLink]);

  const handleTestStart = (testId) => {
    const selectedTest = tests.find(test => test.test_id === testId);
    if (selectedTest) {
      localStorage.setItem('testId', testId);
      localStorage.setItem('questions', JSON.stringify(selectedTest.questions));
      localStorage.setItem('total_time', selectedTest.total_time); // Save total_time to local storage

      setShowTime(true);
    }
  };

  const getTestStatus = (testId) => {
    const userResult = userResults.find(result => result.test_id === testId);
    if (userResult) {
      return userResult.status;
    }
    return "Not Attempted";
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white">
    {showTime ? (
      <TestTime />
    ) : (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold mb-8 text-gray-800 text-center">Your Tests</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {tests.map((test, index) => (
            <div
              key={index}
              className="p-8 bg-gray-100 rounded-lg shadow-lg transform transition-all hover:scale-105 flex items-center justify-between"
            >
              <h4 className="text-2xl font-semibold mb-4 text-gray-700">{test.test_name}</h4>
              <button
                className={`ml-4 py-2 px-6 rounded-lg text-white font-medium transition-colors duration-200 ${
                  getTestStatus(test.test_id) === "Not Attempted"
                    ? "bg-black hover:bg-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={() => handleTestStart(test.test_id)}
                disabled={getTestStatus(test.test_id) !== "Not Attempted"}
              >
                {getTestStatus(test.test_id) === "Not Attempted" ? "Start Test" : "Completed"}
              </button>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
  );
};

export default YourTests;
