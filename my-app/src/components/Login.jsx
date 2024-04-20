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
  console.log("🚀 ~ Login ~ authError:", authError);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  // const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    // Validate inputs
    const errors = {
      ...(email ? {} : { email: t("login.errors.emailRequired") }),
      ...(password ? {} : { password: t("login.errors.passwordRequired") }),
    };

    setErrors(errors);

    // Proceed
    if (Object.keys(errors).length === 0) {
      try {
        setShowAlert(true);
        const result = await dispatch(login({ email, password }));
        console.log(result)
       
        setTimeout(() => setShowAlert(false), 2000); // success
        navigate("/customer-dashboard")
      } catch (error) {
        setTimeout(() => setShowAlert(false), 2000); // error
      }
    }
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
          {showAlert && (
            <Alert
              variant={authError ? "danger" : "success"}
              onClose={() => setShowAlert(false)}
              dismissible
            >
              {authError ? authError : "User Login Successfully"}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
