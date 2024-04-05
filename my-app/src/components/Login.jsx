import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Redirect } from "protected-react-router";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/authActions";

const Login = () => {
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
    if (!userData.email) {
        newErrors.email = 'Please enter your email';
    } else if (!validateEmail(userData.email)) {
        newErrors.email = 'Please enter a valid email address';
    }

    if (!userData.password) {
        newErrors.password = 'Please enter your password';
    }
    if (Object.keys(newErrors).length === 0) {
        try {
          const res = dispatch(login(userData));
          console.log(userData);

          // Assuming the backend response contains user role information
          const userRole = res.payload.user.role;
          if (userRole === "admin") {
            setRedirectTo("/admin-dashboard");
          } else if (userRole === "customer") {
            setRedirectTo("/customer-dashboard");
          }
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
        <Form.Label>Email Address*</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email" />
        {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password*</Form.Label>
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