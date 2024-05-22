import React, { useState } from "react";
import { MdCelebration } from 'react-icons/md';
import { FiCopy } from 'react-icons/fi';
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
    <div className="bg-white min-h-screen flex flex-col px-6 py-10 relative">
      <div className="absolute top-5 left-5 right-0 flex items-center">
        <MdCelebration className="text-yellow-300 animate-bounce" size={28} />
        <h2 className="ml-3 text-3xl font-semibold">Congratulations! Your Assessment is Live</h2>
      </div>
      <h3 className="mt-16 text-xl font-medium">Assessment Name: {Name}</h3>
      <p className="mt-4">Forward this link to the candidate to take up the assessment:</p>

      <div className="mt-6 flex items-center relative">
        <input
          type="text"
          value={link}
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
    </div>
  );
};

export default InviteCandidate;