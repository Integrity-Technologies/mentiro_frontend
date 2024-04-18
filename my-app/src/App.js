import {BrowserRouter, Routes, Route} from "react-router-dom";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ForgetPassword from "./components/ForgetPassword";
import Admin from "./components/Admin/Admin";

import translationEN from './locals/en.json';
import translationAR from './locals/ar.json';
import Customer from "./components/Customer/Customer";

function App() {

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
    <Route path="/admin-dashboard" element={<Admin />} />
    <Route path="/customer-dashboard" element={<Customer />} />


     
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
