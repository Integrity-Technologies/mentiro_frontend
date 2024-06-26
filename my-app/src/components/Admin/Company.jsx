import React, { useState, useEffect } from "react";
import { Table, Form, FormControl, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import {
  addCompany,
  deleteCompany,
  editCompany,
  fetchCompanies,
  fetchJobTitles,
  fetchCompanySizes,
} from "../../actions/companyAction";
import { getToken } from "../../actions/authActions"; // Import getToken function
import TablePagination from "./TablePagination"; // Import your TablePagination component

const Company = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.companies);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const token = useSelector(getToken); // Get token from Redux store
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [newCompany, setNewCompany] = useState({ name: "", website: "", jobTitle: "", companySize: "" });
  const [errors, setErrors] = useState({});

  const [companyError, setCompanyError] = useState("");
  const [websiteError, setWebsiteError] = useState("");

  const [jobTitles, setJobTitles] = useState([]);
  const [companySizes, setCompanySizes] = useState([]);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedJobTitles = await fetchJobTitles();
      const fetchedCompanySizes = await fetchCompanySizes();
      setJobTitles(fetchedJobTitles);
      setCompanySizes(fetchedCompanySizes);
    };
    fetchData();
  }, []);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowEditModal = (company) => {
    setSelectedCompany(company);
    setNewCompany({ name: company.name, website: company.website, jobTitle: company.jobTitle, companySize: company.companySize });
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleShowDeleteModal = (company) => {
    setSelectedCompany(company);
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleSubmitAdd = async (e) => {
    e.preventDefault();

    let hasError = false;

    // Check if the company with the same name already exists
    const isCompanyExists = companies.some(
      (company) => company.name.toLowerCase() === newCompany.name.toLowerCase()
    );

    if (isCompanyExists) {
      setCompanyError("Company with this name already exists");
      hasError = true;
    } else if (!newCompany.name.trim()) {
      setCompanyError("Company name is required");
      hasError = true;
    } else {
      setCompanyError("");
    }

    if (!newCompany.website.trim()) {
      setWebsiteError("Website is required");
      hasError = true;
    } else {
      setWebsiteError("");
    }

    if (hasError) {
      return;
    }

    await dispatch(addCompany(newCompany));
    setNewCompany({ name: "", website: "", jobTitle: "", companySize: "" });
    await dispatch(fetchCompanies()); // Add this line to fetch updated company data
    handleCloseAddModal();
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    await dispatch(editCompany(selectedCompany.id, newCompany));
    setNewCompany({ name: "", website: "", jobTitle: "", companySize: "" });
    await dispatch(fetchCompanies()); // Add this line to fetch updated company data
    handleCloseEditModal();
  };

  const handleDelete = () => {
    dispatch(deleteCompany(selectedCompany.id));
    handleCloseDeleteModal();
  };

  const filteredCompany = companies.filter((company) => {
    const fullName = `${company.name} ${company.website} ${company.created_By}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of users per page
  // Pagination logic
  const totalPages = Math.ceil(filteredCompany.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCompanies = filteredCompany.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const handlePageChange = (page) => setCurrentPage(page);

  const handleJobTitleChange = (selectedOption) => {
    setNewCompany({ ...newCompany, jobTitle: selectedOption.value });
    setErrors({ ...errors, jobTitle: "" }); // Clear the validation error
  };

  const handleCompanySizeChange = (selectedOption) => {
    setNewCompany({ ...newCompany, companySize: selectedOption.value });
    setErrors({ ...errors, companySize: "" }); // Clear the validation error
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-4">Companies</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="border border-gray-300 rounded px-3 py-1 w-1/4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mr-4"
        onClick={handleShowAddModal}
      >
        Add Company
      </button>

      <table className="table-auto w-full mt-2">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Company Name</th>
            <th className="border px-4 py-2">Website</th>
            <th className="border px-4 py-2">Created By</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCompanies.map((company) => (
            <tr key={company.id}>
              <td className="border px-4 py-2">{company.id}</td>
              <td className="border px-4 py-2">{company.name}</td>
              <td className="border px-4 py-2">{company.website}</td>
              <td className="border px-4 py-2">{company.created_by_user}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2"
                  onClick={() => handleShowEditModal(company)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleShowDeleteModal(company)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TablePagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {/* Add Company Modal */}
      <Modal
        show={showAddModal}
        onHide={handleCloseAddModal}
        className="fixed inset-0 flex items-center justify-center"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitAdd}>
            <Form.Group controlId="formCompanyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company name"
                value={newCompany.name}
                onChange={(e) => {
                  setNewCompany({ ...newCompany, name: e.target.value });
                  setCompanyError("");
                }}
              />
              {companyError && (
                <div className="text-danger">{companyError}</div>
              )}
            </Form.Group>
            <div className="mb-6 mt-4">
              <div className="relative">
                <Select
                  name="companySize"
                  value={companySizes.find(
                    (option) => option.value === newCompany.companySize
                  )}
                  onChange={handleCompanySizeChange}
                  options={companySizes.map((size) => ({
                    value: size.size_range,
                    label: size.size_range,
                  }))}
                  className="block w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder={t("signup.select_company_size")}
                />
                {errors.companySize && (
                  <span className="text-danger text-sm">
                    {errors.companySize}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-3">
              <div className="relative">
                <Select
                  name="jobTitle"
                  value={jobTitles.find(
                    (option) => option.value === newCompany.jobTitle
                  )}
                  onChange={handleJobTitleChange}
                  options={jobTitles.map((title) => ({
                    value: title.title,
                    label: title.title,
                  }))}
                  className="block w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder={t("signup.select_job_title")}
                />
                {errors.jobTitle && (
                  <span className="text-danger text-sm">
                    {errors.jobTitle}
                  </span>
                )}
              </div>
            </div>
            <Form.Group controlId="formCompanyWebsite">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter website"
                value={newCompany.website}
                onChange={(e) => {
                  setNewCompany({ ...newCompany, website: e.target.value });
                  setWebsiteError("");
                }}
              />
              {websiteError && (
                <div className="text-danger">{websiteError}</div>
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Company Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitEdit}>
            <Form.Group controlId="formEditCompanyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company name"
                value={newCompany.name}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, name: e.target.value })
                }
              />
            </Form.Group>
            <div className="mb-6 mt-4">
              <div className="relative">
                <Select
                  name="companySize"
                  value={companySizes.find(
                    (option) => option.value === newCompany.companySize
                  )}
                  onChange={handleCompanySizeChange}
                  options={companySizes.map((size) => ({
                    value: size.size_range,
                    label: size.size_range,
                  }))}
                  className="block w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder={t("signup.select_company_size")}
                />
                {errors.companySize && (
                  <span className="text-danger text-sm">
                    {errors.companySize}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-3">
              <div className="relative">
                <Select
                  name="jobTitle"
                  value={jobTitles.find(
                    (option) => option.value === newCompany.jobTitle
                  )}
                  onChange={handleJobTitleChange}
                  options={jobTitles.map((title) => ({
                    value: title.title,
                    label: title.title,
                  }))}
                  className="block w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder={t("signup.select_job_title")}
                />
                {errors.jobTitle && (
                  <span className="text-danger text-sm">
                    {errors.jobTitle}
                  </span>
                )}
              </div>
            </div>
            <Form.Group controlId="formEditCompanyWebsite">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter website"
                value={newCompany.website}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, website: e.target.value })
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Company Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete{" "}
            {selectedCompany && selectedCompany.name}?
          </p>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Company;
