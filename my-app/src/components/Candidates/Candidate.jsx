import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCandidate } from "../../actions/candidateAction";
import {FaCheckCircle} from "react-icons/fa"
import Your_Tests from "./Your_Tests";
import { isEmail } from "validator"; // Import validator for email format validation
import { useLocation } from "react-router-dom";

const loginimg = "/assets/loginimg.png"; // Image for the candidate section
const logo = "/assets/logo.png"; // Logo

const Candidate = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [showTests, setShowTests] = useState(false);
  const [candidateData, setCandidateData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    uniquelink: location.search.replace('?', ''), // Remove ?
  });
  const [errors, setErrors] = useState({});
  const [successAlert, setSuccessAlert] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);

  const handleSubmitButtonClick = async () => {
    setErrors({});
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
    if (!isEmail(candidateData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError: true,
      }));
      return;
    }
    const data = await dispatch(addCandidate(candidateData));
    if (data) {
      setShowTests(true);
      setSuccessAlert(true);
      localStorage.setItem("candidateId", data.candidate.id);
    } else {
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
    // if (id === "email" && value) {
    //   setVerifyEmailMessage(true);
    // } else {
    //   setVerifyEmailMessage(false);
    // }
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
    <div className="bg-blue-100 min-h-screen font-poppins">
      {showTests ? (
        <Your_Tests />
      ) : (
        <>
          <section className="flex flex-col md:flex-row min-h-screen">
            {/* Left Side - Dark Blue Box */}
            <div className="relative hidden md:flex flex-col justify-center items-center w-40 md:w-1/2 bg-blue-900 text-white p-10">
              <img src={logo} alt="Mentiro Logo" className="mb-6" />
              <div className="text-center max-w-lg z-10 relative">
              
                <p className="text-lg mb-8">
                 Finishing the assessment will give you a chance to show your skills and be noticed by the recruiters
                </p>
              </div>
              <img
                src={loginimg}
                alt="Shadow Lady"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
            </div>
            {/* Right Side - Form */}
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-10 mt-4">
              <div className="w-full max-w-lg bg-white shadow-md rounded-lg px-6 py-8">
                <h1 className="text-2xl font-medium mb-6">
                  Please confirm Your identity
                </h1>
                <form className="space-y-4">
                  <div className="mb-4">
                    <div className="relative">
                      <input
                        type="text"
                        id="first_name"
                        className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                          errors.firstNameError
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder=" "
                        value={candidateData.first_name}
                        onChange={handleInputChange}
                      />
                      <label
                        htmlFor="first_name"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        First name *
                      </label>
                      {errors.firstNameError && (
                        <p className="mt-1 text-sm text-red-500">
                          First name is required
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="relative">
                      <input
                        type="text"
                        id="last_name"
                        className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                          errors.lastNameError
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder=" "
                        value={candidateData.last_name}
                        onChange={handleInputChange}
                      />
                      <label
                        htmlFor="last_name"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Last name *
                      </label>
                      {errors.lastNameError && (
                        <p className="mt-1 text-sm text-red-500">
                          Last name is required
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer `}
                        placeholder=" "
                        value={candidateData.email}
                        onChange={handleInputChange}
                      />
                      <label
                        htmlFor="email"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Email Address *
                      </label>
                      {errors.emailError && (
                        <p className="mt-1 text-sm text-red-500">
                          Please enter a valid email address
                        </p>
                      )}
                      {/* {verifyEmailMessage && (
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
                      )} */}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="acceptTerms"
                        className="mr-2"
                        checked={acceptTerms}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="acceptTerms" className="text-sm">
                        I accept the Terms of Service *
                      </label>
                    </div>
                    {errors.termsError && (
                      <p className="mt-1 text-sm text-red-500">
                        You must accept the Terms of Service
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    className="w-full py-2 px-4 bg-blue-900 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none"
                    onClick={handleSubmitButtonClick}
                  >
                    Submit
                  </button>
                  {successAlert && (
                    <div className=" inset-0 flex items-center z-50">
                    <div className="bg-green-100 text-black w-100 p-6 rounded-lg shadow-lg flex items-center space-x-2">
                      <FaCheckCircle className="text-black text-3xl" />
                      <span className="text-lg font-semibold">
                      Successfully added candidate.
                      </span>
                    </div>
                  </div>
                  )}
                </form>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Candidate;