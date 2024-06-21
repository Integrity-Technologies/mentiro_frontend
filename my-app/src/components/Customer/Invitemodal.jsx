// import React, { useState, useEffect } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import { FaUser } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { InviteAssessment } from "../../actions/AssesmentAction";

// const InviteModal = ({ showModal, handleClose }) => {
//   const [candidateName, setCandidateName] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [candidateEmail, setCandidateEmail] = useState("");
//   const [showAlert, setShowAlert] = useState(false);
//   const [emailSent, setEmailSent] = useState(false);
//   const [errors, setErrors] = useState({});
//   const dispatch = useDispatch();

//   const assessmentData = JSON.parse(localStorage.getItem("assessmentResponse"));
//   const assessmentId = assessmentData?.id;

//   const handleSendInvite = async () => {
//     if (!firstName.trim() || !candidateName.trim() || !candidateEmail.trim()) {
//       setErrors({
//         firstName: !firstName.trim() ? "First Name is required" : "",
//         candidateName: !candidateName.trim() ? "Last Name is required" : "",
//         candidateEmail: !candidateEmail.trim() ? "Email is required" : ""
//       });
//       return;
//     }

//     const invitationData = {
//       firstName: firstName.trim(),
//       lastName: candidateName.trim(),
//       candidateEmail: candidateEmail.trim(),
//       assessmentId
//     };

//     try {
//       const responseData = await dispatch(InviteAssessment(invitationData));
//       // console.log("Invitation sent successfully:", responseData);
//       setEmailSent(true);
//       setShowAlert(true);
//     } catch (error) {
//       console.error("Error sending invitation:", error);
//     }
//   };

//   useEffect(() => {
//     let timeoutId;
//     if (showAlert) {
//       timeoutId = setTimeout(() => {
//         setShowAlert(false);
//       }, 3000);
//     }
//     return () => {
//       clearTimeout(timeoutId);
//     };
//   }, [showAlert]);

//   return (
// <Modal show={showModal} onHide={handleClose} size="lg">
// <Modal.Header closeButton>
//   <Modal.Title className="text-3xl font-bold text-center mb-8 flex items-center justify-center">
//     <FaUser className="mr-2" /> Invite Candidate
//   </Modal.Title>
// </Modal.Header>


//       <Modal.Body>
//         {!emailSent && (
//           <Form>
//             <table className="w-full mb-4 border-separate border border-gray-300" style={{ borderSpacing: '0 15px' }}>
//               <thead>
//                 <tr className="bg-gray-200 border border-gray-300">
//                   <th className="text-left px-2 py-2 border border-gray-300">First Name</th>
//                   <th className="text-left px-2 py-2 border border-gray-300">Last Name</th>
//                   <th className="text-left px-2 py-2 border border-gray-300">Email</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="relative w-1/3 px-2  border-gray-300">
//                     <input
//                       type="text"
//                       id="firstName"
//                       className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                       placeholder=" "
//                       value={firstName}
//                       onChange={(e) => setFirstName(e.target.value)}
//                     />
//                     <label
//                       htmlFor="firstName"
//                       className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
//                     >
//                       First Name
//                     </label>
//                     {errors.firstName && (
//                       <p className="text-red-500 text-sm">{errors.firstName}</p>
//                     )}
//                   </td>
//                   <td className="relative w-1/3 px-2  border-gray-300">
//                     <input
//                       type="text"
//                       id="candidateName"
//                       className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                       placeholder=" "
//                       value={candidateName}
//                       onChange={(e) => setCandidateName(e.target.value)}
//                     />
//                     <label
//                       htmlFor="candidateName"
//                       className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
//                     >
//                       Last Name
//                     </label>
//                     {errors.candidateName && (
//                       <p className="text-red-500 text-sm mt-1">{errors.candidateName}</p>
//                     )}
//                   </td>
//                   <td className="relative w-1/3 px-2  border-gray-300">
//                     <input
//                       type="email"
//                       id="candidateEmail"
//                       className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                       placeholder=" "
//                       value={candidateEmail}
//                       onChange={(e) => setCandidateEmail(e.target.value)}
//                     />
//                     <label
//                       htmlFor="candidateEmail"
//                       className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
//                     >
//                       Candidate Email
//                     </label>
//                     {errors.candidateEmail && (
//                       <p className="text-red-500 text-sm mt-1">{errors.candidateEmail}</p>
//                     )}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </Form>
//         )}
//         {emailSent && (
//           <p>Email Sent Successfully</p>
//         )}
//       </Modal.Body>
//       <Modal.Footer>
//         {!emailSent ? (
//           <>
//             <Button variant="dark" onClick={handleSendInvite}>
//               Invite
//             </Button>
//           </>
//         ) : (
//           <Button variant="dark" onClick={handleClose}>
//             Close
//           </Button>
//         )}
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default InviteModal;
