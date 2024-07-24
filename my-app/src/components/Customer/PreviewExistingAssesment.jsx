import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAssessmentByUniqueLink } from "../../actions/AssesmentAction";
import InviteModal from "./Invitemodal";
import { FiCopy } from "react-icons/fi";
import { FaClipboardList, FaUser, FaClock } from "react-icons/fa";
import { FiPenTool } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import { BsBuildingsFill } from "react-icons/bs";
import { MdAccessTime } from "react-icons/md";
import { Container } from "react-bootstrap";

const PreviewExistingAssessment = () => {
  const [showModal, setShowModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const dispatch = useDispatch();
  const [assessmentData, setAssessmentData] = useState(null);

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
    const textToCopy = assessmentData?.shareablelink || "";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(
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
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 2000);
      } catch (err) {
        console.error("Unable to copy to clipboard:", err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-blue-100 shadow-md rounded animate__animated animate__fadeIn">
      <Container>
        {assessmentData && (
          <div className="mt-8 p-6 bg-white shadow-lg rounded-lg">
            <div>
              <h3 className="text-2xl font-medium mb-8 ">
                <span>Assessment Preview</span>
              </h3>
            </div>
            <div className="flex  gap-8 p-0 mt-16">
              <div className="flex flex-col">
                <h3 className="text-sm font-medium mb-1 text-gray-700">
                  Assessment Name
                </h3>
                <p className="text-2xl font-medium text-gray-900">
                  {assessmentData.assessment_name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8 p-10">
              <div className="flex flex-col items-center">
                <FiPenTool className="text-2xl font-semibold text-blue-900 mb-0" />
                <div className="flex flex-col item-center text-center p-2 transition duration-300">
                  <h3 className="text-lg whitespace-nowrap font-medium text-gray-600">
                    Job Role
                  </h3>
                  <p className="text-md font-medium whitespace-nowrap text-gray-500 mt-0 text-center">
                    {assessmentData.job_role_name}
                  </p>
                </div>
              </div>

              <div className="border-l-2 border-gray-300 h-28 mx-8"></div>

              <div className="flex flex-col items-center">
                <BsBuildingsFill className="text-2xl text-blue-900 mb-0" />
                <div className="flex flex-col text-center p-2 transition duration-300">
                  <h3 className="text-lg font-medium whitespace-nowrap text-gray-600">
                    Work Arrangement
                  </h3>
                  <p className="text-md font-medium text-gray-500 mt-0 text-center">
                    {assessmentData.work_arrangement_name}
                  </p>
                </div>
              </div>

              <div className="border-l-2 border-gray-300 h-28 mx-8"></div>

              <div className="flex flex-col items-center">
                <FaLocationDot className="text-2xl text-blue-900 mb-0" />
                <div className="flex flex-col text-center p-2 transition duration-300">
                  <h3 className="text-lg font-medium whitespace-nowrap text-gray-600">
                    Job Location
                  </h3>
                  <p className="text-md font-medium text-gray-500 mt-0 text-center">
                    {assessmentData.job_location_name}
                  </p>
                </div>
              </div>

              <div className="border-l-2 border-gray-300 h-28 mx-8"></div>

              <div className="flex flex-col items-center -ml-6">
                <FaClock className="text-2xl text-blue-900 mb-0" />
                <div className="flex flex-col text-center p-2 transition duration-300">
                  <h3 className="text-lg font-medium whitespace-nowrap text-gray-600">
                    Assessment Time
                  </h3>
                  <p className="text-md font-bold text-gray-500 mt-0 text-center">
                    {assessmentData.assessment_time}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8 mt-8">
              <h3 className="text-sm font-medium mb-4 flex items-center">
                Selected Tests
              </h3>
              <p className="text-lg font-medium text-gray-900 -mt-3">
                {assessmentData.tests.length} Test Selected
              </p>
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
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Question Split
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
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex items-center justify-center w-10 h-5 bg-green-600 text-xs text-white">
                              {test.test_difficulty.easy}
                            </div>
                            <div className="flex items-center justify-center w-10 h-5 bg-yellow-500 text-xs text-white">
                              {test.test_difficulty.medium}
                            </div>
                            <div className="flex items-center justify-center w-10 h-5 bg-red-500 text-xs text-white">
                              {test.test_difficulty.hard}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div className="flex ">
          <div className="mt-8 p-6 w-full rounded-lg shadow-lg bg-white">
            <div className="flex items-center mb-4">
              <FaUser className="-mt-1 text-2xl text-blue-900 mr-2" />
              <h3 className="text-2xl font-bold text-black mt-1">
                Invite Candidate
              </h3>
            </div>
            <p className="text-sm text-black mb-4">
              To invite the candidate, simply copy the link provided or send it
              directly through email.
            </p>

            <div className="mt-6 flex items-center relative w-full max-w-lg">
              <div className="w-full">
                <p className="text-sm text-gray-700 mb-2">Assessment URL:</p>
                <input
                  type="text"
                  value={assessmentData?.shareablelink || ""}
                  readOnly
                  className="flex-1 border w-full border-gray-300 rounded-lg py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            {copySuccess && (
              <p className="text-sm text-blue-900 mt-2">
                Link copied to clipboard!
              </p>
            )}
            <button
              onClick={copyToClipboard}
              className="text-white ml-0 mt-3 flex p-2 rounded transition duration-300 ease-in-out bg-blue-900 hover:bg-blue-800"
            >
              <FiCopy size={20} />
              <span className="ml-2">Copy Link</span>
            </button>
            <InviteModal show={showModal} onClose={handleCloseModal} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PreviewExistingAssessment;
