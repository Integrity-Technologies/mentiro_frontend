import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAssessmentByUniqueLink } from "../../actions/AssesmentAction"; // Update the path accordingly
import TestTime from "./TestTime";

const YourTests = () => {
  const [showTime, setShowTime] = useState(false);
  const [tests, setTests] = useState([]);
  const [assessmentId, setAssessmentId] = useState(null);

  const dispatch = useDispatch();
  const location = useLocation();

  // Extract the uniqueLink from the URL (part after '?')
  const uniqueLink = location.search ? location.search.substring(1) : null;

  console.log("uniqueLink:", uniqueLink); // Log uniqueLink to verify it

  useEffect(() => {
    if (uniqueLink) {
      // Save uniqueLink to local storage
      localStorage.setItem('uniqueLink', uniqueLink);

      const fetchAssessmentData = async () => {
        try {
          const data = await dispatch(getAssessmentByUniqueLink(uniqueLink));
          if (data) {
            
            console.log(data.id);
            if (data.id) {
              setAssessmentId(data.id);
              localStorage.setItem('assessmentId', data.id); // Save assessment ID to local storage
              console.log(data.id);
            }
            if (data.tests) {
              setTests(data.tests); // Assuming the data structure contains a 'tests' array
            }
          }
        } catch (error) {
          console.error('Failed to fetch assessment data:', error);
        }
      };

      fetchAssessmentData();
    } else {
      console.error('uniqueLink is undefined');
    }
  }, [dispatch, uniqueLink]);

  const handleTestStart = (testId) => {
    const selectedTest = tests.find(test => test.test_id === testId);
    if (selectedTest) {
      localStorage.setItem('testId', testId);
      localStorage.setItem('questions', JSON.stringify(selectedTest.questions));

    console.log(testId + "test id for local storage");
    console.log(selectedTest.questions)
    setShowTime(true);
  };
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {showTime ? (
        <TestTime />
      ) : (
        <div className="container text-center">
          <h1 className="text-4xl font-bold mb-8">Your Tests</h1>

          {tests.map((test, index) => (
            <div key={index} className="mb-4 p-4 bg-white shadow-md rounded-lg w-3/4 mx-auto flex items-center justify-between">
              <h4 className="text-xl font-semibold">{test.test_name}:</h4>
              <button
                className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-200"
                onClick={() => handleTestStart(test.test_id)} // Pass test ID to the handler
              >
                Start
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourTests;