import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, FormControl } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  getAllUsers,
  deleteUser,
  editUser,
  addUser,
} from "../../actions/userAction"; // Import actions
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch hook
import TablePagination from "./TablePagination";
import countries from "../../data/countries";

const Users = () => {
  const { t } = useTranslation(); // Use useTranslation hook here
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users); // Assuming your Redux store has a slice called 'users'
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newEditUser, setNewEditUser] = useState(null);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [newUser, setNewUser] = useState({
    id: "",
    first_name: "",
    last_name: "",
    phone: "",
    countryCode: "",
    email: "",
    password: "",
    created_at: "",
  });

   const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);


  const validateEmail = (email) => {
    // Regular expression for email validation
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllUsers()); // Dispatch action to fetch categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = (user) => {
    setShowEditModal(true);
    setNewEditUser(users);
    setNewUser(user);
  };

  const handleAddUser = async () => {
    try {
      // Validation checks
      let hasError = false; // Flag to track if any error occurred

    if (!newUser.first_name.trim()) {
      setFirstNameError("First name is required");
      hasError = true; // Set flag if there's an error
    } else {
      setFirstNameError(""); // Clear error if no error
    }
    if (!newUser.last_name.trim()) {
      setLastNameError("Last name is required");
      hasError = true;
    } else {
      setLastNameError("");
    }
    if (!newUser.phone.trim()) {
      setPhoneError("Phone number is required");
      hasError = true;
    } else {
      setPhoneError("");
    }
    if (!newUser.email.trim() || !validateEmail(newUser.email.trim())) {
        setEmailError("Please enter a valid email address");
        hasError = true;
      } else {
        setEmailError("");
      }

    if (!newUser.password.trim()) {
      setPasswordError("Password is required");
      hasError = true;
    } else {
      setPasswordError("");
    }

    // Check if any field is empty
    if (hasError) {
      return; // Exit function if any error occurred
    }

    // Check for duplicate email
    const duplicateEmail = users.some((user) => user.email === newUser.email);
    if (duplicateEmail) {
      setEmailError("User with this email already registered");
      return;
    }
    const phone = `+${newUser.countryCode}${newUser.phone}`;


      // Dispatch addUser action if all fields are filled and email is unique
      const addedUser = await dispatch(addUser(newUser, phone ));
      if (addedUser) {
        await dispatch(getAllUsers());
        handleCloseAddModal();
        resetForm(); // Reset form after successful addition
         // Set success message
        setSuccessMessage("User Saved Changes");

        // Clear success message after 1 minute
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleEditUser = async () => {
    try {

      let hasError = false; // Flag to track if any error occurred

    if (!newUser.first_name.trim()) {
      setFirstNameError("First name is required");
      hasError = true; // Set flag if there's an error
    } else {
      setFirstNameError(""); // Clear error if no error
    }
    if (!newUser.last_name.trim()) {
      setLastNameError("Last name is required");
      hasError = true;
    } else {
      setLastNameError("");
    }
    if (!newUser.phone.trim()) {
      setPhoneError("Phone number is required");
      hasError = true;
    } else {
      setPhoneError("");
    }
    if (!newUser.email.trim()) {
      setEmailError("Email is required");
      hasError = true;
    } else {
      setEmailError("");
    }
    if (!newUser.password.trim()) {
      setPasswordError("Password is required");
      hasError = true;
    } else {
      setPasswordError("");
    }

    // Check if any field is empty
    if (hasError) {
      return; // Exit function if any error occurred
    }

    // // Check for duplicate email
    // const duplicateEmail = users.some((user) => user.email === newUser.email);
    // if (duplicateEmail) {
    //   setEmailError("User with this email already registered");
    //   return;
    // }



      await dispatch(editUser(newUser.id, newUser));

      await dispatch(getAllUsers());
      handleCloseEditModal();
      resetForm(); // Reset form after successful editing
      // Set success message
      setSuccessMessage("User Saved Changes");

      // Clear success message after 1 minute
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);

    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    // Show delete confirmation modal
    const user = users.find(user => user.id === id);
    setUserToDelete(user);
    setShowDeleteConfirmationModal(true);
  };

  const confirmDeleteUser = async () => {
    try {
      await dispatch(deleteUser(userToDelete.id));
      await dispatch(getAllUsers());
      setShowDeleteConfirmationModal(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const cancelDeleteUser = () => {
    setShowDeleteConfirmationModal(false);
    setUserToDelete(null);
  };

  const handleCountryCodeChange = (e) => {
    setNewUser({ ...newUser, countryCode: e.target.value });
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of users per page
    // Pagination logic
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  
    const handlePageChange = (page) => setCurrentPage(page);  

  const resetForm = () => {
    setNewUser({
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password: "",
      created_at: "",
    });
    setFirstNameError("");
    setLastNameError("");
    setPhoneError("");
    setEmailError("");
    setPasswordError("");
  };


  return (
    <div className="p-4">
    <h1 className="text-4xl mb-4">{t("users.title")}</h1>
    <div className="items-center justify-between mb-4">
    <div className="items-center">
      <input
        type="text"
        placeholder={t("users.searchPlaceholder")}
        className="p-2 border border-gray-300 rounded mr-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      </div>
      </div>
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleShowAddModal}
      >
        {t("users.addUserButton")}
      </button>

  {successMessage && (
      <Alert variant="success" className="mt-3">
        {successMessage}
      </Alert>
    )}
      
    <div className="overflow-x-auto mt-2">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">{t("users.tableHeaders.firstName")}</th>
            <th className="border px-4 py-2">{t("users.tableHeaders.lastName")}</th>
            <th className="border px-4 py-2">{t("users.tableHeaders.phone")}</th>
            <th className="border px-4 py-2">{t("users.tableHeaders.email")}</th>
            <th className="border px-4 py-2">{t("users.tableHeaders.dateJoined")}</th>
            <th className="border px-4 py-2">{t("users.tableHeaders.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.first_name}</td>
              <td className="border px-4 py-2">{user.last_name}</td>
              <td className="border px-4 py-2">{user.phone}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.created_at}</td>
              <td className="border flex px-4 py-3">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2"
                  onClick={() => handleShowEditModal(user)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <TablePagination
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    />
      

      {/* Add User Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal} className="fixed inset-0 flex items-center justify-center">
  <div className="bg-white rounded-lg w-76 p-8">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold">{t("users.modals.addUser.title")}</h2>
      <button onClick={handleCloseAddModal}>
        <svg
          className="w-6 h-6 text-gray-600 hover:text-gray-700 cursor-pointer"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <form>
      <div className="mb-4">
        <label className="block mb-1">
          {t("users.modals.addUser.formLabels.firstName")}
        </label>
        <input
          type="text"
          value={newUser.first_name}
          onChange={(e) => {
            setNewUser({ ...newUser, first_name: e.target.value });
            setFirstNameError(""); // Clear error when user starts typing
          }}
          className="border border-gray-300 rounded w-full px-3 py-2"
        />
        {firstNameError && (
          <div className="text-red-500">{firstNameError}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-1">
          {t("users.modals.addUser.formLabels.lastName")}
        </label>
        <input
          type="text"
          value={newUser.last_name}
          onChange={(e) => {
            setNewUser({ ...newUser, last_name: e.target.value });
            setLastNameError(""); // Clear error when user starts typing
          }}
          className="border border-gray-300 rounded w-full px-3 py-2"
        />
        {lastNameError && (
          <div className="text-red-500">{lastNameError}</div>
        )}
      </div>
      <div className="mb-4 flex">
        <select
          value={newUser.countryCode}
          onChange={handleCountryCodeChange}
          className="border border-gray-300 rounded px-1 py-1 mr-1 w-20"
        >
          {countries?.map((country, index) => (
                    <option key={index} value={country.country_phone_code}>
                      {`+${country.country_phone_code} (${country.country_name})`}
                    </option>
                  ))}
        </select>
        <input
          type="phone"
          name="phone"
          value={newUser.phone}
          onChange={(e) => {
            setNewUser({ ...newUser, phone: e.target.value });
            setPhoneError(""); // Clear error when user starts typing
          }}
          placeholder={t("signup.enterPhone")}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        {phoneError && (
          <div className="text-red-500">{phoneError}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-1">
          {t("users.modals.addUser.formLabels.email")}
        </label>
        <input
          type="email"
          value={newUser.email}
          onChange={(e) => {
            setNewUser({ ...newUser, email: e.target.value });
            setEmailError(""); // Clear error when user starts typing
          }}
          className="border border-gray-300 rounded w-full px-3 py-2"
        />
        {emailError && (
          <div className="text-red-500">{emailError}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-1">
          {t("users.modals.addUser.formLabels.password")}
        </label>
        <input
          type="password"
          value={newUser.password}
          onChange={(e) => {
            setNewUser({ ...newUser, password: e.target.value });
            setPasswordError(""); // Clear error when user starts typing
          }}
          className="border border-gray-300 rounded w-full px-3 py-2"
        />
        {passwordError && (
          <div className="text-red-500">{passwordError}</div>
        )}
      </div>
    </form>
    <div className="flex justify-end mt-6">
      <button
        className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded"
        onClick={handleAddUser}
      >
        {t("users.modals.addUser.buttons.addUser")}
      </button>
      <button
        className="text-gray-500 hover:text-gray-600 ml-4"
        onClick={handleCloseAddModal}
      >
        {t("users.modals.addUser.buttons.close")}
      </button>
    </div>
  </div>
</Modal>

      {/* Edit User Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} className="fixed inset-0 flex items-center justify-center">
  <div className="bg-white rounded-lg w-76 p-8">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold">{t("users.modals.editUser.title")}</h2>
      <button onClick={handleCloseEditModal}>
        <svg
          className="w-6 h-6 text-gray-600 hover:text-gray-700 cursor-pointer"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <form>
      <div className="mb-4">
        <label className="block mb-1">
          {t("users.modals.editUser.formLabels.firstName")}
        </label>
        <input
          type="text"
          value={newUser.first_name}
          onChange={(e) => {
            setNewUser({ ...newUser, first_name: e.target.value });
            setFirstNameError(""); // Clear error when user starts typing
          }}
          className="border border-gray-300 rounded w-full px-3 py-2"
        />
        {firstNameError && (
          <div className="text-red-500">{firstNameError}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-1">
          {t("users.modals.editUser.formLabels.lastName")}
        </label>
        <input
          type="text"
          value={newUser.last_name}
          onChange={(e) => {
            setNewUser({ ...newUser, last_name: e.target.value });
            setLastNameError(""); // Clear error when user starts typing
          }}
          className="border border-gray-300 rounded w-full px-3 py-2"
        />
        {lastNameError && (
          <div className="text-red-500">{lastNameError}</div>
        )}
      </div>
      <div className="mb-4 flex">
        <select
          value={newUser.countryCode}
          onChange={handleCountryCodeChange}
          className="border border-gray-300 rounded px-1 py-1 mr-1 w-20"
        >
           {countries?.map((country, index) => (
                    <option key={index} value={country.country_phone_code}>
                      {`+${country.country_phone_code} (${country.country_name})`}
                    </option>
                  ))}
        </select>
        <input
          type="phone"
          name="phone"
          value={newUser.phone}
          onChange={(e) => {
            setNewUser({ ...newUser, phone: e.target.value });
            setPhoneError(""); // Clear error when user starts typing
          }}
          placeholder={t("signup.enterPhone")}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">
          {t("users.modals.editUser.formLabels.email")}
        </label>
        <input
          type="email"
          value={newUser.email}
          onChange={(e) => {
            setNewUser({ ...newUser, email: e.target.value });
            setEmailError(""); // Clear error when user starts typing
          }}
          className="border border-gray-300 rounded w-full px-3 py-2"
        />
        {emailError && (
          <div className="text-red-500">{emailError}</div>
        )}
      </div>
      {/* <div className="mb-4">
        <label className="block mb-1">
          {t("users.modals.editUser.formLabels.password")}
        </label>
        <input
          type="password"
          value={newUser.password}
          onChange={(e) => {
            setNewUser({ ...newUser, password: e.target.value });
            setPasswordError(""); // Clear error when user starts typing
          }}
          className="border border-gray-300 rounded w-full px-3 py-2"
        />
        {passwordError && (
          <div className="text-red-500">{passwordError}</div>
        )}
      </div> */}
    </form>
    <div className="flex justify-end mt-6">
      <button
        className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded"
        onClick={handleEditUser}
      >
        {t("users.modals.editUser.buttons.saveChanges")}
      </button>
      <button
        className="text-gray-500 hover:text-gray-600 ml-4"
        onClick={handleCloseEditModal}
      >
        {t("users.modals.editUser.buttons.close")}
      </button>
    </div>
  </div>
</Modal>


<Modal show={showDeleteConfirmationModal} onHide={cancelDeleteUser} className="fixed inset-0 flex items-center justify-center">
  <div className="bg-white rounded-lg w-76 p-8">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">Delete User</h2>
      <button onClick={cancelDeleteUser}>
        <svg
          className="w-6 h-6 text-gray-600 hover:text-gray-700 cursor-pointer"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <div className="text-gray-700 mb-6">
      <p>Are you sure you want to delete this user?</p>
    </div>
    <div className="flex justify-end">
      <button
        className="text-gray-500 hover:text-gray-600 mr-4"
        onClick={cancelDeleteUser}
      >
        Cancel
      </button>
      <button
        className="text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded"
        onClick={confirmDeleteUser}
      >
        Delete
      </button>
    </div>
  </div>
</Modal>
    </div>
  );
};

export default Users;
