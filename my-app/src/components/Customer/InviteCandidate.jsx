import React, { useState } from "react";
import { MdCelebration } from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import InviteModal from "./Invitemodal";
import { useTranslation } from "react-i18next";

const InviteCandidate = ({ handleBackButtonClick }) => {
  const { t } = useTranslation();
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
    navigator.clipboard.writeText(link).then(
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
    <div className="bg-white min-h-screen flex flex-col mt-10  px-6 py-10 relative animate__animated animate__fadeIn">
      {!showModal && (
        <div className="absolute top-5 left-0 right-0 flex justify-center items-center animate__animated animate__bounceInDown">
          <MdCelebration className="text-yellow-300 animate-bounce" size={28} />
          <h2 className="ml-3 text-3xl font-semibold text-gray-800 text-center">
            {t("InviteCandidate.congratulation")}
          </h2>
        </div>
      )}
      <div className="flex items-start w-full mt-16">
        <label
          htmlFor="assessmentLabel"
          className="font-medium mt-2 text-black mr-2"
        >
          Assessment Name:
        </label>
        <input
          type="text"
          id="assessmentLabel"
          value={Name}
          readOnly
          className="p-2 rounded border border-gray-300 focus:outline-none w-50 "
        />
      </div>
      {/* <h3 className="mt-16 text-xl font-medium text-gray-700">
  {t("InviteCandidate.name")}: {Name}
</h3> */}

      <p className="mt-4 text-black">{t("InviteCandidate.invite")}</p>
      <div className="mt-2 w-full max-w-lg">
  <h2 className="text-lg font-semibold mb-2">URL</h2>
  <div className="flex items-center relative">
    <input
      type="text"
      value={link}
      readOnly
      className="flex-1 border border-gray-300 rounded-lg py-2 pl-4 pr-10 bg-white-100 text-white-700 shadow-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
    <button
      onClick={copyToClipboard}
      className="text-gray-600 ml-3 flex p-2 rounded transition duration-300 ease-in-out bg-gray-200 hover:bg-gray-300"
    >
      <FiCopy size={20} />
      <span className="ml-2">Copy Link</span>
    </button>
  </div>
</div>
      {copySuccess && (
        <p className="mt-2 text-black animate__animated animate__fadeIn">
          {t("InviteCandidate.linkcopied")}{" "}
        </p>
      )}

      {/* <div className="mt-8 flex justify-end space-x-4">
        <button
          onClick={handleInviteButtonClick}
          className="bg-black hover:bg-black text-white font-semibold py-2 px-6 rounded-lg transition transform duration-300 ease-in-out hover:scale-105 shadow-lg"
        >
          {t("InviteCandidate.inviteviaemail")}{" "}
        </button> */}
        {/* <button
          onClick={redirectToDashboard}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition transform duration-300 ease-in-out hover:scale-105 shadow-lg"
        >
          Back to Dashboard
        </button> */}
      {/* </div> */}

      <InviteModal showModal={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default InviteCandidate;
