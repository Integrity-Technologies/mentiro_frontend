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

    if (!newCompany.name.trim()) {
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
    console.log(token);
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
    const fullName = `${company.name} ${company.website}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>Companies</h1>
      <Form inline className="mb-3">
        <FormControl
          type="text"
          placeholder="Search by name"
          className="mr-sm-2 w-25"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>
      <Button variant="success" onClick={handleShowAddModal}>
        Add Company
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Website</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompany.map((company) => (
            <tr key={company.id}>
              <td>{company.id}</td>
              <td>{company.name}</td>
              <td>{company.website}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleShowEditModal(company)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleShowDeleteModal(company)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Company Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
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
                  setWebsiteError("")
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
