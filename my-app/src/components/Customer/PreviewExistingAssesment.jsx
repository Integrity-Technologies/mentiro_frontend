import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAssessmentByUniqueLink } from "../../actions/AssesmentAction";
import InviteModal from "./Invitemodal";
import { FiCopy } from "react-icons/fi";
import { FaClipboardList, FaUser } from "react-icons/fa";
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
    <div className="container mx-auto p-4 bg-white shadow-md rounded animate__animated animate__fadeIn">
      <Container>
        {assessmentData && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-center mb-8 flex items-center ">
              <FaClipboardList className="mr-2" />
              <span>Assessment Preview</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex flex-col bg-gray-50 rounded-lg shadow-md p-4 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  Assessment Name:
                </h3>
                <p className="text-lg font-bold text-gray-900">
                  {assessmentData.assessment_name}
                </p>
              </div>
              <div className="flex flex-col bg-gray-50 rounded-lg shadow-md p-4 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  Total Tests:
                </h3>
                <p className="text-lg font-bold text-gray-900">
                  {assessmentData.tests.length}
                </p>
              </div>
              <div className="flex flex-col bg-gray-50 rounded-lg shadow-md p-4 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  Assessment Time:
                </h3>
                <div className="flex items-center">
                  <span className="inline-block px-2 py-1 bg-category-tag-bg text-black text-sm font-semibold rounded-full flex items-center">
                    <span className="text-lg font-bold  mr-2 text-black">
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
                <FaClipboardList className="mr-2" />
                Selected Tests
              </h3>
              <table className="min-w-full divide-y divide-gray-200 shadow-md">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Test Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assessmentData.tests &&
                    assessmentData.tests.map((test, index) => (
                      <tr
                        key={index}
                        className="hover:bg-blue-100 cursor-pointer transition duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {test.test_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
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
        <div className="mt-8 p-6  rounded-lg shadow-lg">
        <div className="flex items-center mb-4">
  <FaUser className="-mt-1 text-2xl mr-2" />
  <h3 className="text-2xl font-bold text-black mt-1">Invite Candidate</h3>
</div>
          <p className="text-sm  text-black mb-4">
            To invite the candidate, simply copy the link provided or send it
            directly through email.{" "}
          </p>

          <div className="mt-6 flex items-center relative w-full max-w-lg">
            <input
              type="text"
              value={assessmentData?.shareablelink || ""}
              readOnly
              className="flex-1 border border-gray-300 rounded-lg py-2 pl-4 pr-10 bg-white-100 text-white-700 shadow-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={copyToClipboard}
              className="text-gray-600 flex p-2 rounded transition duration-300 ease-in-out bg-gray-200 hover:bg-gray-300"
            >
              <FiCopy size={20} />
              <span className="ml-2">Copy Link</span>
            </button>
          </div>

          {copySuccess && (
            <p className=" text-green-500 animate__animated animate__fadeIn mt-1">
              Source link copied!
            </p>
          )}

          <div className="flex justify-end space-x-4">
            <button
              onClick={handleInviteButtonClick}
              className="bg-black hover:bg-black text-white font-semibold py-2 px-6 rounded-lg transition transform duration-300 ease-in-out hover:scale-105 shadow-lg"
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
