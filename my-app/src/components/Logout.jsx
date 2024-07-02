import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../actions/authActions"; // Adjust the path as needed
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Logout() {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  //   const history = useHistory();

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
      <h2>Logout</h2>
      <p>Are you sure you want to logout?</p>
      <button onClick={handleLogout}>Logout</button>
      {showAlert && (
        <Alert variant="success" className="mt-3">
          Logout successful. Redirecting to login page...
        </Alert>
      )}
    </div>
  );
}

export default Logout;
