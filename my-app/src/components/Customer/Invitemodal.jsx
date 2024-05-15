import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const InviteModal = ({ showModal, handleClose }) => {
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");

  const handleSendInvite = () => {
    // Logic to send the invitation
    // You can add your logic here, such as sending an API request
    // to your backend to send the invitation email
    console.log("Sending invitation to:", candidateName, candidateEmail);

    // After sending the invitation, close the modal
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Invite Candidate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="candidateName">
            <Form.Label>Candidate Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter candidate name"
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="dark" onClick={handleSendInvite}>
          Send Invitation
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InviteModal;
