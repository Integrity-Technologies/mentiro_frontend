import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../actions/authActions";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
const logoImage = "/assets/icon.jpg";

const SignUp = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      first_name: formData.get("firstName"),
      last_name: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
    };
    const newErrors = {};
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
    if (!userData.phone) {
      newErrors.phone = t("signup.errors.phoneRequired");
    } else if (!validatePhoneNumber(userData.phone)) {
      newErrors.phone = t("signup.errors.phoneInvalid");
    }

    if (!userData.password) {
      newErrors.password = t("signup.errors.passwordRequired");
    } else if (userData.password.length < 6) {
      newErrors.password = t("signup.errors.passwordLength");
    }

    if (Object.keys(newErrors).length === 0) {
      dispatch(signUp(userData));
      setShowAlert(true);
      setErrors({}); // Clear errors on successful form submission
      setTimeout(() => {
        setShowAlert(false);
        navigate("/"); // Navigate after showing the alert message
      }, 2000);
    } else {
      setErrors(newErrors);
    }
  };
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  const validatePhoneNumber = (phone) => {
    // Use regex to check if the phone number contains only numbers
    const phoneRegex = /^[0-9]+$/;
    return phoneRegex.test(phone);
  };
  return (
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
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>{t("signup.first_name")}</Form.Label>
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
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>{t("signup.last_name")}</Form.Label>
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
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{t("signup.email")}</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder={t("signup.enterEmail")}
              />
              {errors.email && (
                <Form.Text className="text-danger">{errors.email}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>{t("signup.phone")}</Form.Label>
              <Form.Control
                type="phone"
                name="phone"
                placeholder={t("signup.enterPhone")}
              />
              {errors.phone && (
                <Form.Text className="text-danger">{errors.phone}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>{t("signup.password")}</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder={t("signup.enterPassword")}
              />
              {errors.password && (
                <Form.Text className="text-danger">{errors.password}</Form.Text>
              )}
            </Form.Group>

            <p>
              {t("signup.alreadyHaveAccount")}{" "}
              <NavLink to="/">{t("signup.login")}</NavLink>
            </p>
            <Button variant="primary" type="submit">
              {t("signup.submit")}
            </Button>
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
  );
};

export default SignUp;
