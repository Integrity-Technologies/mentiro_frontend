import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../actions/authActions";
import { NavLink, useNavigate } from "react-router-dom";
import Select from "react-select";
import getIpInfo from "../actions/IPAction"; // Import IP fetch function
import { useTranslation } from "react-i18next";
import countries from "./../data/countries";
import { fetchJobTitles, fetchCompanySizes } from "../actions/companyAction"; // Import data fetching functions
const logoImage = "/assets/icon.jpg";
const loginimg =
  "/assets/flat-illustration-design-communacation-concept-online-with-smartphone_540641-468-removebg-preview.png";

const SignUp = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    companySize: "",
    jobTitle: "",
    password: "",
    confirmPassword: "",
  });

  // State variables to hold fetched data
  const [jobTitles, setJobTitles] = useState([]);
  console.log("🚀 ~ SignUp ~ jobTitles:", jobTitles);
  const [companySizes, setCompanySizes] = useState([]);
  console.log("🚀 ~ SignUp ~ companySizes:", companySizes);

  // Fetch job titles and company sizes on component mount
  useEffect(() => {
    const fetchData = async () => {
      const fetchedJobTitles = await fetchJobTitles();
      const fetchedCompanySizes = await fetchCompanySizes();
      setJobTitles(fetchedJobTitles);
      setCompanySizes(fetchedCompanySizes);
    };
    fetchData();

    // Fetch user location and set country code
    const fetchLocation = async () => {
      try {
        const ipInfo = await getIpInfo();
        console.log("IP Information:", ipInfo);
        if (ipInfo && ipInfo.country) {
          const country = countries.find((c) => c.country_code === ipInfo.country);
          if (country) {
            setCountryCode(country.country_phone_code);
          } else {
            console.warn('Country code not found for IP:', ipInfo.country);
            // Fallback to default country code or handle as necessary
          }
        } else {
          console.warn('Country information not available in IP response:', ipInfo);
          // Handle case where country information is not available
        }
      } catch (error) {
        console.error("Failed to fetch user location", error);
        // Handle error fetching IP information
        // Fallback to default country code or handle as necessary
      }
    };
    fetchLocation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (currentPage === 1) {
      if (!formData.email) {
        newErrors.email = t("signup.errors.emailRequired");
      } else if (!validateEmail(formData.email)) {
        newErrors.email = t("signup.errors.emailInvalid");
      }
    } else if (currentPage === 2) {
      if (!formData.firstName) {
        newErrors.firstName = t("signup.errors.firstNameRequired");
      }
      if (!formData.lastName) {
        newErrors.lastName = t("signup.errors.lastNameRequired");
      }
      if (!formData.phone) {
        newErrors.phone = t("signup.errors.phoneRequired");
      } else if (formData.phone.length < 10 || formData.phone.length > 15) {
        newErrors.phone = t("signup.errors.phoneLength");
      } else if (!validatePhoneNumber(formData.phone)) {
        newErrors.phone = t("signup.errors.phoneInvalid");
      }
      if (!formData.password) {
        newErrors.password = t("signup.errors.passwordRequired");
      } else if (formData.password.length < 6) {
        newErrors.password = t("signup.errors.passwordLength");
      } else if (!/(?=.*[A-Z])/.test(formData.password)) {
        newErrors.password = t("signup.errors.passwordUppercase");
      } else if (!/(?=.*[a-z])/.test(formData.password)) {
        newErrors.password = t("signup.errors.passwordLowercase");
      } else if (!/(?=.*[0-9])/.test(formData.password)) {
        newErrors.password = t("signup.errors.passwordNumber");
      } else if (!/(?=.*[!@#$%^&*])/.test(formData.password)) {
        newErrors.password = t("signup.errors.passwordSpecialChar");
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = t("signup.errors.confirmPasswordRequired");
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = t("signup.errors.confirmPasswordMismatch");
      }
    } else if (currentPage === 3) {
      if (!formData.companyName) {
        newErrors.companyName = t("signup.errors.companyNameRequired");
      }
      if (!formData.companySize) {
        newErrors.companySize = t("signup.errors.companySizeRequired");
      }
      if (!formData.jobTitle) {
        newErrors.jobTitle = t("signup.errors.jobTitleRequired");
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      if (currentPage < 3) {
        setCurrentPage(currentPage + 1);
      } else {
        try {
          setShowAlert(true);
          const userData = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: `+${countryCode}${formData.phone}`,
            company_name: formData.companyName,
            company_size: formData.companySize,
            job_title: formData.jobTitle,
            password: formData.password,
            confirm_password: formData.confirmPassword,
          };
          const newresult = await dispatch(signUp(userData));
          if (newresult?.success) {
            navigate("/");
          }
          setTimeout(() => setShowAlert(false), 2000);
        } catch (error) {
          setTimeout(() => setShowAlert(false), 2000);
        }
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleJobTitleChange = (selectedOption) => {
    setFormData({ ...formData, jobTitle: selectedOption.value });
    setErrors({ ...errors, jobTitle: "" }); // Clear the validation error
  };

  const handleCompanySizeChange = (selectedOption) => {
    setFormData({ ...formData, companySize: selectedOption.value });
    setErrors({ ...errors, companySize: "" }); // Clear the validation error
  };

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  return (
    <>
      <section className="flex flex-col md:flex-row justify-between items-center min-h-screen bg-blue-100">
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6">
          <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-4">
              <img
                className="w-24 h-24 mx-auto mb-4 rounded-circle"
                src={logoImage}
                alt="logo"
              />
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                {t("signup.title")}
              </h1>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {currentPage === 1 && (
                <div className="mb-3">
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="email"
                      className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      {t("signup.email")}
                    </label>
                    {errors.email && (
                      <span className="text-danger text-sm">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>
              )}
              {currentPage === 2 && (
                <>
                  <div className="flex flex-wrap mb-3">
                    <div className="w-full md:w-1/2 md:pr-2 mb-3 md:mb-0">
                      <div className="relative">
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="firstName"
                          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                          {t("signup.first_name")}
                        </label>
                        {errors.firstName && (
                          <span className="text-danger text-sm">
                            {errors.firstName}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 md:pl-2">
                      <div className="relative">
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="lastName"
                          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                          {t("signup.last_name")}
                        </label>
                        {errors.lastName && (
                          <span className="text-danger text-sm">
                            {errors.lastName}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="relative">
                      <select
                        name="countryCode"
                        value={countryCode} // Ensure this is bound correctly
                        onChange={handleCountryCodeChange}
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      >
                        {countries.map((country) => (
                          <option
                            key={country.country_code}
                            value={country.country_phone_code}
                          >
                            {country.flag} +{country.country_phone_code}
                          </option>
                        ))}
                      </select>

                      <label
                        htmlFor="countryCode"
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                      >
                        {t("signup.countryCode")}
                      </label>

                      {errors.countryCode && (
                        <span className="text-danger text-sm">
                          {errors.countryCode}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="relative">
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />

                      <label
                        htmlFor="phone"
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                      >
                        {t("signup.phone")}
                      </label>

                      {errors.phone && (
                        <span className="text-danger text-sm">
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="relative">
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="password"
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                      >
                        {t("signup.password")}
                      </label>
                      {errors.password && (
                        <span className="text-danger text-sm">
                          {errors.password}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="relative">
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="confirmPassword"
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                      >
                        {t("signup.confirm_password")}
                      </label>
                      {errors.confirmPassword && (
                        <span className="text-danger text-sm">
                          {errors.confirmPassword}
                        </span>
                      )}
                    </div>
                  </div>
                </>
              )}
              {currentPage === 3 && (
                <>
                  <div className="mb-3">
                    <div className="relative">
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="companyName"
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                      >
                        {t("signup.company_name")}
                      </label>
                      {errors.companyName && (
                        <span className="text-danger text-sm">
                          {errors.companyName}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="relative">
                      <Select
                        name="companySize"
                        value={companySizes.find(
                          (option) => option.value === formData.companySize
                        )}
                        onChange={handleCompanySizeChange}
                        options={companySizes.map((size) => ({
                          value: size.size_range,
                          label: size.size_range,
                        }))}
                        className="block w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder={t("signup.select_company_size")}
                      />
                      {errors.companySize && (
                        <span className="text-danger text-sm">
                          {errors.companySize}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="relative">
                      <Select
                        name="jobTitle"
                        value={jobTitles.find(
                          (option) => option.value === formData.jobTitle
                        )}
                        onChange={handleJobTitleChange}
                        options={jobTitles.map((title) => ({
                          value: title.title,
                          label: title.title,
                        }))}
                        className="block w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder={t("signup.select_job_title")}
                      />
                      {errors.jobTitle && (
                        <span className="text-danger text-sm">
                          {errors.jobTitle}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start mb-3">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="terms"
                        className="font-light text-gray-500"
                      >
                        I accept the{" "}
                        <a className="font-medium text-primary-600 hover:underline">
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </div>
                </>
              )}
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {currentPage < 3 ? t("signup.next") : t("signup.submit")}
              </button>
              {currentPage > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="w-full text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2"
                >
                  {t("signup.back")}
                </button>
              )}
              <p className="text-sm font-light text-gray-500">
                {t("signup.alreadyHaveAccount")}{" "}
                <NavLink to="/">{t("signup.login")}</NavLink>
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
                  <strong className="font-bold">Success:</strong> Your account
                  has been created successfully.
                </div>
              ))}
          </div>
        </div>
        <div className="hidden md:flex flex-col w-full md:w-1/2 bg-peach">
          <div className="text-center w-full max-w-lg rounded-r-lg p-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Revolutionize Your Hiring with Data-Driven Insights
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              With our Free plan, you can efficiently screen candidates for
              essential skills, ensuring you select the best fit for a wide
              range of job roles. Start making smarter, evidence-based hiring
              decisions today!{" "}
            </p>
            <img
              className="w-full rounded h-96 rounded-r-lg object-cover"
              src={loginimg}
              alt="Login"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
