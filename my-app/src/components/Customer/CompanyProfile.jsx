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
          {/* Display other user details */}
          <div className="bg-gray-100 p-6 rounded-lg mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-lg font-semibold">Last Name:</p>
                <p>{user.last_name}</p>
              </div>
              <div>
                <p className="text-lg font-semibold">Email:</p>
                <p>{user.email}</p>
              </div>
              <div>
                <p className="text-lg font-semibold">Phone:</p>
                <p>{user.phone}</p>
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
