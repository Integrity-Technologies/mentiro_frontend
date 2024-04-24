import { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import SignUp from './components/SignUp';
import ForgetPassword from "./components/ForgetPassword";
import Admin from "./components/Admin/Admin";
import ResetPasswordForm from './components/ResetPasswordForm';


import translationEN from './locals/en.json';
import translationAR from './locals/ar.json';
import Customer from "./components/Customer/Customer";
import Logout from "./components/Logout";
import Assessment from "./components/Customer/Assesment";
import { fetchUser } from "./reducers/fetchUser";
import Candidates from "./components/Candidates/Candidate.jsx";
import { useSelector, useDispatch } from "react-redux";




function App() {
  let token
  useEffect(() => {
   token = localStorage.getItem("token")
  })
  // const { user, token } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   // Fetch user information when the component mounts
  //   dispatch(fetchUser());
  // }, [dispatch]); // Run this effect only once on component mount

  // console.log("User:", user);
  // console.log("Token:", token);

  // Add conditional rendering to handle the scenario when user is not yet fetched
  






  i18n
  .use(initReactI18next) // Bind react-i18next to i18next
  .init({
    resources: {
      en: { translation: translationEN },
      ar: { translation: translationAR }
    },
    fallbackLng: 'en', // Default language if translation not found
    interpolation: {
      escapeValue: false // React already does escaping
    }
  });
  return (
    <>

  
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/Signup" element={<SignUp />} />
    <Route path="/forget-password" element={<ForgetPassword />} />
    <Route path="/logout" element={<Logout />} />
    <Route path="/assesment" element={<Assessment />} />
    <Route path="/candidates" element={<Candidates />} />
     <Route path="/admin-dashboard" element={<Admin />} />
    <Route path="/customer-dashboard" element={<Customer />} /> 

    <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute
                // user={user}
                token={token}
                adminComponent={<Admin />}
                userComponent={<Customer />}
              />
            }
          />
          
  
    {/* <Route
          path="/admin-dashboard"
          element={<ProtectedRoute component={<Admin />} isAuthenticated={isAuthenticated} user={user} />}
        />
        <Route
          path="/customer-dashboard"
          element={<ProtectedRoute component={<Customer />} isAuthenticated={isAuthenticated} user={user} />}
        /> */}
    <Route path="/user/password/reset"element={<ResetPasswordForm />} />
    
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
