import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { forgotPassword } from "../actions/authActions";
import { NavLink } from "react-router-dom";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);
  const [errors, setErrors] = useState({});

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
    if (Object.keys(newErrors).length === 0) {
    dispatch(forgotPassword(userData));
    console.log(userData);
  } else {
    setErrors(newErrors);
}
  }

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

  return (
    <div className="container">
  <div className="row justify-content-center">
    <div className="col-md-6">
    <Form
      className="border border-1 gap p-4 mt-5"
      onSubmit={handleSubmit}
    >
      <h4 className="text-center">RESET PASSWORD</h4>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Address*</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
      </Form.Group>
      {authError && <p className="text-danger">{authError}</p>}

      <Button className="text-center" variant="primary" type="submit">
        Submit
      </Button>
      <div className="text-center mt-3">
        <NavLink to="/" className="btn btn-link">
          Back
        </NavLink>
      </div>
    </Form>
    </div>
    </div>
    </div>
  );
};

export default ForgetPassword;