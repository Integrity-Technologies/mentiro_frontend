import Home from './pages/Home';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { NavbarComp } from './components/NavbarComp';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import SignUp from './components/SignUp';


function App() {
  return (
    <>
    <Login />
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" Component={SignUp} />

      {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/category" element={<CategoryPage />} /> */}
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
