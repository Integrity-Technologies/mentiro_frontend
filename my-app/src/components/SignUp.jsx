import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import validationRules from '../locals/ValidationRules.json'
import { signUp } from '../actions/authActions';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



const SignUp = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const authError = useSelector(state => state.auth.error);
    const [errors, setErrors] = useState({});
  
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            password: formData.get('password'),
            companyName: formData.get('companyName')
        };
        const newErrors = {};
        Object.keys(validationRules.signup).forEach((field) => {
          const rules = validationRules.signup[field];
          if (rules.required && !userData[field]) {
            newErrors[field] = rules.errorMessage;
          } else if (rules.format === 'email' && userData[field] && !validateEmail(userData[field])) {
            newErrors[field] = rules.errorMessage;
          } else if (rules.minLength && userData[field].length < rules.minLength) {
            newErrors[field] = rules.errorMessage;
          }
        });

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
    }


  return (
    <div className="container">
  <div className="row justify-content-center">
    <div className="col-md-6">
<Form className='border border-1 gap p-4 mt-5'  onSubmit={handleSubmit}>
<Form.Group className="mb-3" controlId="formBasicSignUp">
        <h2 className="text-center">SignUp</h2>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label>{t("signup.firstname")}</Form.Label>
        <Form.Control type="text" name="firstName" placeholder="Enter first name" />
        {errors.firstName && <Form.Text className="text-danger">{errors.firstName}</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>{t("signup.lastname")}</Form.Label>
        <Form.Control type="text" name="lastName" placeholder="Enter last name" />
        {errors.lastName && <Form.Text className="text-danger">{errors.lastName}</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{t("signup.email")}</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email" />
        {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>{t("signup.phone")}</Form.Label>
        <Form.Control type="phone" name="phone" placeholder="Enter phone number" />
        {errors.phone && <Form.Text className="text-danger">{errors.phone}</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>{t("signup.password")}</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" />
        {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCompanyName">
        <Form.Label>{t("signup.companyName")}</Form.Label>
        <Form.Control type="text" name="companyName" placeholder="Enter company name" />
        {errors.companyName && <Form.Text className="text-danger">{errors.companyName}</Form.Text>}
      </Form.Group>
      {authError && <p className="text-danger">{authError}</p>}
      <p>
        Already have an account? <NavLink to="/">Log In</NavLink>
      </p>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
    </div>
    </div>
    
 )
}

export default SignUp
