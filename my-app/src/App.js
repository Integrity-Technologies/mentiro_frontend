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
import Assessment from "./components/Customer/Assesment";
import Candidates from "./components/Candidates/Candidate.jsx";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "./reducers/fetchUser";
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

  console.log("User:", user);
  console.log("Token:", token);
  

console.log(user, token + "from local storage")

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
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/assesment" element={<Assessment />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/admin-dashboard" element={<Admin isLanguageButton={isLanguageButton}/>} />
          <Route path="/customer-dashboard" element={<Customer  isLanguageButton={true}/>} /> 
          <Route path="/api/users/password/reset" element={<ResetPasswordForm />} /> 
          <Route path="/api/assessment" element={<Candidates />} />
          <Route path="/customer-dashboard/Preview-Assessment" element={<PreviewExistingAssessment />} />
          {/* Admin Dashboard Route
        token && user === "true" && <Route path="/admin-dashboard" element={<Admin />} />}
        {/* Customer Dashboard Route */}
         {/* {token && user === "false" && <Route path="/customer-dashboard" element={<Customer/>} />} 
         {user === "true" && <Route path="/admin-dashboard" element={<Admin/>} />}


        {/* Redirect Unauthenticated Users to Login */}
         {/* {!token && <Route path="*" element={<Navigate to="/" />} />}  */} 
           {/* <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute
                user={user}
                token={token}
                adminComponent={<Admin />}
                userComponent={<Customer />}
              /> */}
            {/* }
          />  */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
