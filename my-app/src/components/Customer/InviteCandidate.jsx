import React, { useState } from "react";
import { MdCelebration } from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import { FiPenTool } from "react-icons/fi";
import { BsBuildingsFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa";
import {FaLocationDot} from "react-icons/fa6"
import InviteModal from "./Invitemodal";
import { useTranslation } from "react-i18next";

const InviteCandidate = ({ handleBackButtonClick }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const assessmentData = JSON.parse(localStorage.getItem("assessmentResponse"));
  const link = assessmentData?.shareablelink;
  const Name = assessmentData?.assessment_name;
  const JobRole = assessmentData?.job_role_name;
  const WorkArrangement = assessmentData?.work_arrangement_name;
  const JobLocation = assessmentData?.job_location_name;
  const Time = assessmentData?.assessment_time;

  // const handleInviteButtonClick = () => {
  //   setShowModal(true);
  // };

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

  // const redirectToDashboard = () => {
  //   window.location.href = "/customer-dashboard"; // Redirect using window.location
  // };

  return (
    <div className="bg-white min-h-screen flex flex-col mt-10 px-6 py-10 relative animate__animated animate__fadeIn font-roboto">
      {!showModal && (
        <div>
          <h3 className="text-2xl -mt-8 font-medium ml-1">Assessment Link</h3>
          <div className="flex  absolute bg-blue-200 mt-8 left-0 right-0 py-2 px-4 mx-4 animate__animated animate__bounceInDown rounded-sm">
            <h2 className="text-2xl mt-2 font-semibold text-blue-900 text-center">
              {t("InviteCandidate.congratulation")}
            </h2>
          </div>
        </div>
      )}
      <div className="flex flex-col p-0 mt-32 transition duration-300 ">
        <h3 className="text-sm font-medium mb-1 text-gray-700">
          {t("PreviewAssessment.name")}
        </h3>
        <p className="text-2xl font-medium text-gray-900">
          {Name}
        </p>
      </div>

      {/* New Part Start */}
      <div className="flex items-center gap-8 p-10">
        <div className="flex flex-col items-center">
          <FiPenTool className="text-2xl font-semibold text-blue-900 mb-0" />
          <div className="flex flex-col item-center text-center p-2 transition duration-300">
            <h3 className="text-lg whitespace-nowrap font-medium text-gray-600">
              {t("PreviewAssessment.jobrole")}
            </h3>
            <p className="text-md font-medium whitespace-nowrap text-gray-500 mt-0 text-center">
              {JobRole}
            </p>
          </div>
        </div>

        <div className="border-l-2 border-gray-300 h-28 mx-8"></div>

        <div className="flex flex-col items-center">
          <BsBuildingsFill className="text-2xl text-blue-900 mb-0" />
          <div className="flex flex-col text-center p-2 transition duration-300">
            <h3 className="text-lg font-medium whitespace-nowrap text-gray-600">
              {t("PreviewAssessment.workarrangement")}
            </h3>
            <p className="text-md font-medium text-gray-500 mt-0 text-center">
              {WorkArrangement}
            </p>
          </div>
        </div>

        <div className="border-l-2 border-gray-300 h-28 mx-8"></div>

        <div className="flex flex-col items-center">
          <FaLocationDot className="text-2xl text-blue-900 mb-0" />
          <div className="flex flex-col text-center p-2 transition duration-300">
            <h3 className="text-lg font-medium whitespace-nowrap text-gray-600">
              {t("PreviewAssessment.joblocation")}
            </h3>
            <p className="text-md font-medium text-gray-500 mt-0 text-center">
              {JobLocation}
            </p>
          </div>
        </div>

        <div className="border-l-2 border-gray-300 h-28 mx-8"></div>

        <div className="flex flex-col items-center -ml-6">
          <FaClock className="text-2xl text-blue-900 mb-0" />
          <div className="flex flex-col text-center p-2 transition duration-300">
            <h3 className="text-lg font-medium whitespace-nowrap text-gray-600">
              {t("PreviewAssessment.time")}
            </h3>
            <p className="text-md font-bold text-gray-500 mt-0 text-center">
              {Time}
            </p>
          </div>
        </div>
      </div>
      {/* New Part End */}

      <p className="mt-4 text-black">{t("InviteCandidate.invite")}</p>
      <div className="mt-4 w-full max-w-lg">
        <h2 className="text-sm font-medium text-gray-500 mb-2">Assessment URL</h2>
        <div className="items-center relative">
          <input
            type="text"
            value={link}
            readOnly
            className="flex-1 border w-full border-gray-900 rounded-sm py-2 pl-2 pr-10 transition duration-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-blue-500"
          />
          <button
            onClick={copyToClipboard}
            className="text-white ml-0 mt-3 flex p-2 rounded transition duration-300 ease-in-out bg-blue-900 hover:bg-blue-800"
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

      <InviteModal showModal={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default InviteCandidate;
