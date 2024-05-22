import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux"; // Import useDispatch to access the dispatch function
import { getAssessmentByUniqueLink } from "../../actions/AssesmentAction";
import { Container, Button } from "react-bootstrap";
import InviteModal from "./Invitemodal";
import { FiCopy } from 'react-icons/fi';
import {FaClipboardList} from 'react-icons/fa'


const PreviewExistingAssessment = () => {
  const [showModal, setShowModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const dispatch = useDispatch();
  const [assessmentData, setAssessmentData] = useState(null);

  const handleInviteButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const uniqueLink = localStorage.getItem("uniqueLink");
    const fetchData = async () => {
      try {
        // Dispatch the action to fetch assessment data
        const response = await dispatch(getAssessmentByUniqueLink(uniqueLink));
        setAssessmentData(response);
      } catch (error) {
        console.error("Error fetching assessment data:", error);
      }
    };

    if (uniqueLink) {
      fetchData(); // Call fetchData when uniqueLink is available
    }
  }, [dispatch]); // Include dispatch in the dependency array

  console.log(assessmentData);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(assessmentData?.shareablelink).then(
      function () {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 2000); // Hide message after 2 seconds
      },
      function (err) {
        console.error("Unable to copy to clipboard:", err);
      }
    );
  };

  const redirectToDashboard = () => {
    window.location.href = "/customer-dashboard"; // Redirect using window.location
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded">
      <Container>
        <p className="text-lg mb-4">
          Forward this link to the candidate to take up the assessment:
        </p>

        <div className="mt-6 flex items-center relative">
        <input
          type="text"
          value={assessmentData?.shareablelink || ""}
          readOnly
          className="flex-1 border border-gray-300 rounded-lg py-2 pl-4 pr-10 bg-gray-100 text-gray-700"
        />
        <button onClick={copyToClipboard} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-600 p-2 rounded transition duration-300 ease-in-out">
          <FiCopy size={20} />
        </button>
      </div>
      {copySuccess && <p className="mt-2 text-green-500">Link copied to clipboard!</p>}

      <div className="mt-8 flex justify-between">
        <button onClick={handleInviteButtonClick} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition transform duration-300 ease-in-out hover:scale-105">
          Invite via Email
        </button>

        {/* <button onClick={redirectToDashboard} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition transform duration-300 ease-in-out hover:scale-105">
          Back to Dashboard
        </button> */}
      </div>


        <InviteModal showModal={showModal} handleClose={handleCloseModal} />

        {assessmentData && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center">
              <FaClipboardList className="mr-2" />
              <span>Assessment Preview</span>
            </h2>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title className="text-xl font-semibold mb-4">
                  Assessment Details
                </Card.Title>
                <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col bg-gray-50 rounded-lg shadow-md p-4 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Assessment Name:</h3>
                    <p className="text-lg font-bold text-gray-900">{assessmentData.assessment_name}</p>
                  </div>
                  <div className="flex flex-col bg-gray-50 rounded-lg shadow-md p-4 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Total Tests:</h3>
                    <p className="text-lg font-bold text-gray-900">{assessmentData.tests.length}</p>
                  </div>
                  <div className="flex flex-col bg-gray-50 rounded-lg shadow-md p-4 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Assessment Time:</h3>
                    <p className="text-lg font-bold text-gray-900">
                      {assessmentData.assessment_time} mins{" "}
                      <i className="far fa-clock ml-1"></i>
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaClipboardList className="mr-2" />
                Selected Tests
              </h3>              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">
                      Test Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {assessmentData.tests &&
                    assessmentData.tests.map((test, index) => (
                      <tr key={index} className="border-b border-gray-300 animate__animated animate__fadeInUp hover:bg-gray-100 cursor-pointer">
                        <td className="border border-gray-300 px-4 py-2">
                          {test.test_name}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {test.total_time} mins{" "}
                          <i className="far fa-clock ml-1"></i>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default PreviewExistingAssessment;
