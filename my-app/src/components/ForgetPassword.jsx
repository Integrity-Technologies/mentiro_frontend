import React from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { forgotPassword } from "../actions/authActions";
import { NavLink } from "react-router-dom";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    dispatch(forgotPassword(userData));
    console.log(userData);
  };

  return (
    <Form
      className="border p-4 mt-5 mx-auto"
      style={{ border: "1px solid #ccc", borderRadius: "5px" }}
      onSubmit={handleSubmit}
    >
      <h4 className="text-center">RESET PASSWORD</h4>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Address*</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Button className="text-center" variant="primary" type="submit">
        Submit
      </Button>
      <div className="text-center mt-3">
        <NavLink to="/" className="btn btn-link">
          Back
        </NavLink>
      </div>
    </Form>
  );
};

export default ForgetPassword;
