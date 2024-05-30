import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useDispatch } from "react-redux"; // useDispatch hook import kiya hai
import { createResult } from "../../actions/resultAction"; // createResult action import kiya hai
import Questions from "./Questions";

const TestTime = () => {
  const [showQuestions, setShowQuestion] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [totalTime, setTotalTime] = useState(0); // State to store total time

  const dispatch = useDispatch(); // useDispatch hook initialize kiya hai

  useEffect(() => {
    // Retrieve question IDs from local storage and count them
    const questions = JSON.parse(localStorage.getItem('questions')) || [];
    const totalTime = localStorage.getItem('total_time') || 20; // Default to 20 minutes if not found

    setQuestionCount(questions.length);
    setTotalTime(totalTime);
  }, []);

  const handleSubmitButtonClick = () => {
    // Candidate_id, test_id, aur assessment_id ko local storage se retrieve kiya hai
    const candidate_id = JSON.parse(localStorage.getItem("candidateId"));
    const test_id = JSON.parse(localStorage.getItem("testId"));
    const assessment_id = JSON.parse(localStorage.getItem("assessmentId"));

    // Data jo bhejna hai API request ke sath
    const resultData = {
      candidate_id,
      test_id,
      assessment_id,
    };

    dispatch(createResult(resultData));

    setShowQuestion(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    {showQuestions ? (
      <Questions />
    ) : (
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h3 className="text-2xl font-semibold text-center mb-4">
          You have {totalTime} minutes to answer {questionCount} questions
        </h3>
        <p className="text-lg">
          <strong>Test Time:</strong> {totalTime} minutes
        </p>
        <p className="text-lg">
          <strong>Answer {questionCount} Questions</strong>
        </p>
        <p className="text-lg">
          <strong>Instructions:</strong>
        </p>
        <div className="mt-6">
          <button
            className="bg-black text-white py-2 px-4 rounded w-full mb-4"
            onClick={handleSubmitButtonClick}
          >
            Start Test
          </button>
          <button className="border border-gray-400 text-gray-700 py-2 px-4 rounded w-full">
            Back
          </button>
        </div>
      </div>
    )}
  </div>
  );
};

export default TestTime;
