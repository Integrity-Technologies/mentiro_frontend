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
import CompanyProfile from "./components/Customer/CompanyProfile.jsx";
import PreviewExistingAssessment from "./components/Customer/PreviewExistingAssesment.jsx";
import DualLineGraph from "./components/Customer/Graph";
import ActiveAssessment from "./components/Customer/ActiveAssessment";
import ViewTestResult from "./components/Customer/ViewTestResult";
import CandidateProfile from "./components/Customer/CandidatesProfile";


function App() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: translationEN },
        ar: { translation: translationAR }
      },
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      }
    });

  const [isLanguageButton, setIsLanguageButton] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/admin-dashboard" element={<Admin isLanguageButton={isLanguageButton}/>} />
        <Route path="/api/users/password/reset" element={<ResetPasswordForm />} />
        <Route path="/api/assessment" element={<Candidates />} />


        <Route path="/customer-dashboard/*" element={<Customer isLanguageButton={true} />}>
          <Route path="graph" element={<DualLineGraph />} />
          <Route path="company-profile" element={<CompanyProfile />} />
          <Route path="assessments" element={<ActiveAssessment />} />
          <Route path="candidates-profile" element={<CandidateProfile />} />
          <Route path="test-result" element={<ViewTestResult />} />
          <Route path="preview-assessment" element={<PreviewExistingAssessment />} />
          <Route path="" element={<DualLineGraph />} /> {/* Default route */}
        </Route>

      

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

        {/* Redirect Unauthenticated Users to Login */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
