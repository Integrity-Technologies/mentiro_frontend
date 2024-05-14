import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { logout } from "../actions/authActions"; // Adjust the path as needed
import { Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LanguageToggleButton = ({ isSetLanguageButton, onLanguageChange }) => {
  const { i18n } = useTranslation();
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const currentLanguage = i18n.language;

  const dispatch = useDispatch();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    onLanguageChange(lng);
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      navigate("/");
    }, 2000); // 3000 milliseconds = 3 seconds, adjust as needed
  };

  return (
    <div>
      {isSetLanguageButton && (
        <div className="flex">
          <button
            className={`${
              currentLanguage === "en"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } px-4 py-2 rounded-l-md`}
            onClick={() => changeLanguage("en")}
          >
            English
          </button>
          <button
            className={`${
              currentLanguage === "ar"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } px-4 py-2 rounded-r-md`}
            onClick={() => changeLanguage("ar")}
          >
            Arabic
          </button>
        </div>
      )}
      <div className="fixed-bottom ml-md-5">
        {showAlert && (
          <Alert variant="danger" className="w-25">
            Logout successful.
          </Alert>
        )}
        <Button onClick={handleLogout} variant="danger" className="ml-md-25">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default LanguageToggleButton;
