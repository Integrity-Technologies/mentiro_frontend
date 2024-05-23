import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAssessmentByUniqueLink } from "../../actions/AssesmentAction";
import InviteModal from "./Invitemodal";
import { FiCopy } from "react-icons/fi";
import { FaClipboardList } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { Container } from "react-bootstrap";

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
        const response = await dispatch(getAssessmentByUniqueLink(uniqueLink));
        setAssessmentData(response);
      } catch (error) {
        console.error("Error fetching assessment data:", error);
      }
    };

    if (uniqueLink) {
      fetchData();
    }
  }, [dispatch]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(assessmentData?.shareablelink).then(
      function () {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 2000);
      },
      function (err) {
        console.error("Unable to copy to clipboard:", err);
      }
    );
  };

  const redirectToDashboard = () => {
    window.location.href = "/customer-dashboard";
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 shadow-md rounded animate__animated animate__fadeIn">
      <Container>
        {assessmentData && (
          <div className="mt-8">
            <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center">
              <FaClipboardList className="mr-2 text-primary" />
              <span>Assessment Preview</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex flex-col bg-gray-200 rounded-lg shadow-md p-4 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  Assessment Name:
                </h3>
                <p className="text-lg font-bold text-gray-900">
                  {assessmentData.assessment_name}
                </p>
              </div>
              <div className="flex flex-col bg-gray-200 rounded-lg shadow-md p-4 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  Total Tests:
                </h3>
                <p className="text-lg font-bold text-gray-900">
                  {assessmentData.tests.length}
                </p>
              </div>
              <div className="flex flex-col bg-gray-200 rounded-lg shadow-md p-4 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  Assessment Time:
                </h3>
                <div className="flex items-center">
                  <span className="inline-block px-2 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full flex items-center">
                    <span className="text-lg font-bold text-gray-900 mr-2 text-white">
                      {assessmentData.assessment_time}
                    </span>
                    mins <MdAccessTime className="ml-1" />
                  </span>
                </div>

                {/* <p className="text-lg font-bold text-gray-900 flex items-center">
                  {assessmentData.assessment_time} mins
                  <MdAccessTime className="ml-1" />
                </p> */}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaClipboardList className="mr-2 text-primary" />
                Selected Tests
              </h3>
              <table className="w-full border-collapse bg-white table-auto border border-gray-300 shadow-md rounded-lg">
                <thead className="bg-blue-600 text-white">
                  <tr className="border-b-2 border-blue-700">
                    <th className="border px-4 py-2">Test Name</th>
                    <th className="border px-4 py-2">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {assessmentData.tests &&
                    assessmentData.tests.map((test, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-300 hover:bg-blue-100 cursor-pointer transition duration-150"
                      >
                        <td className="border px-4 py-2">{test.test_name}</td>
                        <td className="border px-4 py-2 flex items-center">
                          {test.total_time} mins{" "}
                          <MdAccessTime className="ml-1" />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div className="mt-8 p-6 bg-blue-100 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-4 text-blue-800">
            Invitation to Attempt Assessment
          </h3>
          <p className="text-lg text-center text-blue-700 mb-4">
            Please forward this link to the candidate to take the assessment:
          </p>

          <div className="flex items-center justify-center relative w-full max-w-lg mx-auto mb-4">
            <input
              type="text"
              value={assessmentData?.shareablelink || ""}
              readOnly
              className="flex-1 border border-blue-300 rounded-lg py-2 pl-4 pr-10 bg-white text-gray-700 shadow-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={copyToClipboard}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-200 hover:bg-blue-300 text-blue-600 p-2 rounded transition duration-300 ease-in-out"
            >
              <FiCopy size={20} />
            </button>
          </div>
          {copySuccess && (
            <p className="text-center text-green-500 animate__animated animate__fadeIn">
              Link copied to clipboard!
            </p>
          )}

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleInviteButtonClick}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition transform duration-300 ease-in-out hover:scale-105 shadow-lg"
            >
              Invite via Email
            </button>
            {/* <button
              onClick={redirectToDashboard}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition transform duration-300 ease-in-out hover:scale-105 shadow-lg"
            >
              Back to Dashboard
            </button> */}
          </div>
        </div>

        <InviteModal showModal={showModal} handleClose={handleCloseModal} />
      </Container>
    </div>
  );
};

export default PreviewExistingAssessment;