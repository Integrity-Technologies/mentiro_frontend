import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  
  FaBuilding,
  FaUserCircle

} from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { addCompany } from "../../actions/companyAction"; // Adjust the import path as necessary

const CompanyProfile = () => {
  const [user, setUser] = useState(null);
  const [companyList, setCompanyList] = useState([]);
  const [activeCompany, setActiveCompany] = useState(null);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [showCreateCompanyModal, setShowCreateCompanyModal] = useState(false);
  const [isCompanyNameValid, setIsCompanyNameValid] = useState(true);
  const [companyNameError, setCompanyNameError] = useState("");
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();


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

          axios
            .get(`${process.env.REACT_APP_API_URL}/company/myCompanies`, config)
            .then((companyResponse) => {
              setCompanyList(companyResponse.data);

              const storedActiveCompany = JSON.parse(
                localStorage.getItem("activeCompany")
              );
              if (storedActiveCompany) {
                setActiveCompany(storedActiveCompany);
              }
            })
            .catch((error) => {
              console.error("Error fetching company data:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleActivateCompany = (company) => {
    localStorage.setItem("activeCompany", JSON.stringify(company));
    setActiveCompany(company);
  };

  const handleNewCompanyNameChange = (event) => {
    setNewCompanyName(event.target.value);
    setIsCompanyNameValid(true); // Reset validation state on change
    setCompanyNameError(""); // Clear error message
  };

  const handleCreateCompany = () => {
    if (newCompanyName.trim() === "") {
      setIsCompanyNameValid(false);
      setCompanyNameError(t("CompanyProfile.companyNameError"));
      return;
    }

    const companyData = { name: newCompanyName };

    // Check if the company name already exists
    if (companyList.some((company) => company.name === newCompanyName)) {
      setIsCompanyNameValid(false);
      setCompanyNameError(t("CompanyProfile.companyNameExistsError"));
      return;
    }

    dispatch(addCompany(companyData))
      .then(() => {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .get(`${process.env.REACT_APP_API_URL}/company/myCompanies`, config)
          .then((companyResponse) => {
            setCompanyList(companyResponse.data);
            setNewCompanyName("");
            setShowCreateCompanyModal(false);
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
            }, 3000); // Hide message after 3 seconds
          })
          .catch((error) => {
            console.error("Error fetching updated company data:", error);
          });
      })
      .catch((error) => {
        console.error("Error creating company:", error);
      });
  };

  return (
    <div className="container mx-auto p-4 h-100">
      {user ? (
        <div className="bg-white  rounded-lg p-6 min-h-screen">
          <h3 className="text-2xl font-semibold flex items-center">
          <FaUserCircle className="mr-3" size={24} />
            Personal Information
          </h3>
          <div className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex flex-col items-start justify-center w-full">
                <label
                  htmlFor="firstName"
                  className="font-medium text-black"
                >
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
                <label
                  htmlFor="lastName"
                  className="font-medium text-black"
                >
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

          {/* <div className="flex items-center justify-between mt-20 mb-4">
            <h3 className="text-2xl font-semibold flex items-center">
              <FaBuilding className="mr-2" />
              {t("CompanyProfile.CompanyInformation")}
            </h3>
          </div>
          <div className="mb-4 w-80 flex">
            <div className="relative flex-grow">
              <input
                type="text"
                id="companyName"
                value={newCompanyName}
                onChange={handleNewCompanyNameChange}
                placeholder={t("CompanyProfile.companyNamePlaceholder")}
                className={`block px-2 pb-1.5 pt-3 w-80 text-sm text-gray-900 bg-transparent rounded-lg border ${
                  isCompanyNameValid ? "border-gray-300" : "border-red-500"
                } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
              />
              <label
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                {t("CompanyProfile.companyNamePlaceholder")}
              </label>
              {!isCompanyNameValid && (
                <p className="text-red-500 text-sm mt-1">{companyNameError}</p>
              )}
            </div>
            <div className="ml-4">
              <Button
                variant="dark"
                onClick={handleCreateCompany}
                className="w-100 whitespace-nowrap mt-1 bg-dark hover:bg-dark"
              >
                {t("CompanyProfile.addCompany")}
              </Button>
            </div>
          </div> */}

          <div className="flex items-center justify-between mt-20 mb-4">
            {/* <h3 className="text-2xl font-semibold flex items-center">
              <FaBuilding className="mr-2" />
              {t("CompanyProfile.companyList")}
            </h3> */}
            {/* <Button
              className="bg-black text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105"
              variant="primary"
              onClick={() => setShowCreateCompanyModal(true)}
            >
              <FaPlus className="inline-block mr-1" />
              {t("CompanyProfile.createCompany")}
            </Button> */}
          </div>
          <hr className="mb-6 border-gray-400" />

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {companyList.map((company) => (
              <li
                key={company.id}
                className={`rounded transition duration-300 transform hover:-translate-y-1 hover:shadow-lg p-4 
                ${
                  activeCompany && activeCompany.id === company.id
                    ? "bg-gray-100"
                    : "bg-gray-100"
                }
                `}
              >
                <p className="text-lg font-semibold text-gray-900">
                  {company.name}
                </p>
                <button
                  onClick={() => handleActivateCompany(company)}
                  className={`mt-2 w-full px-4 py-2 rounded focus:outline-none 
                  ${
                    activeCompany && activeCompany.id === company.id
                      ? "bg-green-500 text-white hover:bg-green-600 focus:ring focus:ring-green-400"
                      : "bg-black text-white hover:bg-black focus:ring focus:ring-blue-400"
                  }`}
                >
                  {activeCompany && activeCompany.id === company.id
                    ? `${t("CompanyProfile.activatedButton")}`
                    : `${t("CompanyProfile.activateButton")}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-lg font-semibold text-center text-primary">
          {t("CompanyProfile.loginMessage")}
        </p>
      )}

      {success && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          {t("CompanyProfile.successMessage")}
        </div>
      )}

      <Modal
        show={showCreateCompanyModal}
        onHide={() => setShowCreateCompanyModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title className="flex items-center">
            <FaBuilding className="mr-2 text-primary" />
            {t("CompanyProfile.createCompany")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="relative">
            <input
              type="text"
              id="company"
              value={newCompanyName}
              onChange={handleNewCompanyNameChange}
              placeholder=""
              className={`block px-2 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border ${
                isCompanyNameValid ? "border-gray-300" : "border-red-500"
              } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            />
            <label
              htmlFor="company"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              {t("CompanyProfile.companyNamePlaceholder")}{" "}
            </label>
            {!isCompanyNameValid && (
              <p className="text-red-500 text-sm mt-1">{companyNameError}</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleCreateCompany}
            className="bg-primary hover:bg-primary-dark"
          >
            {t("CompanyProfile.create")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CompanyProfile;