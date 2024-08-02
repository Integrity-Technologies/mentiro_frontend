import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createResult } from "../../actions/resultAction";
import Questions from "./Questions";

const Mentirobluelogo = "https://mentiro-assets.b-cdn.net/logos/Mentirobluelogo.png"; // Logo


const TestTime = ({ onComplete, onBack, onTimeExpired }) => {
  const [showQuestions, setShowQuestions] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [timeExpired, setTimeExpired] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const questions = JSON.parse(localStorage.getItem("questions")) || [];
    const totalTime = localStorage.getItem("total_time") || 20;

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

  const handleTimeExpired = () => {
    setTimeExpired(true);
    setShowQuestions(false);
    onTimeExpired();
  };

  return (
    <div className="min-h-screen items-center justify-center">
      {showQuestions ? (
        <Questions onComplete={onComplete} onTimeExpired={handleTimeExpired} />
      ) : (
        <>
        <div className="flex justify-center mt-4 mb-0">
        <img
          src={Mentirobluelogo}
          alt="Mentiro Logo"
          className="h-24"
        />
      </div>
        <div
          className="bg-white max-w-4xl w-full mt-4 rounded-lg p-10"
          style={{ width: "900px", overflowY: "auto" }}
        >
          {timeExpired ? (
            <div className="flex justify-center mb-6">
              <h1 className="text-4xl font-bold mb-4 text-gray-800 text-center">
                Your time has expired. Would you like to retake the test?
              </h1>
            </div>
          ) : (
            <>
            

              <h4 className="text-1xl font-medium mb-6">
                A few things to note before you begin:
              </h4>
              <ul className="list-disc pl-5 mb-6 text-md space-y-5">
                <li>
                  This test includes {questionCount} questions and will take
                  about {totalTime} minutes to finish.
                </li>
                <li>Each question is timed with a 1-minute shown on a timer.</li>
                <li>Complete the assessment in one go.</li>
                <li>
                  After choosing your answer, click next to be taken to the next
                  question.
                </li>
                <li>
                  If you skip any question, you can answer it at the end of the
                  test.
                </li>
                <li>Click the start button when you are ready to take the test.</li>
              </ul>

              <div className="mt-6">
                <div className="flex justify-between items-center w-full">
                  <button
                    className="border border-gray-400 text-gray-700 py-2 px-4 rounded"
                    onClick={onBack}
                  >
                    Back
                  </button>
                  <button
                    className="bg-blue-900 text-white py-2 px-4 rounded"
                    onClick={handleSubmitButtonClick}
                  >
                    Start Test
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        </>
      )}
    </div>
  );
};

export default TestTime;
