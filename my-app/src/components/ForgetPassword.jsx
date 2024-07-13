import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../actions/authActions";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {FaCheckCircle} from "react-icons/fa"
const loginimg = "/assets/loginimg.png";
const logo = "/assets/logo.png"; 

const ForgetPassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);
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
        setResetMessage(
          "Password reset instructions have been sent to your email. Please check your inbox."
        );
      } catch (error) {
        console.error("Password reset failed:", error);
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
    <section className="flex flex-col md:flex-row min-h-screen font-roboto">
      {/* Left Side - Dark Blue Box */}
      <div className="relative hidden md:flex flex-col justify-center items-center w-full md:w-1/2 bg-blue-900 text-white p-10">
        <img src={logo} alt="Mentiro Logo" className="mb-6" />
        <div className="text-center max-w-lg z-10 relative">
          <h1 className="text-4xl font-bold mb-4">
            Revolutionize Your Hiring with Data-Driven Insights
          </h1>
          <p className="text-lg mb-8">
            With our <span className="bg-blue-400">Free</span> plan, you can efficiently screen candidates for essential skills, ensuring you select the best fit for a wide range of job roles. Start making smarter, evidence-based hiring decisions today!
          </p>
        </div>
        <img
          src={loginimg}
          alt="Shadow Lady"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
      </div>
      {/* Right Side - Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2  p-10">
        <div className="w-full max-w-lg">
          {!isSubmitted && (
            <form
              onSubmit={handleSubmit}
              className=" rounded px-8 pt-6 pb-8 mb-4"
            >
              <h4 className=" font-bold text-xl mb-2">
                {t("forgetPassword.title")}
              </h4>
              <p className=" text-gray-700 mb-4">
                Enter your email to receive your reset password link
              </p>
              <div className="relative mb-4">
                <input
                  type="email"
                  name="email"
                  id="floating_outlined"
                  placeholder=" "
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                <label
                  htmlFor="floating_outlined"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"                >
                  {t("forgetPassword.email")}
                </label>
                {errors.email && (
                  <p className="text-red-500 text-xs italic">{errors.email}</p>
                )}
              </div>
              {authError && (
                <p className="text-red-500 text-xs italic">{authError}</p>
              )}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="w-full text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                  {t("forgetPassword.submit")}
                </button>
              </div>
            </form>
          )}
          {isSubmitted && (
           <div className=" inset-0 flex items-center justify-end z-50">
           <div className="bg-green-100 text-black w-full max-w-lg p-6 rounded-lg shadow-lg flex items-center space-x-2">
             <FaCheckCircle className="text-green-500 -mt-8 text-5xl" />
             <p className="text-lg font-semibold">
               {resetMessage}
             </p>
           </div>
         </div>
          
          )}
          <div className="ml-10 mt-4">
            <p className="text-sm font-bold text-gray-700 ">
              Go back to{" "}
              <NavLink to="/" className="text-blue-900 hover:text-blue-800">
                login
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
