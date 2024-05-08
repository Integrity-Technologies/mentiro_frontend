import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../actions/authActions";
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

    if (newPassword !== confirmPassword) {
      setAlert({ variant: "danger", message: "Passwords don't match" });
      return;
    }

    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    const result = await dispatch(
      resetPassword({ token, newPassword, confirmPassword })
    );

    if (result.success) {
      setAlert({ variant: "success", message: "Password reset successful" });
      setTimeout(() => navigate("/"), 2000); // success
    } else {
      setAlert({
        variant: "danger",
        message: result.error || "Failed to reset password",
      });
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto h-screen flex justify-center items-center">
        <div className="max-w-md w-full">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <h2 className="text-center">Reset Password</h2>
            <div className="d-flex justify-center">
              <img
                src={logoImage}
                alt="Logo"
                className="rounded-circle img-fluid"
                width="100"
              />
            </div>
            {alert && (
              <div
                className={`${
                  alert.variant === "success"
                    ? "bg-green-100 border-green-400 text-green-700"
                    : "bg-red-100 border-red-400 text-red-700"
                } border-l-4 p-1 my-4`}
                role="alert"
              >
                <p>{alert.message}</p>
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                New Password:
              </label>
              <input
                type="password"
                value={newPassword}
                placeholder="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  alert && alert.variant === "danger" ? "border-red-500" : ""
                }`}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password:
              </label>
              <input
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  alert && alert.variant === "danger" ? "border-red-500" : ""
                }`}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ResetPasswordForm;
