import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompanyProfile = () => {
  const [user, setUser] = useState(null); // State to store user information
  const [companyList, setCompanyList] = useState([]); // State to store list of companies
  const [activeCompany, setActiveCompany] = useState(null); // State to store active company

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // Pass token in the headers for authorization
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      // Fetch user data
      axios.get("http://localhost:5000/api/users/me", config)
        .then(response => {
          // Store user data in state
          setUser(response.data.user);
          
          // Fetch companies using user ID
          axios.get("http://localhost:5000/api/company/myCompanies", config)
            .then(companyResponse => {
              // Store company list in state
              setCompanyList(companyResponse.data);
            })
            .catch(error => {
              console.error("Error fetching company data:", error);
            });
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []); // Empty dependency array ensures this effect runs only once when component mounts

  // Function to handle activation of a company
  const handleActivateCompany = (company) => {
    // Save the active company in localStorage
    localStorage.setItem('activeCompany', JSON.stringify(company));
    setActiveCompany(company);
  };

  return (
    <div className="container mx-auto p-4">
      {user ? (
        <div>
          <h2 className="text-3xl font-semibold mb-4">Welcome, {user.first_name}!</h2>
          {/* Display user data in a card-like layout */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mt-0 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a3 3 0 0 0-3 3v1a3 3 0 0 0 1 2.236v1.28a4 4 0 0 0-1.33 2.5l-.007.024A2.5 2.5 0 1 0 4 14h12a2.5 2.5 0 0 0-2.496-2.5l-.004-.028A4 4 0 0 0 13 9.516v-1.28A3 3 0 0 0 14 6V5a3 3 0 0 0-3-3zM6 15v-1h8v1H6z" clipRule="evenodd" />
                </svg>
                <p className="ml-2">{user.last_name}</p>
              </div>
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mt-0 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 3.293a1 1 0 0 1 1.414 0l10 10a1 1 0 0 1-1.414 1.414L10 12.414l-4.293 4.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-8-8a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414L11.414 12l4.293 4.293a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-1.414 0l-10-10a1 1 0 1 1 1.414-1.414L8 14.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414l8-8a1 1 0 0 1 1.414 0z" clipRule="evenodd" />
                </svg>
                <p className="ml-2">{user.email}</p>
              </div>
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mt-0 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a3 3 0 0 0-3 3v1a3 3 0 0 0 1 2.236v1.28a4 4 0 0 0-1.33 2.5l-.007.024A2.5 2.5 0 1 0 4 14h12a2.5 2.5 0 0 0-2.496-2.5l-.004-.028A4 4 0 0 0 13 9.516v-1.28A3 3 0 0 0 14 6V5a3 3 0 0 0-3-3zM6 15v-1h8v1H6z" clipRule="evenodd" />
                </svg>
                <p className="ml-2">{user.phone}</p>
              </div>
            </div>
          </div>

          {/* Display company list */}
          <h3 className="text-2xl font-semibold mt-6 mb-4">Company List</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* List each company */}
            {companyList.map(company => (
              <li key={company.id} className="bg-white shadow-md rounded-md p-4">
                <p className="text-lg font-semibold">{company.name}</p>
                {/* Render activate button for each company */}
                <button 
                  onClick={() => handleActivateCompany(company)}
                  className={`mt-2 w-full px-4 py-2 rounded focus:outline-none 
                  ${activeCompany && activeCompany.id === company.id ? 
                  'bg-green-500 text-white hover:bg-green-600 focus:ring focus:ring-green-400' : 
                  'bg-blue-500 text-white hover:bg-blue-600 focus:ring focus:ring-blue-400'}`}
                >
                  {activeCompany && activeCompany.id === company.id ? 'Activated' : 'Activate'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-lg font-semibold text-center">Please login to view your profile.</p>
      )}
    </div>
  );
};

export default CompanyProfile;
