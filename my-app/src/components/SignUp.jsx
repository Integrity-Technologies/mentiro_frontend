import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../actions/authActions";
import { NavLink, useNavigate } from "react-router-dom";
import Select from "react-select";
import Flag from "react-world-flags";
import { useTranslation } from "react-i18next";
import {
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa"; // Import eye icons
import countries from "./../data/countries";
import {
  addCompany,
  fetchJobTitles,
  fetchCompanySizes,
} from "../actions/companyAction";
const loginimg = "/assets/loginimg.png";
const logo =
  "https://res.cloudinary.com/dbkxdbmfy/image/upload/v1721924634/Logo_ree8gd.png";

const SignUp = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);
  const [errors, setErrors] = useState({});
  const [currentCountry, setCurrentCountry] = useState(null); // State to hold current country details
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState("");
  const [password, setPassword] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isPopoverVisible, setPopoverVisible] = useState(false);


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
  // console.log("🚀 ~ SignUp ~ jobTitles:", jobTitles);
  const [companySizes, setCompanySizes] = useState([]);
  const [jobTitleCustom, setJobTitleCustom] = useState(""); // Add this line


  // console.log("🚀 ~ SignUp ~ companySizes:", companySizes);


  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      password: newPassword,
    }));
    setPopoverVisible(newPassword.length > 0); // Show popover if there's text
  };

  // Function to calculate password strength
  const calculateStrength = () => {
    let strength = 0;
    const password = formData.password; // Use password from formData
    const checks = [
      /[A-Z]/,          // Uppercase
      /\d/,             // Numbers
      /[!@&]/,          // Special characters
      /[a-z]/,          // Lowercase
      /.{8,}/           // Minimum length
    ];

    checks.forEach((regex) => {
      if (regex.test(password)) {
        strength += 20;
      }
    });

    return strength;
  };

  const strength = calculateStrength();


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
        const response = await fetch(
          "https://ipinfo.io/json?token=15f12699e3dd0b"
        );
        const data = await response.json();
        const country = countries.find(
          (c) => c.country_short_name === data.country
        );
        if (country) {
          setCountryCode(`${country.country_phone_code}`);
          setCurrentCountry(country);
        }
      } catch (error) {
        console.error("Failed to fetch user location", error);
      }
    };
    fetchLocation();
  }, []);

  const handleCountryChange = (selectedCountry) => {
    setCountryCode(`${selectedCountry.country_phone_code}`);
    setCurrentCountry(selectedCountry);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let newErrors = {};
  
    // Page-specific validations
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
      if (formData.phone && (formData.phone.length < 10 || formData.phone.length > 15)) {
        newErrors.phone = t("signup.errors.phoneLength");
      } else if (formData.phone && !validatePhoneNumber(formData.phone)) {
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
      if (formData.jobTitle === "Other" && !jobTitleCustom) {
        newErrors.jobTitleCustom = t("signup.errors.jobTitleCustomRequired");
      }
    }
  
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      if (currentPage < 3) {
        setCurrentPage(currentPage + 1);
      } else {
        try {
          setShowAlert(true);
  
          // Remove leading zero from phone number before submission
          let phone = formData.phone;
          if (phone.startsWith('0')) {
            phone = phone.slice(1);
          }
  
          const userData = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: `+${countryCode}${phone}`,
            password: formData.password,
            confirm_password: formData.confirmPassword,
          };
          const newresult = await dispatch(signUp(userData));
          if (newresult?.success) {
            const companyData = {
              name: formData.companyName,
              job_title: formData.jobTitle === "Other" ? jobTitleCustom : formData.jobTitle,
              company_size: formData.companySize,
            };
            const response = await dispatch(addCompany(companyData));
            localStorage.setItem("CompanyName", companyData.name);
            localStorage.setItem("company", JSON.stringify(response.company));
  
            if (response?.success) {
              navigate("/customer-dashboard");
            } else {
              console.error("Failed to create company", await response.text());
            }
          }
          setTimeout(() => setShowAlert(false), 2000);
        } catch (error) {
          setTimeout(() => setShowAlert(false), 2000);
        }
      }
    }
  };
  

  const handleBack = () => {
    setCurrentPage(currentPage - 1);
    setFormData({
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "jobTitleCustom") {
      setJobTitleCustom(value);
    }
  };
  const handleJobTitleChange = (selectedOption) => {
    setFormData({ ...formData, jobTitle: selectedOption.value });
    setErrors({ ...errors, jobTitle: "" }); // Clear the validation error
  };

  const handleCompanySizeChange = (selectedOption) => {
    setFormData({ ...formData, companySize: selectedOption.value });
    setErrors({ ...errors, companySize: "" }); // Clear the validation error
  };

  // const handleCountryCodeChange = (e) => {
  //   setCountryCode(e.target.value);
  // };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    control: (provided) => ({
      ...provided,
      minHeight: "40px", // Set this to match your input field's height
      height: "55px", // Set this to match your input field's height
    }),
  };

  const customSelectStyles = {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),

    control: (provided) => ({
      ...provided,
      minHeight: "120px", // Match the height of the input
      height: "120px", // Explicitly set height to match input
      borderColor: "rgba(209, 213, 219)", // Border color to match input
      borderWidth: "1px", // Border width to match input
      borderRadius: "0.375rem", // Border radius to match input
      backgroundColor: "transparent",
      zIndex: "9999",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#3b82f6", // Border color on focus to match input
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "100px", // Ensure the height matches the input
      padding: "0 2.5px", // Adjust padding to match input
      display: "flex",
      alignItems: "center", // Center the text vertically
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "0.875rem", // Font size to match input
      color: "rgba(156, 163, 175)", // Placeholder color to match input
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: "0.875rem", // Font size to match input
      color: "rgba(17, 24, 39)", // Text color to match input
    }),
  };

  return (
    <>
      <section className="flex flex-col md:flex-row min-h-screen font-roboto">
        <div className="relative hidden md:flex flex-col justify-center items-center w-full md:w-1/2 bg-blue-900 text-white p-10">
          <img src={logo} alt="Mentiro Logo" className="mb-6" />
          <div className="text-center max-w-lg z-10 relative">
            <h1 className="text-4xl font-bold mb-4">
              Revolutionize Your Hiring with Data-Driven Insights
            </h1>
            <p className="text-lg mb-8">
              With our <span className="bg-blue-400">Free</span> plan, you can
              efficiently screen candidates for essential skills, ensuring you
              select the best fit for a wide range of job roles. Start making
              smarter, evidence-based hiring decisions today!
            </p>
          </div>
          <img
            src={loginimg}
            alt="Shadow Lady"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6">
          <div className="w-full max-w-lg  rounded-lg  p-6">
            <div className=" mb-4">
              {/* <img
                className="w-24 h-24 mx-auto mb-4 rounded-circle"
                src={logoImage}
                alt="logo"
              /> */}
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                {t("signup.title")}
              </h1>
              <p className="text-lg text-gray-700">
                Only companies can create accounts
              </p>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 flex overflow-hidden bg-gray-300 rounded mb-4">
              <div
                className={`flex-1 ${
                  currentPage >= 1 ? "bg-blue-500" : "bg-gray-300"
                } border-r border-white`}
              ></div>
              <div
                className={`flex-1 ${
                  currentPage >= 2 ? "bg-blue-500" : "bg-gray-300"
                } border-r border-white`}
              ></div>
              <div
                className={`flex-1 ${
                  currentPage >= 3 ? "bg-blue-500" : "bg-gray-300"
                }`}
              ></div>
            </div>

            {/* <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className={`bg-blue-600 h-2.5 rounded-full`}
                style={{ width: `${(currentPage / 3) * 100}%` }}
              ></div>
            </div> */}

            {/* Step Indicator */}
            {/* <div className="text-center mb-4">
              <span>{`${currentPage}/3`}</span>
            </div> */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {currentPage === 1 && (
                <div className="mb-3">
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="email"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                      {t("signup.email")}{" "}
                      <span className="text-red-500">*</span>
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
                  <div className="flex flex-wrap mb-1">
                    <div className="w-full md:w-1/2 md:pr-2 mb-1 md:mb-0">
                      <div className="relative">
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="firstName"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                          {t("signup.first_name")}{" "}
                          <span className="text-red-500">*</span>
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
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="lastName"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                          {t("signup.last_name")}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        {errors.lastName && (
                          <span className="text-danger text-sm">
                            {errors.lastName}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-4 mb-8">
                    <div className="w-full px-3">
                      <div className="flex items-center space-x-3 w-full">
                        {/* Added space-x-4 for spacing */}
                        <Select
                          value={currentCountry}
                          onChange={handleCountryChange}
                          options={countries}
                          getOptionLabel={(option) => (
                            <div className="flex items-center">
                              <Flag
                                code={option.country_short_name}
                                height="16"
                                width="24"
                              />
                              <span className="ml-2">{` ${option.country_short_name}  +${option.country_phone_code}`}</span>{" "}
                            </div>
                          )}
                          getOptionValue={(option) => option.country_short_name}
                          styles={customStyles}
                          className="w-40"
                          placeholder={t("signup.select_country")}
                        />
                        <div className="relative flex-1">
                          {/* Added flex-1 to make input stretch */}
                          <input
                            type="text"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                          />
                          <label
                            htmlFor="phone"
                            className="absolute ml-1 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                          >
                            {t("signup.phone")}{" "}
                            {/* <span className="text-red-500">*</span> */}
                          </label>
                          {errors.phone && (
                            <span className="text-danger text-sm absolute top-full mt-1">
                              {errors.phone}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative mb-4 mt-4">
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      value={formData.password}
      id="password"
      onChange={handlePasswordChange}
      onFocus={() => setPopoverVisible(true)} // Show popover on focus
      onBlur={() => setPopoverVisible(false)} // Hide popover on blur
      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      placeholder=" "
    />
    <label
      htmlFor="password"
      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
    >
      Password
    </label>
    {isPopoverVisible && (
      <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-md rounded-lg p-4 dark:bg-neutral-800 dark:border dark:border-neutral-700 z-20 font-roboto">
      {/* <h4 className="mt-3 text-sm font-medium text-gray-500 dark:text-white">
         Password Strength:   
        </h4> */}
        <div className="flex mt-2 -mx-1 gap-2">
          {[20, 40, 60, 80, 100].map((step, index) => (
            <div
              key={index}
              className={`flex-1 h-2 rounded-full ${
                strength >= step ? 'bg-teal-500' : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
        <h4 className="mt-3 text-sm font-semibold text-gray-800 dark:text-white">
          Your password must contain:
        </h4>
        <ul className="space-y-1 text-sm text-gray-500 dark:text-neutral-500">
          <li className={`flex items-center gap-x-2 ${formData.password.length >= 6 ? 'text-teal-500' : ''}`}>
            <span className={`${formData.password.length >= 6 ? 'block' : 'hidden'}`}>
              <svg className="shrink-0 w-4 h-4 text-teal-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
            <span className={`${formData.password.length < 6 ? 'block' : 'hidden'}`}>
              <svg className="shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </span>
            Minimum number of characters is 6.
          </li>
          <li className={`flex items-center gap-x-2 ${/[a-z]/.test(formData.password) ? 'text-teal-500' : ''}`}>
            <span className={`${/[a-z]/.test(formData.password) ? 'block' : 'hidden'}`}>
              <svg className="shrink-0 w-4 h-4 text-teal-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
            <span className={`${!/[a-z]/.test(formData.password) ? 'block' : 'hidden'}`}>
              <svg className="shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </span>
            Should contain lowercase.
          </li>
          <li className={`flex items-center gap-x-2 ${/[A-Z]/.test(formData.password) ? 'text-teal-500' : ''}`}>
            <span className={`${/[A-Z]/.test(formData.password) ? 'block' : 'hidden'}`}>
              <svg className="shrink-0 w-4 h-4 text-teal-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
            <span className={`${!/[A-Z]/.test(formData.password) ? 'block' : 'hidden'}`}>
              <svg className="shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </span>
            Should contain uppercase.
          </li>
          <li className={`flex items-center gap-x-2 ${/\d/.test(formData.password) ? 'text-teal-500' : ''}`}>
            <span className={`${/\d/.test(formData.password) ? 'block' : 'hidden'}`}>
              <svg className="shrink-0 w-4 h-4 text-teal-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
            <span className={`${!/\d/.test(formData.password) ? 'block' : 'hidden'}`}>
              <svg className="shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </span>
            Should contain numbers.
          </li>
          <li className={`flex items-center gap-x-2 ${/[!@&]/.test(formData.password) ? 'text-teal-500' : ''}`}>
            <span className={`${/[!@&]/.test(formData.password) ? 'block' : 'hidden'}`}>
              <svg className="shrink-0 w-4 h-4 text-teal-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
            <span className={`${!/[!@&]/.test(formData.password) ? 'block' : 'hidden'}`}>
              <svg className="shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </span>
            Should contain special characters.
          </li>
        </ul>
      </div>
    )}
    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
      {showPassword ? (
        <FaEyeSlash
          className="text-gray-500 cursor-pointer"
          onClick={togglePasswordVisibility}
        />
      ) : (
        <FaEye
          className="text-gray-500 cursor-pointer"
          onClick={togglePasswordVisibility}
        />
      )}
    </span>
  </div>
</div>

                  <div className="mb-3">
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="confirmPassword"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        {t("signup.confirm_password")}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">
                          {errors.confirmPassword}
                        </p>
                      )}
                      {/* Eye icon for toggling password visibility */}
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {showPassword ? (
                          <FaEyeSlash
                            className="text-gray-500 cursor-pointer"
                            onClick={togglePasswordVisibility}
                          />
                        ) : (
                          <FaEye
                            className="text-gray-500 cursor-pointer"
                            onClick={togglePasswordVisibility}
                          />
                        )}
                      </span>
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
                        id="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="companyName"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        {t("signup.company_name")}{" "}
                        <span className="text-red-500">*</span>
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
                        onMenuOpen={() => setDropdownOpen(true)}
                        onMenuClose={() => setDropdownOpen(false)}
                        className={customSelectStyles}
                        placeholder={
                          <>
                            {t("signup.select_company_size")}
                            <span className="text-red-500"> *</span>
                          </>
                        }
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
                        onMenuOpen={() => setDropdownOpen(true)}
                        onMenuClose={() => setDropdownOpen(false)}
                        className={customSelectStyles}
                        menuPortalTarget={document.body}
                        placeholder={
                          <>
                            {t("signup.select_job_title")}
                            <span className="text-red-500"> *</span>
                          </>
                        }
                      />
                      {formData.jobTitle === "Other" && !dropdownOpen && (
                        <div className="mb-3 mt-3 relative">
                          <input
                            type="text"
                            name="jobTitleCustom"
                            value={jobTitleCustom}
                            style={customSelectStyles}
                            onChange={handleChange}
                            className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                          />
                          <label
                            htmlFor="jobTitleCustom"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                          >
                            Custom Job Title{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          {errors.jobTitleCustom && (
                            <span className="text-danger text-sm">
                              {errors.jobTitleCustom}
                            </span>
                          )}
                        </div>
                      )}

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
                className="w-full text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {currentPage < 3 ? t("signup.next") : t("signup.submit")}
              </button>
              {currentPage > 1 && (
                <button
                  type="button"
                  onClick={handleBack} // Change this line
                  className="w-full text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2"
                >
                  {t("signup.back")}
                </button>
              )}
              <p className="text-sm font-light text-gray-500">
                {t("signup.alreadyHaveAccount")}{" "}
                <NavLink className="text-blue-900" to="/">
                  {t("signup.login")}
                </NavLink>
              </p>
            </form>
            {showAlert &&
              (authError ? (
                <div
                  className="mt-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center"
                  role="alert"
                >
                  <FaTimesCircle className="text-red-500 mr-2" />
                  <strong className="font-bold">Error:</strong> {authError}
                </div>
              ) : (
                <div
                  className="mt-3 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center"
                  role="alert"
                >
                  <FaCheckCircle className="text-green-500 mr-2" />
                  <strong className="font-bold">Success:</strong> Your account
                  has been created successfully.
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
