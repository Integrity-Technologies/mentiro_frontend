import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { FaUser, FaBuilding, FaEnvelope, FaPhone } from 'react-icons/fa';

const CompanyProfile = () => {
  const [user, setUser] = useState(null);
  const [companyList, setCompanyList] = useState([]);
  const [activeCompany, setActiveCompany] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
  
      axios.get("http://localhost:5000/api/users/me", config)
        .then(response => {
          setUser(response.data.user);
          
          axios.get("http://localhost:5000/api/company/myCompanies", config)
            .then(companyResponse => {
              setCompanyList(companyResponse.data);
  
              // Check if there's an active company stored in localStorage
              const storedActiveCompany = JSON.parse(localStorage.getItem('activeCompany'));
              if (storedActiveCompany) {
                // If there's an active company stored, set it as active
                setActiveCompany(storedActiveCompany);
              }
            })
            .catch(error => {
              console.error("Error fetching company data:", error);
            });
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);
   // Empty dependency array ensures this effect runs only once when component mounts

  // Function to handle activation of a company
  const handleActivateCompany = (company) => {
    // Save the active company in localStorage
    localStorage.setItem('activeCompany', JSON.stringify(company));
    setActiveCompany(company);
  };

  return (
    <div className="container mx-auto p-4 h-100">
      {user ? (
        <div className="bg-white shadow-md rounded-lg p-6 min-h-screen">
          <h2 className="text-3xl font-semibold mb-4 flex items-center">
            <FaUser className="mr-2 text-gray-500" />
            {t('CompanyProfile.welcomeMessage')} {user.first_name}!
          </h2>
          <hr className="mb-6 border-gray-400" />


          {/* Display user data in a card-like layout */}
          <div className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-center bg-gray-100 shadow-sm rounded-md p-2">
                <FaUser className="mt-0 text-gray-500" size={18} />
                <p className="ml-2 mt-2.5">{user.last_name}</p>
              </div>
              <div className="flex items-center justify-center bg-gray-100 shadow-sm rounded-md p-2">
                <FaEnvelope className="mt-0 text-gray-500" size={18} />
                <p className="ml-2 mt-2.5">{user.email}</p>
              </div>
              <div className="flex items-center justify-center bg-gray-100 shadow-sm rounded-md p-2">
                <FaPhone className="mt-0 text-gray-500" size={18} />
                <p className="ml-2 mt-2.5">{user.phone}</p>
              </div>
            </div>
          </div>

          {/* Display company list */}
          <h3 className="text-2xl font-semibold mt-20 mb-4 flex items-center">
            <FaBuilding className="mr-2 text-gray-500" />
            {t('CompanyProfile.companyList')}
          </h3>
          <hr className="mb-6 border-gray-400" />


          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* List each company */}
            {companyList.map(company => (
              <li key={company.id} className="bg-gray-100 shadow-sm rounded-md p-4">
                <p className="text-lg font-semibold">{company.name}</p>
                {/* Render activate button for each company */}
                <button 
                  onClick={() => handleActivateCompany(company)}
                  className={`mt-2 w-full px-4 py-2 rounded focus:outline-none 
                  ${activeCompany && activeCompany.id === company.id ? 
                  'bg-green-500 text-white hover:bg-green-600 focus:ring focus:ring-green-400' : 
                  'bg-blue-500 text-white hover:bg-blue-600 focus:ring focus:ring-blue-400'}`}
                >
                  {activeCompany && activeCompany.id === company.id ? `${t('CompanyProfile.activatedButton')}` :`${t('CompanyProfile.activateButton')}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-lg font-semibold text-center">{t('CompanyProfile.loginMessage')}</p>
      )}
    </div>
  );
};

export default CompanyProfile;
