import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx'
import ProtectedRoute from './routes/ProtectedRoute';
import SignUp from './components/SignUp';
import ForgetPassword from "./components/ForgetPassword";
import Admin from "./components/Admin/Admin";
import ResetPasswordForm from './components/ResetPasswordForm';
import translationEN from './locals/en.json';
import translationAR from './locals/ar.json';
import Customer from "./components/Customer/Customer";
import Logout from "./components/Logout";
import Candidates from "./components/Candidates/Candidate.jsx";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "./reducers/fetchUser";
import Assessment from "./components/Customer/Assesment";
import Company from "./components/Admin/Company.jsx";
import CompanyProfile from "./components/Customer/CompanyProfile.jsx";
import PreviewExistingAssessment from "./components/Customer/PreviewExistingAssesment.jsx";

function App() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch user information when the component mounts
    dispatch(fetchUser());
  }, [dispatch]); // Run this effect only once on component mount

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

  const [isLanguageButton, setIsLanguageButton] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/admin-dashboard" element={<Admin isLanguageButton={isLanguageButton}/>} />
          <Route path="/customer-dashboard" element={<Customer isLanguageButton={true}/>} />
          <Route path="/api/users/password/reset" element={<ResetPasswordForm />} />
          <Route path="/customer-dashboard/company-profile" element={<CompanyProfile />} />
          <Route path="/customer-dashboard/preview-assessment" element={<PreviewExistingAssessment />} />
          <Route path="/api/assessment" element={<Candidates />} />

          {/* Protected Routes */}
          <Route
            path="/admin-dashboard"
            element={
              token ? (
                <ProtectedRoute
                  user={user}
                  token={token}
                  adminComponent={<Admin />}
                  userComponent={<Customer />}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          
          <Route
            path="/customer-dashboard"
            element={
              token ? (
                <Customer isLanguageButton={true} />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* Redirect Unauthenticated Users to Login */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
