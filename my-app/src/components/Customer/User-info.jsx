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
    <div className="bg-blue-100 h-screen rounded-lg p-6">
      {user ? (
        <>
          <div className="flex items-center mb-6">
            <FaUserCircle className="mr-3" size={24} />
            <h3 className="text-2xl font-semibold">
              {t("CompanyProfile.personalInformation")}
            </h3>
          </div>
          <div className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex flex-col items-start justify-center w-full">
                <label htmlFor="firstName" className="font-medium text-black">
                  {t("CompanyProfile.firstName")}
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={user.first_name}
                  readOnly
                  className="mt-1 p-2 rounded border border-gray-300 focus:outline-none w-full"
                />
              </div>
              <div className="flex flex-col items-start justify-center">
                <label htmlFor="lastName" className="font-medium text-black">
                  {t("CompanyProfile.lastName")}
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={user.last_name}
                  readOnly
                  className="mt-1 p-2 rounded border border-gray-300 focus:outline-none w-full"
                />
              </div>
              <div className="flex flex-col items-start justify-center">
                <label htmlFor="email" className="font-medium text-black">
                  {t("CompanyProfile.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  readOnly
                  className="mt-1 p-2 rounded border border-gray-300 focus:outline-none w-full"
                />
              </div>
              <div className="flex flex-col items-start justify-center">
                <label htmlFor="phone" className="font-medium text-black">
                  {t("CompanyProfile.phone")}
                </label>
                <input
                  type="phone"
                  id="phone"
                  value={user.phone}
                  readOnly
                  className="mt-1 p-2 rounded border border-gray-300 focus:outline-none w-full"
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
