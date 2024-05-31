import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Your_Tests from "./Your_Tests";
import { addCandidate } from "../../actions/candidateAction";

const Candidate = () => {
  const dispatch = useDispatch();

  const [showTests, setShowTests] = useState(false);
  const [candidateData, setCandidateData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [successAlert, setSuccessAlert] = useState(false);

  const handleSubmitButtonClick = async () => {
    if (
      !candidateData.first_name ||
      !candidateData.last_name ||
      !candidateData.email
    ) {
      setErrors({
        ...errors,
        firstNameError: !candidateData.first_name,
        lastNameError: !candidateData.last_name,
        emailError: !candidateData.email,
      });
      return;
    }

    const data = await dispatch(addCandidate(candidateData));

    if (data) {
      setShowTests(true);
      setSuccessAlert(true);
      localStorage.setItem("candidateId", data.id);
      console.log(data.id);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCandidateData({ ...candidateData, [id]: value });
    setErrors({ ...errors, [id + "Error"]: false });
  };

  return (
<div className="flex justify-center items-center min-h-screen bg-gray-100">  
    {showTests ? (
        <Your_Tests />
      ) : (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-6 rounded-circle">
          <img src="/assets/icon.jpg" alt="Mentiro Logo" className="h-24 rounded-circle" />
        </div>
        <h1 className="text-2xl font-semibold text-center mb-6">
          Candidate Registration
        </h1>
        <form>
          <div className="mb-4">
            <label
              htmlFor="first_name"
              className={`block text-sm font-medium ${
                errors.firstNameError ? "text-red-500" : "text-gray-700"
              }`}
            >
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
                errors.firstNameError ? "border-red-500" : "border-gray-300"
              }`}
              value={candidateData.first_name}
              onChange={handleInputChange}
            />
            {errors.firstNameError && (
              <p className="mt-1 text-sm text-red-500">First name is required</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="last_name"
              className={`block text-sm font-medium ${
                errors.lastNameError ? "text-red-500" : "text-gray-700"
              }`}
            >
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
                errors.lastNameError ? "border-red-500" : "border-gray-300"
              }`}
              value={candidateData.last_name}
              onChange={handleInputChange}
            />
            {errors.lastNameError && (
              <p className="mt-1 text-sm text-red-500">Last name is required</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className={`block text-sm font-medium ${
                errors.emailError ? "text-red-500" : "text-gray-700"
              }`}
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
                errors.emailError ? "border-red-500" : "border-gray-300"
              }`}
              value={candidateData.email}
              onChange={handleInputChange}
            />
            {errors.emailError && (
              <p className="mt-1 text-sm text-red-500">Email is required</p>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmitButtonClick}
            className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md shadow hover:bg-black-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Get Started
          </button>
        </form>

        {successAlert && (
          <div className="mt-4 p-4 bg-green-100 border-t-4 border-green-500 rounded-b text-green-700">
            Candidate added successfully!
          </div>
        )}
      </div>
      )}
    </div>
  );
};

export default Candidate;
