import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../actions/authActions";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash, FaTimesCircle, FaCheckCircle } from "react-icons/fa"; // Import eye icons
const logo = "/assets/logo.png";
const loginimg = "/assets/loginimg.png";

function ResetPasswordForm() {
  const { t } = useTranslation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useParams(); // Get the token from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setAlert({ variant: "danger", message: "Passwords don't match" });
      return;
    }

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="flex flex-col md:flex-row min-h-screen font-roboto">
      {/* Left Side - Dark Blue Box */}
      <div className="relative hidden md:flex flex-col justify-center items-center w-full md:w-1/2 bg-blue-900 text-white p-10">
        <img src={logo} alt="Mentiro Logo" className="mb-6" />
        <div className="text-center max-w-lg z-10 relative">
          <h1 className="text-4xl font-bold mb-4">
            Secure Your Account with a New Password
          </h1>
          <p className="text-lg mb-8">
            It's important to use a strong, unique password to protect your
            account and personal information.
          </p>
        </div>
        <img
          src={loginimg}
          alt="Shadow Lady"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
      </div>
      {/* Right Side - Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-10">
        <div className="w-full max-w-lg">
          <div className="mb-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Reset Password
            </h1>
            <p className="text-lg text-gray-700">
              Enter your new password below to reset your account.
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {alert && (
              <div
                className={`${
                  alert.variant === "success"
                    ? "bg-green-100 border border-green-400 text-green-700"
                    : "bg-red-100 border border-red-400 text-red-700"
                } p-3 my-4 rounded-lg flex items-center`}
                role="alert"
              >
                {alert.variant === "success" ? (
                  <>
                    <FaCheckCircle className="text-green-500 mr-2" />
                    <strong className="font-bold">Success: </strong>
                    <span className="ml-1">{alert.message}</span>
                  </>
                ) : (
                  <>
                    <FaTimesCircle className="text-red-500 mr-2" />
                    <strong className="font-bold">Error: </strong>
                    <span className="ml-1">{alert.message}</span>
                  </>
                )}
              </div>
            )}

            <div className="mb-3">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  placeholder=""
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  required
                />
                <label
                  htmlFor="newPassword"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                New Password
                </label>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500 cursor-pointer" onClick={togglePasswordVisibility} />
                  ) : (
                    <FaEye className="text-gray-500 cursor-pointer" onClick={togglePasswordVisibility} />
                  )}
                </span>
              </div>
            </div>
            <div className="mb-3">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  placeholder=""
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  required
                />
                <label
                  htmlFor="confirmPassword"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Confirm Password
                </label>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500 cursor-pointer" onClick={togglePasswordVisibility} />
                  ) : (
                    <FaEye className="text-gray-500 cursor-pointer" onClick={togglePasswordVisibility} />
                  )}
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ResetPasswordForm;
