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
          <h2 className="text-2xl mb-4">Welcome, {user.first_name}!</h2>
          {/* Display other user details */}
          <p>Last Name: {user.last_name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>

          {/* Display company list */}
          <h3 className="text-lg font-semibold mt-6">Companies:</h3>
          <ul className="list-disc pl-6 mt-2">
            {/* List each company */}
            {companyList.map(company => (
              <li key={company.id} className="flex items-center justify-between py-2 border-b">
                <span>{company.name}</span>
                {/* Render activate button for each company */}
                <button 
                  onClick={() => handleActivateCompany(company)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
                >
                  Activate
                </button>
              </li>
            ))}
          </ul>

          {/* Display active company if exists */}
          {activeCompany && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Active Company:</h3>
              <p>{activeCompany.name}</p>
            </div>
          )}
        </div>
      ) : (
        <p>Please login to view your profile.</p>
      )}
    </div>
  );
};

export default CompanyProfile;
