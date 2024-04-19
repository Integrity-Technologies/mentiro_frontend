import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { logout } from "../actions/authActions"; // Adjust the path as needed
import { Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LanguageToggleButton = ({ onLanguageChange }) => {
  const { i18n } = useTranslation();
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

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
      <Button onClick={() => changeLanguage("en")}>English</Button>
      <Button onClick={() => changeLanguage("ar")}>العربية</Button>
      <Button onClick={handleLogout}>Logout</Button>
      {showAlert && (
        <Alert variant="success" className="mt-3">
          Logout successful.
        </Alert>
      )}
    </div>
  );
};

export default LanguageToggleButton;
