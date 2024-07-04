import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaAngleDown, FaUser, FaBuilding, FaSignOutAlt } from "react-icons/fa"; // Import icons from react-icons/fa
import LanguageToggleButton from "./Togglebutton"; // Assuming correct path

const Navbar = ({
  isMenuCollapsed,
  handleLanguageChange,
  isLanguageButton,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);

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

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear all items from local storage
    setShowDropdown(false); // Close the dropdown after logout
    // Optionally, you can redirect to the login page or homepage
  };

  return (
    <div className="w-full bg-white shadow-md p-4 flex justify-between items-center z-10">
      <div className="text-lg font-semibold">Dashboard</div>
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
              <FaAngleDown /> {/* Arrow icon */}
            </button>
          </div>
        )}
        {showDropdown && (
          <div className="absolute right-0 mt-40 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-10">
            <Link
              to="/customer-dashboard/user-info"
              className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
              style={{
                textDecoration: "none", // Remove underline decoration
                listStyle: "none", // Remove list-style decoration
                outline: "none", // Remove outline on focus
              }}
            >
              <FaUser className="mr-2" /> {/* User icon */}
              User Information
            </Link>
            <Link
              to="/customer-dashboard/company-profile"
              className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
              style={{
                textDecoration: "none", // Remove underline decoration
                listStyle: "none", // Remove list-style decoration
                outline: "none", // Remove outline on focus
              }}
            >
              <FaBuilding className="mr-2" /> {/* Building icon */}
              Company Profile
            </Link>
            <Link
              to="/"
              className="flex items-center px-4 py-2 text-red-500 hover:bg-gray-100"
              onClick={handleLogout}
              style={{
                textDecoration: "none", // Remove underline decoration
                listStyle: "none", // Remove list-style decoration
                outline: "none", // Remove outline on focus
              }}
            >
              <FaSignOutAlt className="mr-2" /> {/* Sign out icon */}
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
