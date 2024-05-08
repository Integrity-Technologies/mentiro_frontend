import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../actions/authActions";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Alert from "react-bootstrap/Alert";
import countries from "./../data/countries";

import { useNavigate } from "react-router-dom";
import { NavbarComp } from "./NavbarComp";
const logoImage = "/assets/icon.jpg";

const SignUp = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      first_name: formData.get("firstName"),
      last_name: formData.get("lastName"),
      email: formData.get("email"),
      phone: `+${countryCode}${formData.get("phone")}`,
      password: formData.get("password"),
      confirm_password: formData.get("confirm_password"),
    };
    console.log("🚀 ~ handleSubmit ~ phone:", userData);

    // Initialize the error object
    let newErrors = {};

    // Check for first name
    if (!userData.first_name) {
      newErrors.first_name = t("signup.errors.firstNameRequired");
    }

    // Check for last name
    if (!userData.last_name) {
      newErrors.last_name = t("signup.errors.lastNameRequired");
    }

    // Email checks
    if (!userData.email) {
      newErrors.email = t("signup.errors.emailRequired");
    } else if (!validateEmail(userData.email)) {
      newErrors.email = t("signup.errors.emailInvalid");
    }

    // Phone checks
    if (!formData.get("phone")) {
      newErrors.phone = t("signup.errors.phoneRequired");
    } else if (!validatePhoneNumber(userData.phone)) {
      // Check for validity only if the phone number is not empty
      newErrors.phone = t("signup.errors.phoneInvalid");
    }

    // Password checks
    if (!userData.password) {
      newErrors.password = t("signup.errors.passwordRequired");
    } else if (userData.password.length < 6) {
      newErrors.password = t("signup.errors.passwordLength");
    }

    // Confirm Password checks
    if (!confirmPassword) {
      newErrors.confirmPassword = t("signup.errors.confirmPasswordRequired");
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = t("signup.errors.confirmPasswordMismatch");
    }

    // Update errors state
    setErrors(newErrors);

    // Proceed only if there are no errors
    if (Object.keys(newErrors).length === 0) {
      try {
        setShowAlert(true);
        const newresult = await dispatch(signUp(userData));
        console.log(newresult);
        if (newresult?.success) {
          navigate("/");
        }
        setTimeout(() => setShowAlert(false), 2000); // success
      } catch (error) {
        setTimeout(() => setShowAlert(false), 2000); // error
      }
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  const validatePhoneNumber = (phone) => {
    // Use regex to check if the phone number contains only numbers
    const phoneRegex = /^\+?[0-9]+$/;
    return phoneRegex.test(phone);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  return (
    <>
     <section className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900 h-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow md:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="text-center">
              <img className="w-24 h-24 mx-auto mb-4 rounded-circle" src={logoImage} alt="logo" />
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {t("signup.title")}
              </h1>
            </div>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div className="d-flex mb-3">
                  <div className="me-3 flex-grow-1">
                    <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t("signup.first_name")}<span className="text-danger">*</span></label>
                    <input type="text" name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t("signup.enterFirstName")} />
                    {errors.first_name && (
                  <span className="text-danger text-sm">{errors.first_name}</span>
                )}
                  </div>
                  <div className="flex-grow-1">
                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t("signup.last_name")} <span className="text-danger">*</span></label>
                    <input type="text" name="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t("signup.enterLastName")} />
                    {errors.last_name && (
                      <span className="text-danger text-sm">{errors.last_name}</span>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t("signup.email")} <span className="text-danger">*</span></label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t("signup.enterEmail")}  />
                  {errors.email && (
                    <span className="text-danger text-sm">{errors.email}</span>
                  )}
                </div>
                <div className="mb-3 d-flex" controlId="formPhone">
                  <div className="me-3 flex-grow-1">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t("signup.phone")} <span className="text-danger">*</span></label>
                    <div className="d-flex">
                      <select value={countryCode} onChange={handleCountryCodeChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-36">
                        {countries?.map((country, index) => (
                          <option key={index} value={country.country_phone_code}>
                            {`+${country.country_phone_code} (${country.country_name})`}
                          </option>
                        ))}
                      </select>
                      <input type="phone" name="phone" placeholder={t("signup.enterPhone")} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                    </div>
                    {errors.phone && (
                      <span className="text-danger text-sm">{errors.phone}</span>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t("signup.password")} <span className="text-danger">*</span></label>
                  <input type="password" name="password" id="password" onChange={handlePasswordChange} placeholder={t("signup.enterPassword")} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  {errors.password && (
                    <span className="text-danger text-sm">{errors.password}</span>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t("signup.confirm_password")} <span className="text-danger">*</span></label>
                  <input type="password" name="confirmPassword" id="confirmPassword" onChange={handleConfirmPasswordChange} placeholder={t("signup.enterConfirmPassword")} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  {errors.confirmPassword && (
                    <span className="text-danger text-sm">{errors.confirmPassword}</span>
                  )}
                </div>
                <div className="flex items-start mb-3">
                  <div className="flex items-center h-5">
                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">Terms and Conditions</a></label>
                  </div>
                </div>
                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{t("signup.submit")}</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  {t("signup.alreadyHaveAccount")} <NavLink to="/">{t("signup.login")}</NavLink>
                </p>
              </form>
              {showAlert &&
                ((authError && (
                  <div className="mt-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
                    <strong className="font-bold">Error:</strong> {authError}
                  </div>
                )) || (
                  <div className="mt-3 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg" role="alert">
                    <strong className="font-bold">Success:</strong> Your account has been created successfully.
                  </div>
                ))}
            </div>
          </div>
      </section>
    </>
  );
};

export default SignUp;