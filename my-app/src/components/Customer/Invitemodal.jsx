import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { InviteAssessment } from "../../actions/AssesmentAction";

const InviteModal = ({ showModal, handleClose }) => {
  const [candidateName, setCandidateName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false); 
  const [emailSent, setEmailSent] = useState(false); // Track email sent status
  const dispatch = useDispatch();

  const assessmentData = JSON.parse(localStorage.getItem("assessmentResponse"));
  const assessmentId = assessmentData.id;

  const handleSendInvite = async () => {
    console.log("Sending invitation to:", candidateName, candidateEmail);

    const invitationData = {
      firstName: firstName,
      lastName: candidateName,
      candidateEmail,
      assessmentId
    };

    try {
      const responseData = await dispatch(InviteAssessment(invitationData));
      console.log("Invitation sent successfully:", responseData);
      setEmailSent(true); // Update email sent status
      setShowAlert(true);
    } catch (error) {
      console.error("Error sending invitation:", error);
    }
  };

  useEffect(() => {
    let timeoutId;
    if (showAlert) {
      timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [showAlert]);

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Invite Candidate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!emailSent && ( // Render input fields only if email not sent
          <Form>
            <Form.Group controlId="FirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="LastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last name"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="candidateEmail">
              <Form.Label>Candidate Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter candidate email"
                value={candidateEmail}
                onChange={(e) => setCandidateEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        )}
        {emailSent && ( // Show success message if email sent
          <p>Email Sent Successfully</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!emailSent ? ( // Render buttons only if email not sent
          <>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="dark" onClick={handleSendInvite}>
              Send Invitation
            </Button>
          </>
        ) : (
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
        )}
      </Modal.Footer>
      {/* Alert component */}
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <p className="text-green-500">Email Sent Successfully</p>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default InviteModal;
