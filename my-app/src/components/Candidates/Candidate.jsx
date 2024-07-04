import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Your_Tests from "./Your_Tests";
import { addCandidate } from "../../actions/candidateAction";
import { isEmail } from "validator"; // Import validator for email format validation

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
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);
  const [verifyEmailMessage, setVerifyEmailMessage] = useState(false);

  const handleSubmitButtonClick = async () => {
    // Reset previous errors
    setErrors({});

    // Basic validation
    if (
      !candidateData.first_name ||
      !candidateData.last_name ||
      !candidateData.email ||
      !acceptTerms
    ) {
      setErrors({
        firstNameError: !candidateData.first_name,
        lastNameError: !candidateData.last_name,
        emailError: !candidateData.email,
        termsError: !acceptTerms,
      });
      return;
    }

    // Email format validation
    if (!isEmail(candidateData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError: true,
      }));
      return;
    }

    // Attempt to add candidate
    const data = await dispatch(addCandidate(candidateData));

    if (data) {
      setShowTests(true);
      setSuccessAlert(true);
      localStorage.setItem("candidateId", data.id);
    } else {
      // Handle case where email is already registered
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError: true,
      }));
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCandidateData({ ...candidateData, [id]: value });
    setErrors({ ...errors, [id + "Error"]: false });

    // Show verify email message when email input is changed
    if (id === "email" && value) {
      setVerifyEmailMessage(true);
    } else {
      setVerifyEmailMessage(false);
    }
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    if (id === "acceptTerms") {
      setAcceptTerms(checked);
      setErrors({ ...errors, termsError: false });
    } else if (id === "acceptMarketing") {
      setAcceptMarketing(checked);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      {showTests ? (
        <Your_Tests />
      ) : (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-center mb-6">
            <img
              src="/assets/icon.jpg"
              alt="Mentiro Logo"
              className="h-24 rounded-full"
            />
          </div>
          <h1 className="text-2xl font-semibold text-center mb-6">
            Please confirm who you are
          </h1>
          <form>
            <div className="mb-4">
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-black"
              >
                First name *
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
                <p className="mt-1 text-sm text-red-500">
                  First name is required
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-black"
              >
                Last name *
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
                <p className="mt-1 text-sm text-red-500">
                  Last name is required
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email Address *
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
                <p className="mt-1 text-sm text-red-500">
                  Please enter a valid email address
                </p>
              )}
              {verifyEmailMessage && (
                <p className="mt-1 text-sm text-red-500">
                  Please verify your email. Click{" "}
                  <a
                    href="https://mail.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    here
                  </a>
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  className="form-checkbox"
                  checked={acceptTerms}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-2 text-black">
                  I have read and accept the{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    test terms
                  </a>
                  .
                </span>
              </label>
              {errors.termsError && (
                <p className="mt-1 text-sm text-red-500">
                  You must accept the terms to proceed
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={handleSubmitButtonClick}
              className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              Submit
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