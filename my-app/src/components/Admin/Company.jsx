import React, { useState, useEffect } from "react";
import { Table, Form, FormControl, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addCompany,
  deleteCompany,
  editCompany,
  fetchCompanies,
} from "../../actions/companyAction";
import { getToken } from "../../actions/authActions"; // Import getToken function

const Company = () => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.companies);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const token = useSelector(getToken); // Get token from Redux store
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [newCompany, setNewCompany] = useState({ name: "", website: "" });
  const [companyError, setCompanyError] = useState("");
  const [websiteError, setWebsiteError] = useState("");

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowEditModal = (company) => {
    setSelectedCompany(company);
    setNewCompany({ name: company.name, website: company.website }); // Set initial state with company values
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
    setNewCompany({ name: "", website: "" });
    await dispatch(fetchCompanies()); // Add this line to fetch updated company data
    handleCloseAddModal();
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    await dispatch(editCompany(selectedCompany.id, newCompany));
    setNewCompany({ name: "", website: "" }); // Remove this line
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
          {filteredCompany.map((company) => (
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
