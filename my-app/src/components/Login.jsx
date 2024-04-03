import React from 'react'
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
  return (
    <Form style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', marginTop: '5%', border: '1px solid #ccc', borderRadius: '5px' }}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
      
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
   
    <Button variant="primary" type="submit">
      Submit
    </Button>

    <p style={{ marginTop: '10px', textAlign: 'center' }}>Don't have an account? Sign Up</p>

  </Form>  )
}

export default Login