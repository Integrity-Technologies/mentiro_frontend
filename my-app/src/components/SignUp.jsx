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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Form
            className="border border-1 gap p-4 mt-5"
            onSubmit={handleSubmit}
          >
            <Form.Group className="mb-3" controlId="formBasicSignUp">
              <h2 className="text-center">{t("signup.title")}</h2>
              <div className="d-flex justify-content-center">
                <img
                  src={logoImage}
                  alt="Logo"
                  className="rounded-circle img-fluid"
                  width="100"
                />
              </div>
            </Form.Group>
            {/* Group for first name and last name */}
            <div className="d-flex mb-3">
              <Form.Group
                className="me-3 flex-grow-1"
                controlId="formBasicFirstName"
              >
                <Form.Label>
                  {t("signup.first_name")}
                  <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder={t("signup.enterFirstName")}
                />
                {errors.first_name && (
                  <Form.Text className="text-danger">
                    {errors.first_name}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="flex-grow-1" controlId="formBasicLastName">
                <Form.Label>
                  {t("signup.last_name")} <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder={t("signup.enterLastName")}
                />
                {errors.last_name && (
                  <Form.Text className="text-danger">
                    {errors.last_name}
                  </Form.Text>
                )}
              </Form.Group>
            </div>
            {/* Remaining inputs */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                {t("signup.email")} <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder={t("signup.enterEmail")}
              />
              {errors.email && (
                <Form.Text className="text-danger">{errors.email}</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3 d-flex" controlId="formPhone">
              <div className="me-3 flex-grow-1">
                <Form.Label>
                  {t("signup.phone")} <span className="text-danger">*</span>
                </Form.Label>
                <div className="d-flex">
                  <Form.Control
                    as="select"
                    value={countryCode}
                    onChange={handleCountryCodeChange}
                    className="me-2"
                  >
                    {countries?.map((country, index) => (
                      <option key={index} value={country.country_phone_code}>
                        {`+${country.country_phone_code} (${country.country_name})`}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control
                    type="phone"
                    name="phone"
                    placeholder={t("signup.enterPhone")}
                  />
                </div>
                {errors.phone && (
                  <Form.Text className="text-danger">{errors.phone}</Form.Text>
                )}
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                {t("signup.password")} <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder={t("signup.enterPassword")}
                onChange={handlePasswordChange}
              />
              {errors.password && (
                <Form.Text className="text-danger">{errors.password}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>
                {t("signup.confirm_password")}{" "}
                <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder={t("signup.enterConfirmPassword")}
                onChange={handleConfirmPasswordChange}
              />
              {errors.confirmPassword && (
                <Form.Text className="text-danger">
                  {errors.confirmPassword}
                </Form.Text>
              )}
            </Form.Group>
            <Button variant="dark" type="submit" className="w-100">
              {t("signup.submit")}
            </Button>
            <p className="text-center mt-1">
              {t("signup.alreadyHaveAccount")}{" "}
              <NavLink to="/">{t("signup.login")}</NavLink>
            </p>
          </Form>
          {showAlert &&
            ((authError && (
              <Alert variant="danger" className="mt-3">
                {authError}
              </Alert>
            )) || (
              <Alert variant="success" className="mt-3">
                {t("signup.successmessage")}
              </Alert>
            ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default SignUp;