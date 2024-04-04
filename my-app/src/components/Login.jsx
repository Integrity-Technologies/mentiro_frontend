import React from 'react'
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/authActions';

const Login = () => {
    const dispatch = useDispatch();
    const authError = useSelector(state => state.auth.error);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = {
            email: formData.get('email'),
            password: formData.get('password')
        };
        dispatch(login(userData));
        console.log(userData);
    };

  return (
    <Form className="border p-4 mt-5 mx-auto" style={{ border: '1px solid #ccc', borderRadius: '5px'}} onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
      
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
    {authError && <p className="text-danger">{authError}</p>}
   
    <Button variant="primary" type="submit">
      Submit
    </Button>

    <p style={{ marginTop: '10px', textAlign: 'center' }}>Don't have an account? Sign Up</p>
    Forgot Password?


  </Form>  )
}

export default Login