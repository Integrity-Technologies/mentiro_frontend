import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/authActions";
import { useTranslation } from "react-i18next";
import Alert from "react-bootstrap/Alert";
const logoImage = "/assets/icon.jpg";

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const errors = {
      ...(email ? {} : { email: t("login.errors.emailRequired") }),
      ...(password ? {} : { password: t("login.errors.passwordRequired") }),
    };

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        setShowAlert(true);
        const newresult = await dispatch(login({ email, password }));
        console.log(newresult);
        setTimeout(() => setShowAlert(false), 3000); // success
        // navigate("/customer-dashboard");
        const permissions = localStorage.getItem("user");
        console.log(permissions);
        if (permissions === "true") {
          navigate("/admin-dashboard");
        } else {
          navigate("/customer-dashboard");
        }
      } catch (error) {
        setTimeout(() => setShowAlert(false), 3000); // error
      }
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            src={logoImage}
            alt="logo"
            className="w-30 h-20 mr-2 rounded-circle"
          />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {t("login.title")}
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("login.email")}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder={t("login.enterEmail")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.email && <p className="text-danger">{errors.email}</p>}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("login.password")}
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder={t("login.enterPassword")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password && (
                  <p className="text-danger">{errors.password}</p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                  <NavLink to="/forget-password">
                    {t("login.forgotPassword")}
                  </NavLink>
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {t("login.submit")}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {t("login.noAccount")}{" "}
                <NavLink
                  to="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  {t("login.signUp")}
                </NavLink>
              </p>
            </form>
            {showAlert && (
              <div
                className={`mt-3 ${
                  authError
                    ? "bg-red-100 border border-red-400 text-red-700"
                    : "bg-green-100 border border-green-400 text-green-700"
                } px-4 py-3 rounded-lg`}
              >
                <strong className="font-bold">
                  {authError ? "Error: " : "Success: "}
                </strong>{" "}
                {authError || "User Login Successfully"}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
