import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Redirect } from "protected-react-router";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/authActions";
import { useTranslation } from "react-i18next";
import validationRules from '../locals/ValidationRules.json'; // Import validation rules JSON


const Login = () => {
    const { t } = useTranslation();
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);
  const [errors, setErrors] = useState({});
  const [redirectTo, setRedirectTo] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const newErrors = {};
    Object.keys(validationRules.login).forEach((field) => {
      const rules = validationRules.login[field];
      if (rules.required && !userData[field]) {
        newErrors[field] = rules.errorMessage;
      } else if (rules.format === 'email' && userData[field] && !validateEmail(userData[field])) {
        newErrors[field] = rules.errorMessage;
      }
    });
    if (Object.keys(newErrors).length === 0) {
        try {
           dispatch(login(userData));
          console.log(userData);

          const isAdmin = false; // Assuming it's set to false, change to true if the user is an admin

          if (isAdmin) {
          setRedirectTo("/admin-dashboard");
          } else {
          setRedirectTo("/customer-dashboard");
          }
// we puse usthis for another logic if response give error
        //   // Assuming the backend response contains user role information
        //   const userRole = res.payload.user.role;
        //   if (userRole === "admin") {
        //     setRedirectTo("/admin-dashboard");
        //   } else if (userRole === "customer") {
        //     setRedirectTo("/customer-dashboard");
        //   }
        } catch (error) {
          // Handle login failure
          setErrors({ login: "Login failed. Please try again." });
        }
      } else {
        setErrors(newErrors);
      }
    };
const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}



  // Redirect if redirectTo is set
  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }



  return (
    <div className="container">
  <div className="row justify-content-center">
    <div className="col-md-6">
    <Form
      className="border border-1 gap p-4 mt-5"
      onSubmit={handleSubmit}
    >
      <h4 className="text-center">LOGIN</h4>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{t("login.email")}</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email" />
        {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>{t("login.password")}</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" />
        {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
      </Form.Group>
      {authError && <p className="text-danger">{authError}</p>}
      <NavLink to="/forget-password">Forgot Password?</NavLink> <br></br>
      <br></br>
      <p>
        Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
      </p>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
    </div>
    </div>
  );
};

export default Login;