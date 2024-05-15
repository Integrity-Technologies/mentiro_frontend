import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import Candidate from "./Candidate";
import InviteModal from "./Invitemodal";

const InviteCandidate = ({ handleBackButtonClick }) => {
  const [showModal, setShowModal] = useState(false);

  const handleInviteButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };



  return (
   
        <div className="bg-white p-8 flex justify-center items-center h-screen relative">
          <Container>
            <h2 className="absolute top-3 left-5 right-0">Congratulation! Your Assessment is Live</h2>
            <h3 className="absolute top-20 left-5 right-0">Assessment Name: XYZ Assessment</h3>
            <p className="absolute top-40 left-5 right-0">Forward this link to the candidate to take up the assessment:</p>

            <div className="absolute top-56 left-5 right-0 border border-gray-400 rounded-md p-2 flex items-center">
              <input
                type="text"
                value="https://dummy-link.com"
                readOnly
                className="flex-1 mr-2 border-0"
              />
              <button className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded-md">
                Copy
              </button>
            </div>

            <Button variant="dark" onClick={handleInviteButtonClick} className="mt-4 left-0">
          Invite email
        </Button>

        <InviteModal showModal={showModal} handleClose={handleCloseModal} />
          </Container>
        </div>
      
  );
};

export default InviteCandidate;
