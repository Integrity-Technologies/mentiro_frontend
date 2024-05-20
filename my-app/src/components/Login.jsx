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
       
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white justify-center">
          <img
            src={logoImage}
            alt="logo"
            className="w-30 h-20 mr-2 rounded-circle"
          />
        </a>
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {t("login.title")}
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  {t("login.email")}
                </label>
                {errors.email && <p className="text-danger">{errors.email}</p>}
              </div>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  {t("login.password")}
                </label>
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
