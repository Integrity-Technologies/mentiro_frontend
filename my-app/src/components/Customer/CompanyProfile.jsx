import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

              // Check if there's an active company stored in localStorage
              const storedActiveCompany = JSON.parse(
                localStorage.getItem("activeCompany")
              );
              if (storedActiveCompany) {
                // If there's an active company stored, set it as active
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

  // Function to handle activation of a company
  const handleActivateCompany = (company) => {
    // Save the active company in localStorage
    localStorage.setItem("activeCompany", JSON.stringify(company));
    setActiveCompany(company);
  };

  // Function to handle changes in the new company name input
  const handleNewCompanyNameChange = (event) => {
    setNewCompanyName(event.target.value);
  };

  // Function to handle submission of the new company form
  const handleCreateCompany = () => {
    const companyData = { name: newCompanyName };
    dispatch(addCompany(companyData))
      .then(() => {
        // Refresh the company list after successful creation
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
            // Clear the input field after successful creation
            setNewCompanyName("");
            // Close the modal after creation
            setShowCreateCompanyModal(false);
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
        <div className="bg-white shadow-md rounded-lg p-6 min-h-screen">
          <h2 className="text-3xl font-semibold mb-4 flex items-center">
            <FaUser className="mr-2 text-gray-500" />
            {t("CompanyProfile.welcomeMessage")} {user.first_name}!
          </h2>
          <hr className="mb-6 border-gray-400" />

          {/* Display user data in a card-like layout */}
          <div className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center rounded justify-center bg-gray-100 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg p-2">
                <FaUser className="mt-0 text-gray-500" size={18} />
                <p className="ml-2 mt-2.5">{user.last_name}</p>
              </div>
              <div className="flex items-center rounded justify-center bg-gray-100 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg p-2">
                <FaEnvelope className="mt-0 text-gray-500" size={18} />
                <p className="ml-2 mt-2.5">{user.email}</p>
              </div>
              <div className="flex items-center rounded justify-center bg-gray-100 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg p-2">
                <FaPhone className="mt-0 text-gray-500" size={18} />
                <p className="ml-2 mt-2.5">{user.phone}</p>
              </div>
            </div>
          </div>

          {/* Display company list */}
          <div className="flex items-center justify-between mt-20 mb-4">
            <h3 className="text-2xl font-semibold flex items-center">
              <FaBuilding className="mr-2 text-gray-500" />
              {t("CompanyProfile.companyList")}
            </h3>
            <Button
              className="flex items-center"
              variant="primary"
              onClick={() => setShowCreateCompanyModal(true)}
            >
              <FaPlus className="inline-block mr-1" />
              {t("CompanyProfile.createCompany")}
            </Button>
          </div>
          <hr className="mb-6 border-gray-400" />

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* List each company */}
            {companyList.map((company) => (
              <li
                key={company.id}
                className="bg-gray-100 rounded transition duration-300 transform hover:-translate-y-1 hover:shadow-lg p-4"
              >
                <p className="text-lg font-semibold">{company.name}</p>
                {/* Render activate button for each company */}
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
        <p className="text-lg font-semibold text-center">
          {t("CompanyProfile.loginMessage")}
        </p>
      )}

      {/* Modal for creating a new company */}
      <Modal
        show={showCreateCompanyModal}
        onHide={() => setShowCreateCompanyModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("CompanyProfile.createCompany")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="relative">
          <input
            type="text"
            id="company"
            value={newCompanyName}
            onChange={handleNewCompanyNameChange}
            placeholder=""
            className={`block px-2 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer `}
          />
          <label
            htmlFor="company"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            {t("CompanyProfile.companyNamePlaceholder")}{" "}
          </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCreateCompany}>
            {t("CompanyProfile.create")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CompanyProfile;
