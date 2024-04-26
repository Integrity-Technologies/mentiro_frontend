import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { forgotPassword } from "../actions/authActions";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Alert from "react-bootstrap/Alert";

const ForgetPassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error); // Retrieve error from Redux state
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      email: formData.get("email"),
    };
    const newErrors = {};
    if (!userData.email) {
      newErrors.email = t("forgetPassword.errors.emailRequired");
    } else if (!validateEmail(userData.email)) {
      newErrors.email = t("forgetPassword.errors.emailInvalid");
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        await dispatch(forgotPassword(userData));
        setIsSubmitted(true);
        console.log(isSubmitted);
      } catch (error) {
        console.error("Password reset failed:", error);
        // setErrors({ server: t("forgetPassword.errors.serverError") });
      }
    } else {
      setErrors(newErrors);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Form
            className="border border-1 gap p-4 mt-5"
            onSubmit={handleSubmit}
          >
            <h4 className="text-center">{t("forgetPassword.title")}</h4>
            {!isSubmitted && (
              <>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{t("forgetPassword.email")}</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder={t("forgetPassword.enterEmail")}
                  />
                  {errors.email && (
                    <Form.Text className="text-danger">
                      {errors.email}
                    </Form.Text>
                  )}
                </Form.Group>
                {authError && <Alert variant="danger">{authError}</Alert>} {/* Display error in Alert component */}
                {errors.server && (
                  <Alert variant="danger">{errors.server}</Alert>
                )}
                <Button className="text-center w-100" variant="dark" type="submit">
                  {t("forgetPassword.submit")}
                </Button>
              </>
            )}
            {isSubmitted && (
              <p className="text-success">
                {t("forgetPassword.successMessage")}
              </p>
            )}
            <div className="text-center mt-3">
              <NavLink to="/" className="btn">
                {t("common.back")}
              </NavLink>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
