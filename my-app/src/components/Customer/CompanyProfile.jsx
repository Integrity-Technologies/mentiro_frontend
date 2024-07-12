import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { FaBuilding } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { addCompany } from "../../actions/companyAction"; // Adjust the import path as necessary

const CompanyProfile = () => {
  const [companyList, setCompanyList] = useState([]);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [showCreateCompanyModal, setShowCreateCompanyModal] = useState(false);
  const [isCompanyNameValid, setIsCompanyNameValid] = useState(true);
  const [companyNameError, setCompanyNameError] = useState("");
  const [success, setSuccess] = useState(false);
  const [changesMade, setChangesMade] = useState(false); // State to track changes
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
        .get(`${process.env.REACT_APP_API_URL}/company/myCompanies`, config)
        .then((companyResponse) => {
          setCompanyList(companyResponse.data);
        })
        .catch((error) => {
          console.error("Error fetching company data:", error);
        });
    }
  }, []);

  const handleNewCompanyNameChange = (event) => {
    setNewCompanyName(event.target.value);
    setIsCompanyNameValid(true); // Reset validation state on change
    setCompanyNameError(""); // Clear error message
    setChangesMade(true); // Set changes made flag
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

            setChangesMade(false); // Reset changes made flag
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
    <div className="bg-blue-100 min-h-screen p-8">
      <div className="flex items-center mb-6 mt-3">
        <h3 className="text-2xl font-semibold">
          {t("CompanyProfile.companyInformation")}
        </h3>
      </div>
      <div className="bg-white w-full max-w-5xl rounded-lg shadow-lg p-8">
        {companyList.map((company) => (
          <div key={company.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col items-start justify-center w-full">
              <label htmlFor={`companyName_${company.id}`} className="font-medium text-black">
                {t("CompanyProfile.companyNamePlaceholder")}
              </label>
              <input
                type="text"
                id={`companyName_${company.id}`}
                value={company.name}
                readOnly
                className="mt-2 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
            <div className="flex flex-col items-start justify-center w-full">
              <label htmlFor={`companySize_${company.id}`} className="font-medium text-black">
                {t("CompanyProfile.companySize")}
              </label>
              <input
                type="text"
                id={`companySize_${company.id}`}
                value={company.company_size}
                readOnly
                className="mt-2 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
            <div className="flex flex-col items-start justify-center w-full">
              <label htmlFor={`jobTitle_${company.id}`} className="font-medium text-black">
                {t("CompanyProfile.jobTitle")}
              </label>
              <input
                type="text"
                id={`jobTitle_${company.id}`}
                value={company.job_title}
                readOnly
                className="mt-2 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
            {/* Add more fields for other company information */}
          </div>
        ))}

        {/* {changesMade && (
          <div className="flex justify-end">
            <Button
              variant="primary"
              onClick={handleSaveChanges}
              className="bg-primary hover:bg-primary-dark"
            >
              {t("CompanyProfile.saveChanges")}
            </Button>
          </div>
        )} */}

        {success && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
            {t("CompanyProfile.successMessage")}
          </div>
        )}

        {/* <Modal
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
        </Modal> */}
      </div>
    </div>
  );
};

export default CompanyProfile;
