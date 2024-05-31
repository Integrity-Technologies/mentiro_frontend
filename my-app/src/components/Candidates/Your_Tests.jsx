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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {showTime ? (
        <TestTime />
      ) : (
        <div className="container text-center">
          <h1 className="text-4xl font-bold mb-8">Your Tests</h1>

          {tests.map((test, index) => (
            <div
              key={index}
              className="mb-4  p-4 bg-white shadow-md rounded-lg w-full mx-auto flex items-center justify-between space-x-4"
            >
              <h4 className="text-xl font-semibold flex-1">{test.test_name}:</h4>
              <button
                className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-200"
                onClick={() => handleTestStart(test.test_id)} // Pass test ID to the handler
              >
                {getTestStatus(test.test_id) === "Not Attempted" ? "Start Test" : "Completed"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourTests;
