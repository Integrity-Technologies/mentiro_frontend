import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Your_Tests from "./Your_Tests";

const Candidate = () => {
  const [showTests, setShowTests] = useState(false);

  const handleSubmitButtonClick = () => {
    setShowTests(true);
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

              <Form.Group controlId="formFirstName" className="mb-3">
                <div className="relative">
                  <input
                    type="text"
                    id="first_name"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="first_name"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    First Name
                  </label>
                </div>
              </Form.Group>

              <Form.Group controlId="formLastName" className="mb-3">
                <div className="relative">
                  <input
                    type="text"
                    id="last_name"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="last_name"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Last Name
                  </label>
                </div>
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
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
          </Container>
        </div>
      )}
    </div>
  );
};

export default Candidate;
