import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  FaUser,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaPlus,
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
        .get("http://localhost:5000/api/users/me", config)
        .then((response) => {
          setUser(response.data.user);

          axios
            .get("http://localhost:5000/api/company/myCompanies", config)
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
  };

  const handleCreateCompany = () => {
    if (newCompanyName.trim() === "") {
      setIsCompanyNameValid(false);
      return;
    }

    const companyData = { name: newCompanyName };
    dispatch(addCompany(companyData))
      .then(() => {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .get("http://localhost:5000/api/company/myCompanies", config)
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
        <div className="bg-gray-100 shadow-lg rounded-lg p-6 min-h-screen">
          <h2 className="text-3xl font-semibold mb-4 flex items-center">
            <FaUser className="mr-2 text-primary" />
            {t("CompanyProfile.welcomeMessage")} {user.first_name}!
          </h2>
          <hr className="mb-6 border-gray-400" />

          <div className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center rounded justify-center bg-gray-300 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg p-4">
                <FaUser className="text-blue-500" size={24} />
                <p className="ml-4 text-lg text-blue-900 font-medium">
                  {user.last_name}
                </p>
              </div>
              <div className="flex items-center rounded justify-center bg-gray-300 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg p-4">
                <FaEnvelope className="text-green-500" size={24} />
                <p className="ml-4 text-lg text-green-900 font-medium">
                  {user.email}
                </p>
              </div>
              <div className="flex items-center rounded justify-center bg-gray-300 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg p-4">
                <FaPhone className="text-yellow-500" size={24} />
                <p className="ml-4 text-lg text-yellow-900 font-medium">
                  {user.phone}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-20 mb-4">
            <h3 className="text-2xl font-semibold flex items-center">
              <FaBuilding className="mr-2 text-primary" />
              {t("CompanyProfile.companyList")}
            </h3>
            <Button
              className="bg-black text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105"
              variant="primary"
              onClick={() => setShowCreateCompanyModal(true)}
            >
              <FaPlus className="inline-block mr-1" />
              {t("CompanyProfile.createCompany")}
            </Button>
          </div>
          <hr className="mb-6 border-gray-400" />

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {companyList.map((company) => (
              <li
                key={company.id}
                className={`rounded transition duration-300 transform hover:-translate-y-1 hover:shadow-lg p-4 
                ${
                  activeCompany && activeCompany.id === company.id
                    ? "bg-green-200"
                    : "bg-gray-300"
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
                      : "bg-blue-500 text-white hover:bg-blue-600 focus:ring focus:ring-blue-400"
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
          Company created successfully!
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
              <p className="text-red-500 text-sm mt-1">
                {t("CompanyProfile.companyNameError")}
              </p>
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