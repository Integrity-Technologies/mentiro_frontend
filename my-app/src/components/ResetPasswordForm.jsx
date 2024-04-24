import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { resetPassword } from "../actions/authActions";
import { Button, FormControl, FormLabel, Alert } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
const logoImage = "/assets/icon.jpg";

function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setAlert({ variant: "danger", message: "Passwords don't match" });
      return;
    }

    // Dispatch the resetPassword action
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const result = await dispatch(
      resetPassword({ token, newPassword, confirmPassword })
    );

    if (result.success) {
      setAlert({ variant: "success", message: "Password reset successful" });
      navigate("/");
    } else {
      setAlert({
        variant: "danger",
        message: result.error || "Failed to reset password",
      });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Form
            className="border border-2 gap p-4 mt-5"
            onSubmit={handleSubmit}
          >
            <h2 className="text-center">Reset Password</h2>
            <div className="d-flex justify-content-center">
              <img
                src={logoImage}
                alt="Logo"
                className="rounded-circle img-fluid"
                width="100"
              />
            </div>
            {alert && (
              <Alert variant={alert.variant} className="my-3">
                {alert.message}
              </Alert>
            )}
            <Form.Group className="mb-3" controlId="formNewPassword">
              <FormLabel>New Password:</FormLabel>
              <FormControl
                type="password"
                value={newPassword}
                placeholder="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <FormLabel>Confirm Password:</FormLabel>
              <FormControl
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="dark" type="submit">
              Reset Password
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
