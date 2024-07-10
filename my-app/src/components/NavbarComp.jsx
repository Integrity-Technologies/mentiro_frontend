import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions/authActions";
import { useNavigate } from "react-router-dom";
import { FaAngleDown, FaUser, FaBuilding, FaSignOutAlt } from "react-icons/fa";
import LanguageToggleButton from "./Togglebutton";
import { useLocation } from "react-router-dom";

const Navbar = ({
  isMenuCollapsed,
  handleLanguageChange,
  isLanguageButton,
}) => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null); // Add this line
  const containerRef = useRef(null); // Add this line

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get(`${process.env.REACT_APP_API_URL}/users/me`, config)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      navigate("/");
    }, 2000);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
    ref={containerRef}
    className="w-full bg-white shadow-md p-4 flex justify-between items-center z-10"
  >
    <div className="text-lg font-semibold">
      {[
        "/graph",
        "/assessments",
        "/candidates-profile",
        "/test-result",
      ].includes(location.pathname)
        ? ""
        : ""}
    </div>
      <div className="ml-auto relative flex items-center">
        {user && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-gray-700 font-semibold">
              {user.first_name.charAt(0)}
            </div>
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <span className="mr-2">{user.first_name}</span>
              <FaAngleDown />
            </button>
          </div>
        )}
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-40 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-10"
          >
            <Link
              to="/customer-dashboard/user-info"
              className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
              style={{
                textDecoration: "none",
                listStyle: "none",
                outline: "none",
              }}
            >
              <FaUser className="mr-2" />
              User Information
            </Link>
            <Link
              to="/customer-dashboard/company-profile"
              className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
              style={{
                textDecoration: "none",
                listStyle: "none",
                outline: "none",
              }}
            >
              <FaBuilding className="mr-2" />
              Company Profile
            </Link>
            <Link
              to="/"
              className="flex items-center px-4 py-2 text-red-500 hover:bg-gray-100"
              onClick={handleLogout}
              style={{
                textDecoration: "none",
                listStyle: "none",
                outline: "none",
              }}
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </Link>
          </div>
        )}
      </div>
      <div className="ml-4">
        <LanguageToggleButton
          isMenuCollapsed={isMenuCollapsed}
          onLanguageChange={handleLanguageChange}
          isLanguageButton={isLanguageButton}
        />
      </div>
    </div>
  );
};

export default Navbar;