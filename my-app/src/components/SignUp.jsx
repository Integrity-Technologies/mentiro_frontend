import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../actions/authActions";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
const logoImage = "/assets/icon.jpg";

const SignUp = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
      companyName: formData.get("companyName"),
    };
    const newErrors = {};
    if (!userData.firstName) {
      newErrors.firstName = t("signup.errors.firstNameRequired");
    }
    if (!userData.lastName) {
      newErrors.lastName = t("signup.errors.lastNameRequired");
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
    if (!userData.companyName) {
      newErrors.companyName = t("signup.errors.companyNameRequired");
    }

    if (Object.keys(newErrors).length === 0) {
      dispatch(signUp(userData));
      console.log(userData);
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
              <Form.Label>{t("signup.firstname")}</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder={t("signup.enterFirstName")}
              />
              {errors.firstName && (
                <Form.Text className="text-danger">
                  {errors.firstName}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>{t("signup.lastname")}</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder={t("signup.enterLastName")}
              />
              {errors.lastName && (
                <Form.Text className="text-danger">{errors.lastName}</Form.Text>
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
                pattern="[0-9]*"
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
        </div>
      </div>
    </div>
  );
};

export default SignUp;
