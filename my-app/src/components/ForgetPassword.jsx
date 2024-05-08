import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../actions/authActions";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ForgetPassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error); // Retrieve error from Redux state
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      email: formData.get("email"),
    };
    const newErrors = {};
    if (!userData.email) {
      newErrors.email = t("forgetPassword.errors.emailRequired");
    } else if (!validateEmail(userData.email)) {
      newErrors.email = t("forgetPassword.errors.emailInvalid");
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        await dispatch(forgotPassword(userData));
        setIsSubmitted(true);
        setResetMessage("Password reset instructions have been sent to your email. Please check your inbox.");
      } catch (error) {
        console.error("Password reset failed:", error);
        // setErrors({ server: t("forgetPassword.errors.serverError") });
      }
    } else {
      setErrors(newErrors);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto h-screen flex justify-center items-center">
        <div className="max-w-md w-full">
          {!isSubmitted && (
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h4 className="text-center font-bold text-xl mb-4">
                {t("forgetPassword.title")}
              </h4>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  {t("forgetPassword.email")}
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder={t("forgetPassword.enterEmail")}
                  className={` appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs italic">{errors.email}</p>
                )}
              </div>
              {authError && <p className="text-red-500 text-xs italic">{authError}</p>} {/* Display error message */}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {t("forgetPassword.submit")}
                </button>
              </div>
            </form>
          )}
          {isSubmitted && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4" role="alert">
              <p className="text-center">{resetMessage}</p>
            </div>
          )}
          <div className="text-center mt-4">
            <NavLink to="/" className="text-sm font-bold text-blue-500 hover:text-blue-800">
              {t("common.back")}
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
