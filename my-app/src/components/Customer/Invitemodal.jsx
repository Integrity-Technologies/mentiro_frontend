import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaUser } from "react-icons/fa"; // Import FaUser icon
import { useDispatch } from "react-redux";
import { InviteAssessment } from "../../actions/AssesmentAction";

const InviteModal = ({ showModal, handleClose }) => {
  const [candidateName, setCandidateName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [emailSent, setEmailSent] = useState(false); // Track email sent status
  const [errors, setErrors] = useState({}); // State for validation errors
  const dispatch = useDispatch();

  const assessmentData = JSON.parse(localStorage.getItem("assessmentResponse"));
  const assessmentId = assessmentData.id;

  const handleSendInvite = async () => {
    // Validation check
    if (!firstName.trim() || !candidateName.trim() || !candidateEmail.trim()) {
      setErrors({
        firstName: !firstName.trim() ? "First Name is required" : "",
        candidateName: !candidateName.trim() ? "Last Name is required" : "",
        candidateEmail: !candidateEmail.trim() ? "Email is required" : ""
      });
      return;
    }

    const invitationData = {
      firstName: firstName.trim(),
      lastName: candidateName.trim(),
      candidateEmail: candidateEmail.trim(),
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
        <Modal.Title className="text-3xl font-bold text-center mb-8 flex items-center justify-center">
          <FaUser className="mr-2" /> Invite Candidate {/* Add FaUser icon */}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!emailSent && ( // Render input fields only if email not sent
          <Form>
            <div className="relative mb-4">
              <input
                type="text"
                id="firstName"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label
                htmlFor="firstName"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                First Name
              </label>
              </div>
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            <div className="relative mb-4">
              <input
                type="text"
                id="candidateName"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"

                placeholder=" "
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
              />
              <label
                htmlFor="candidateName"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                Last Name
              </label>
              {errors.candidateName && (
                <p className="text-red-500 text-sm mt-1">{errors.candidateName}</p>
              )}
            </div>
            <div className="relative">
              <input
                type="email"
                id="candidateEmail"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={candidateEmail}
                onChange={(e) => setCandidateEmail(e.target.value)}
              />
              <label
                htmlFor="candidateEmail"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                Candidate Email
              </label>
              {errors.candidateEmail && (
                <p className="text-red-500 text-sm mt-1">{errors.candidateEmail}</p>
              )}
            </div>
          </Form>
        )}
        {emailSent && ( // Show success message if email sent
          <p>Email Sent Successfully</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!emailSent ? ( // Render buttons only if email not sent
          <>
            <Button variant="primary" onClick={handleSendInvite}>
              Invite
            </Button>
          </>
        ) : (
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
        )}
      </Modal.Footer>
      {/* Alert component */}
      {/* {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <p className="text-green-500">Email Sent Successfully</p>
          </div>
        </div>
      )} */}
    </Modal>
  );
};

export default InviteModal;
