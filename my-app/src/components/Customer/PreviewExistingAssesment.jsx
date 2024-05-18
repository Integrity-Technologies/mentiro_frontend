import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux"; // Import useDispatch to access the dispatch function
import { getAssessmentByUniqueLink } from "../../actions/AssesmentAction";
import { Container, Button } from "react-bootstrap";
import InviteModal from "./Invitemodal";

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

        <div className="border border-gray-400 rounded-md p-2 flex items-center mb-4">
          <input
            type="text"
            value={assessmentData?.shareablelink || ""}
            readOnly
            className="flex-1 mr-2 border-0 border-none"
          />
          <button
            onClick={copyToClipboard}
            className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded-md"
          >
            Copy
          </button>
        </div>

        {copySuccess && <p className="text-green-500">Link copied!</p>}

        <div className="flex mb-4">
          {" "}
          {/* Wrap the buttons in a flex container */}
          <Button
            variant="dark"
            onClick={handleInviteButtonClick}
            className="mr-3"
          >
            Invite via Email
          </Button>
          <Button variant="dark" onClick={redirectToDashboard}>
            Back
          </Button>
        </div>

        <InviteModal showModal={showModal} handleClose={handleCloseModal} />

        {assessmentData && (
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-center mb-8">
              Assessment Preview
            </h2>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title className="text-xl font-semibold mb-4">
                  Assessment Details
                </Card.Title>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold">Assessment Name:</p>
                    <p className="text-lg">{assessmentData.assessment_name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Total Tests:</p>
                    <p className="text-lg">{assessmentData.tests.length}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Assessment Time:</p>
                    <p className="text-lg">
                      {assessmentData.assessment_time} mins{" "}
                      <i className="far fa-clock ml-1"></i>
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <div>
              <h3 className="text-lg font-semibold mb-4">Selected Tests</h3>
              <table className="w-full border-collapse border border-gray-300">
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
                      <tr key={index} className="border-b border-gray-300">
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
