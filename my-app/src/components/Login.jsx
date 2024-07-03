import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/authActions";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
const loginimg = "/assets/loginimg.png";
const logo = "/assets/logo.png"; 


const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const newErrors = {
      ...(email ? {} : { email: t("login.errors.emailRequired") }),
      ...(password ? {} : { password: t("login.errors.passwordRequired") }),
    };
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        setShowAlert(true);
        const newresult = await dispatch(login({ email, password }));
        setTimeout(() => setShowAlert(false), 3000); // success
        const permissions = localStorage.getItem("user");
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
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-10">
        <div className="w-full max-w-lg">
          <div className="mb-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Login Mentiro
            </h1>
            <p className="text-lg text-gray-700">We are glad to see you again</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"                >
                  {t("login.email")}
                </label>
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
            </div>
            <div className="mb-3">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Toggle visibility based on showPassword state
                  name="password"
                  id="password"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"                >
                  {t("login.password")}
                </label>
                {errors.password && <p className="text-red-500">{errors.password}</p>}
                {/* Eye icon for toggling password visibility */}
                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500 cursor-pointer" onClick={togglePasswordVisibility} />
                  ) : (
                    <FaEye className="text-gray-500 cursor-pointer" onClick={togglePasswordVisibility} />
                  )}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-500">
                  {t("login.rememberMe")}
                </label>
              </div>
              <NavLink to="/forget-password" className="text-sm font-medium text-blue-900 hover:underline">
                {t("login.forgotPassword")}
              </NavLink>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {t("login.submit")}
            </button>
            <p className="text-sm font-light text-gray-500">
              {t("login.noAccount")}{" "}
              <NavLink to="/signup" className="font-medium text-blue-900 hover:underline">
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
    </section>
  );
};

export default Login;
