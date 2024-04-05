import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import { signUp } from "../actions/authActions";

const SignUp = () => {
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
      newErrors.firstName = "Please enter your first name";
    }
    if (!userData.lastName) {
      newErrors.lastName = "Please enter your last name";
    }
    if (!userData.email) {
      newErrors.email = "Please enter your email";
    } else if (!validateEmail(userData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!userData.phone) {
      newErrors.phone = "Please enter your phone number";
    }
    if (!userData.password) {
      newErrors.password = "Please enter your password";
    }
    if (!userData.companyName) {
      newErrors.companyName = "Please enter your company name";
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

  return (
    <Form
      className="border p-4 mt-5 mx-auto"
      style={{ border: "1px solid #ccc", borderRadius: "5px" }}
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3" controlId="formBasicSignUp">
        <h4 className="text-center">SIGN UP</h4>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label>First Name*</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          placeholder="Enter first name"
        />
        {errors.firstName && (
          <Form.Text className="text-danger">{errors.firstName}</Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Last Name*</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          placeholder="Enter last name"
        />
        {errors.firstName && (
          <Form.Text className="text-danger">{errors.firstName}</Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Address*</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email" />
        {errors.firstName && (
          <Form.Text className="text-danger">{errors.firstName}</Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Phone*</Form.Label>
        <Form.Control
          type="phone"
          name="phone"
          placeholder="Enter phone number"
        />
        {errors.firstName && (
          <Form.Text className="text-danger">{errors.firstName}</Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password*</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" />
        {errors.firstName && (
          <Form.Text className="text-danger">{errors.firstName}</Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCompanyName">
        <Form.Label>Company Name*</Form.Label>
        <Form.Control
          type="text"
          name="companyName"
          placeholder="Enter company name"
        />
        {errors.firstName && (
          <Form.Text className="text-danger">{errors.firstName}</Form.Text>
        )}
      </Form.Group>
      {authError && <p className="text-danger">{authError}</p>}
      <p>
        Already have an account? <NavLink to="/">Log In</NavLink>
      </p>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default SignUp;
