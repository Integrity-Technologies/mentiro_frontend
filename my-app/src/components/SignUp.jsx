import React from 'react'
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { updateField, resetForm } from '../reducers/signUpReducer';
import { useState } from 'react';


const SignUp = () => {

    const dispatch = useDispatch();
    const signUpData = useSelector((state) => state.signUp);
    const [errors, setErrors] = useState({});
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedValue = value;
        if (name === 'email') {
          // Convert any uppercase letters to lowercase
          updatedValue = value.toLowerCase();
        }
        dispatch(updateField({ field: name, value: updatedValue }));
      };
      
  
      const validateEmail = (email) => {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if (!emailRegex.test(email)) {
          return 'Please enter a valid email address';
        }
        return '';
      };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Validate each field before submitting the form
      const newErrors = {};
      if (!signUpData.firstName) {
        newErrors.firstName = 'Please enter your first name';
      }
      if (!signUpData.lastName) {
        newErrors.lastName = 'Please enter your last name';
      }
      if (!signUpData.email) {
        newErrors.email = 'Please enter your email';
      } else {
        const emailError = validateEmail(signUpData.email);
        if (emailError) {
          newErrors.email = emailError;
        }
      }
      if (!signUpData.phone) {
        newErrors.phone = 'Please enter your phone number';
      }
      if (!signUpData.password) {
        newErrors.password = 'Please enter your password';
      }
      if (!signUpData.companyName) {
        newErrors.companyName = 'Please enter your company name';
      }
  
      if (Object.keys(newErrors).length === 0) {
        // Dispatch action to submit signup data if there are no validation errors
        
        dispatch(resetForm());

        console.log("Signup data:", signUpData); // Log the signup data to the console

      } else {
        // Set validation errors for each field
        setErrors(newErrors);
      }
    };


  return (
<Form style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', marginTop: '5%', border: '1px solid #ccc', borderRadius: '5px' }} onSubmit={handleSubmit}>
<Form.Group className="mb-3" controlId="formBasicSignUp">
        <h2>SignUp</h2>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" name="firstName" value={signUpData.firstName} onChange={handleChange} placeholder="Enter first name" />
        {errors.firstName && <Form.Text className="text-danger">{errors.firstName}</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" name="lastName" value={signUpData.lastName} onChange={handleChange} placeholder="Enter last name" />
        {errors.lastName && <Form.Text className="text-danger">{errors.lastName}</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" value={signUpData.email} onChange={handleChange} placeholder="Enter email" />
        {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="phone" name="phone" value={signUpData.phone} onChange={handleChange} placeholder="Enter phone number" />
        {errors.phone && <Form.Text className="text-danger">{errors.phone}</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" value={signUpData.password} onChange={handleChange} placeholder="Password" />
        {errors.Password && <Form.Text className="text-danger">{errors.Password}</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCompanyName">
        <Form.Label>Company Name</Form.Label>
        <Form.Control type="text" name="companyName" value={signUpData.companyName} onChange={handleChange} placeholder="Enter company name" />
        {errors.companyName && <Form.Text className="text-danger">{errors.companyName}</Form.Text>}
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form> )
}

export default SignUp