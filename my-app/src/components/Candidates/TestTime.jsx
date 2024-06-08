import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createResult } from "../../actions/resultAction"; // createResult action import kiya hai
import Questions from "./Questions";

const TestTime = ({ onComplete, onBack  }) => {
  const [showQuestions, setShowQuestions] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [totalTime, setTotalTime] = useState(0);


  const dispatch = useDispatch();

  useEffect(() => {
    const questions = JSON.parse(localStorage.getItem('questions')) || [];
    const totalTime = localStorage.getItem('total_time') || 20;
    

    setQuestionCount(questions.length);
    setTotalTime(totalTime);
  }, []);

  const handleSubmitButtonClick = () => {
    const candidate_id = JSON.parse(localStorage.getItem("candidateId"));
    const test_id = JSON.parse(localStorage.getItem("testId"));
    const assessment_id = JSON.parse(localStorage.getItem("assessmentId"));

    const resultData = {
      candidate_id,
      test_id,
      assessment_id,
    };

    dispatch(createResult(resultData));

    setShowQuestions(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      {showQuestions ? (
        <Questions onComplete={onComplete} />
      ) : (
        <div className="bg-white max-w-4xl  rounded-lg p-8  w-full">
          <div className="flex justify-center mb-6 rounded-circle">
            <img src="/assets/icon.jpg" alt="Mentiro Logo" className="h-24 rounded-circle" />
          </div>

          <h4 className="text-1xl font-semibold  mb-4">
            You have {totalTime} minutes to answer the {questionCount} questions.
          </h4>
          <p className="text-lg">
            <strong>Test Time:</strong> {totalTime} minutes
          </p>
          <p className="text-lg">
            <strong>Instructions:</strong>
            <p className="text-lg">Please read carefully and select the correct answer</p>
          </p>
          <div className="mt-6">
            <button
              className="bg-black text-white py-2 px-4 rounded w-full mb-4"
              onClick={handleSubmitButtonClick}
            >
              Start Test
            </button>
            <button className="border border-gray-400 text-gray-700 py-2 px-4 rounded w-full"  onClick={onBack}>
              Back
            </button>
          </div>
        </div>
)}
</div>
);
};

export default TestTime;