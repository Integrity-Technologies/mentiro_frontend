import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../actions/authActions";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import countries from "./../data/countries";
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

    let newErrors = {};

    if (!userData.first_name) {
      newErrors.first_name = t("signup.errors.firstNameRequired");
    }

    if (!userData.last_name) {
      newErrors.last_name = t("signup.errors.lastNameRequired");
    }

    if (!userData.email) {
      newErrors.email = t("signup.errors.emailRequired");
    } else if (!validateEmail(userData.email)) {
      newErrors.email = t("signup.errors.emailInvalid");
    }

    if (!formData.get("phone")) {
      newErrors.phone = t("signup.errors.phoneRequired");
    } else if (!validatePhoneNumber(userData.phone)) {
      newErrors.phone = t("signup.errors.phoneInvalid");
    }

    if (!userData.password) {
      newErrors.password = t("signup.errors.passwordRequired");
    } else if (userData.password.length < 6) {
      newErrors.password = t("signup.errors.passwordLength");
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = t("signup.errors.confirmPasswordRequired");
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = t("signup.errors.confirmPasswordMismatch");
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        setShowAlert(true);
        const newresult = await dispatch(signUp(userData));
        console.log(newresult);
        if (newresult?.success) {
          navigate("/");
        }
        setTimeout(() => setShowAlert(false), 2000);
      } catch (error) {
        setTimeout(() => setShowAlert(false), 2000);
      }
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
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
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="firstName"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      {t("signup.first_name")}
                    </label>
                    {errors.first_name && (
                      <span className="text-danger text-sm">{errors.first_name}</span>
                    )}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="lastName"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      {t("signup.last_name")}
                    </label>
                    {errors.last_name && (
                      <span className="text-danger text-sm">{errors.last_name}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    {t("signup.email")}
                  </label>
                  {errors.email && (
                    <span className="text-danger text-sm">{errors.email}</span>
                  )}
                </div>
              </div>
              <div className="mb-3 d-flex">
                <div className="me-3 flex-grow-1">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("signup.phone")} <span className="text-danger">*</span>
                  </label>
                  <div className="d-flex">
                    <select
                      value={countryCode}
                      onChange={handleCountryCodeChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-36"
                    >
                      {countries?.map((country, index) => (
                        <option key={index} value={country.country_phone_code}>
                          {`+${country.country_phone_code} (${country.country_name})`}
                        </option>
                      ))}
                    </select>
                    <input
                      type="phone"
                      name="phone"
                      placeholder={t("signup.enterPhone")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  {errors.phone && (
                    <span className="text-danger text-sm">{errors.phone}</span>
                  )}
                </div>
              </div>
              <div className="mb-3">
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handlePasswordChange}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="password"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    {t("signup.password")}
                  </label>
                  {errors.password && (
                    <span className="text-danger text-sm">{errors.password}</span>
                  )}
                </div>
              </div>
              <div className="mb-3">
                <div className="relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={handleConfirmPasswordChange}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="confirmPassword"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    {t("signup.confirm_password")}
                  </label>
                  {errors.confirmPassword && (
                    <span className="text-danger text-sm">{errors.confirmPassword}</span>
                  )}
                </div>
              </div>
              <div className="flex items-start mb-3">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                    I accept the{" "}
                    <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {t("signup.submit")}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {t("signup.alreadyHaveAccount")} <NavLink to="/">{t("signup.login")}</NavLink>
              </p>
            </form>
            {showAlert &&
              ((authError && (
                <div
                  className="mt-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg"
                  role="alert"
                >
                  <strong className="font-bold">Error:</strong> {authError}
                </div>
              )) || (
                <div
                  className="mt-3 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg"
                  role="alert"
                >
                  <strong className="font-bold">Success:</strong> Your account has been created
                  successfully.
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
