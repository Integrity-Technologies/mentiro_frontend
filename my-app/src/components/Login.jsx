import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
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
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
  
    const newErrors = {};
  
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    }
  
    if (!password.trim()) {
      newErrors.password = "Password is required";
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      try {
        dispatch(login({ email, password }));
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      } catch (error) {
        setErrors({ general: "Login failed. Please try again." });
      }
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
            <h4 className="text-center">{t("login.title")}</h4>
            <div className="d-flex justify-content-center">
              <img
                src={logoImage}
                alt="Logo"
                className="rounded-circle img-fluid"
                width="100"
              />
            </div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{t("login.email")}</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder={t("login.enterEmail")}
              />
              {errors.email && (
                <Form.Text className="text-danger">{errors.email}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>{t("login.password")}</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder={t("login.enterPassword")}
              />
              {errors.password && (
                <Form.Text className="text-danger">{errors.password}</Form.Text>
              )}
            </Form.Group>
            {authError && authError.general && (
              <p className="text-danger">{authError.general}</p>
            )}
            <NavLink to="/forget-password">{t("login.forgotPassword")}</NavLink>{" "}
            <br /> <br />
            <p>
              {t("login.noAccount")}{" "}
              <NavLink to="/signup">{t("login.signUp")}</NavLink>
            </p>
            <Button variant="primary" type="submit">
              {t("login.submit")}
            </Button>
          </Form>
          {success && (
            <Alert
              variant="success"
              onClose={() => setSuccess(false)}
              dismissible
            >
              Login successfully!
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
