import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import Your_Tests from "./Your_Tests";
import { useDispatch } from "react-redux"; // Importing useDispatch
import { addCandidate } from "../../actions/candidateAction"; // Importing your addCandidate action

const Candidate = () => {
  const dispatch = useDispatch(); // Getting dispatch function

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

    // Call the addCandidate action
    const data = await dispatch(addCandidate(candidateData));


    if (data) {
      // If data is returned successfully, show tests and success alert
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
    <div>
      {showTests ? (
        <Your_Tests />
      ) : (
        <div>
          <Container
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <Form className="p-4 border border-1" style={{ width: "500px" }}>
              <h1 className="text-center mb-4">Candidate Registration</h1>

              <Form.Group controlId="first_name" className="mb-3">
                <div
                  className={`relative ${errors.firstNameError ? "mb-3" : ""}`}
                >
                  <input
                    type="text"
                    id="first_name"
                    className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                      errors.firstNameError ? "border-red-500" : ""
                    }`}
                    placeholder=" "
                    value={candidateData.first_name}
                    onChange={handleInputChange}
                  />
                  {errors.firstNameError && (
                    <span className="text-red-500 text-sm">
                      First name is required
                    </span>
                  )}
                  <label
                    htmlFor="first_name"
                    className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform ${
                      errors.firstNameError
                        ? "-translate-y-8 scale-75"
                        : "-translate-y-4 scale-100"
                    } top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4`}
                  >
                    First Name
                  </label>
                </div>
              </Form.Group>

              <Form.Group controlId="last_name" className="mb-3">
                <div
                  className={`relative ${errors.lastNameError ? "mb-3" : ""}`}
                >
                  <input
                    type="text"
                    id="last_name"
                    className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                      errors.lastNameError ? "border-red-500" : ""
                    }`}
                    placeholder=" "
                    value={candidateData.last_name}
                    onChange={handleInputChange}
                  />
                  {errors.lastNameError && (
                    <span className="text-red-500 text-sm">
                      Last name is required
                    </span>
                  )}
                  <label
                    htmlFor="last_name"
                    className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform ${
                      errors.lastNameError
                        ? "-translate-y-8 scale-75"
                        : "-translate-y-4 scale-100"
                    } top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4`}
                  >
                    Last Name
                  </label>
                </div>
              </Form.Group>
              <Form.Group controlId="email" className="mb-3">
                <div className={`relative ${errors.emailError ? "mb-3" : ""}`}>
                  <input
                    type="email"
                    id="email"
                    className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                      errors.emailError ? "border-red-500" : ""
                    }`}
                    placeholder=" "
                    value={candidateData.email}
                    onChange={handleInputChange}
                  />
                  {errors.emailError && (
                    <span className="text-red-500 text-sm">
                      Email is required
                    </span>
                  )}
                  <label
                    htmlFor="email"
                    className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform ${
                      errors.emailError
                        ? "-translate-y-8 scale-75"
                        : "-translate-y-4 scale-100"
                    } top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4`}
                  >
                    Email address
                  </label>
                </div>
              </Form.Group>

              <Button
                variant="dark"
                onClick={handleSubmitButtonClick}
                className="w-100"
              >
                Get Started
              </Button>
            </Form>
            {successAlert && (
              <Alert
                variant="success"
                className="mt-3"
                onClose={() => setSuccessAlert(false)}
                dismissible
              >
                Candidate added successfully!
              </Alert>
            )}
          </Container>
        </div>
      )}
    </div>
  );
};

export default Candidate;