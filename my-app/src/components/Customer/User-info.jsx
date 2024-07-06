import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

const Userinfo = () => {
  const [user, setUser] = useState(null);
  const { t } = useTranslation();

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

  return (
    <div className="bg-blue-100 min-h-screen p-8">
      {user ? (
        <>
          <div className="flex items-center mb-6 mt-2">
            <h3 className="text-2xl font-semibold ml-1">
              {t("CompanyProfile.personalInformation")}
            </h3>
          </div>
          <div className="bg-white w-full max-w-5xl  rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="font-medium text-gray-700">
                  {t("CompanyProfile.firstName")}
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={user.first_name}
                  readOnly
                  className="mt-2 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName" className="font-medium text-gray-700">
                  {t("CompanyProfile.lastName")}
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={user.last_name}
                  readOnly
                  className="mt-2 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="font-medium text-gray-700">
                  {t("CompanyProfile.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  readOnly
                  className="mt-2 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone" className="font-medium text-gray-700">
                  {t("CompanyProfile.phone")}
                </label>
                <input
                  type="text"
                  id="phone"
                  value={user.phone}
                  readOnly
                  className="mt-2 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-lg font-semibold text-center text-primary">
          {t("CompanyProfile.loginMessage")}
        </p>
      )}
    </div>
  );
};

export default Userinfo;
