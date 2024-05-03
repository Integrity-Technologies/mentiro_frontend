import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import Candidate from "./Candidate";

const InviteCandidate = ({ handleBackButtonClick }) => {
  const [showCandidate, setShowCandidate] = useState(false);

  const handleSubmitButtonClick = () => {
    setShowCandidate(true);
  };

  //   const handleInviteClick = () => {
  //     // Replace 'mailto:' with the email address you want to redirect to
  //     // window.location.href = 'mailto:example@example.com';
  //   };

  return (
    <div>
      {showCandidate ? (
        <Candidate handleBackButtonClick={handleBackButtonClick} />
      ) : (
        <div>
          <Container
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <h1 className="text-center mb-4">Invite Candidate via Email</h1>
            <Button variant="primary">
              Invite
            </Button>
          </Container>
        </div>
      )}
    </div>
  );
};

export default InviteCandidate;
