import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import Candidate from "./Candidate";
import InviteModal from "./Invitemodal";

const InviteCandidate = ({ handleBackButtonClick }) => {
  const [showModal, setShowModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const assessmentData = JSON.parse(localStorage.getItem("assessmentResponse"));
  const link = assessmentData.shareablelink;
  const Name = assessmentData.assessment_name;

  const handleInviteButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link).then(function() {
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000); // Hide message after 2 seconds
    }, function(err) {
      console.error('Unable to copy to clipboard:', err);
    });
  };

  const redirectToDashboard = () => {
    window.location.href = "/customer-dashboard"; // Redirect using window.location
  };

  return (
    <div className="bg-white p-8 flex justify-center items-center h-screen relative">
      <Container>
        <h2 className="absolute top-3 left-5 right-0">Congratulations! Your Assessment is Live</h2>
        <h3 className="absolute top-20 left-5 right-0">Assessment Name: {Name}</h3>
        <p className="absolute top-40 left-5 right-0">Forward this link to the candidate to take up the assessment:</p>

        <div className="absolute top-56 left-5 right-0 border border-gray-400 rounded-md p-2 flex items-center">
          <input
            type="text"
            value={link}
            readOnly
            className="flex-1 mr-2 border-0 border-none border-white"
          />
          <button onClick={copyToClipboard} className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded-md">
            Copy
          </button>
        </div>

        {copySuccess && <p className="absolute top-45 left-5 right-0 text-green-500">Link copied!</p>}

        <Button variant="dark" onClick={handleInviteButtonClick} className="mt-4 left-0">
          Invite email
        </Button>

        <Button variant="dark" onClick={redirectToDashboard} className="mt-4 ml-3"> {/* Back Button */}
          Back
        </Button>

        <InviteModal showModal={showModal} handleClose={handleCloseModal} />
      </Container>
    </div>
  );
};

export default InviteCandidate;
