import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  FormControl,
  Alert,
  Dropdown,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  fetchTests,
  addTest,
  deleteTest,
  editTest,
} from "../../actions/testAction";
import { useDispatch, useSelector } from "react-redux";
import TablePagination from "./TablePagination"; // Import your TablePagination component

const Tests = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const tests = useSelector((state) => state.test.tests);
  const categories = useSelector((state) => state.category.categories); // Get categories from Redux store
  const companies = useSelector((state) => state.company.companies);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [neweditTest, setNewEditTest] = useState(null);
  const [newTest, setNewTest] = useState({
    test_name: "",
    test_description: "",
    category_names: [], // Change to array for storing selected categories
    company_name: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [validationError, setValidationError] = useState(""); // State for validation error
  const [testNameError, setTestNameError] = useState("");
  const [testDescriptionError, setTestDescriptionError] = useState("");
  const [categoryNamesError, setCategoryNamesError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [testToDelete, setTestToDelete] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categorySuggestions, setCategorySuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryNameError, setCategoryNameError] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false); // State for showing category dropdown

  useEffect(() => {
    dispatch(fetchTests());
    // Save selected categories from Redux store to state
    setSelectedCategories(categories.map((category) => category.category_name));
  }, [dispatch, categories]);

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setValidationError(""); // Clear validation error when modal closes
  };
  const handleShowAddModal = () => {
    setShowAddModal(true);
    resetForm();
  };

  // Add function to handle category selection
  const handleCategorySelect = (categoryName) => {
    setNewTest({
      ...newTest,
      category_names: [categoryName], // Set the selected category in the input field
    });
    setCategorySuggestions([]); // Clear suggestions after selection
  };

  const handleCompanySelect = (companyName) => {
    setNewTest({
      ...newTest,
      company_name: companyName,
    });
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setValidationError(""); // Clear validation error when modal closes
  };
  const handleShowEditModal = (test) => {
    setShowEditModal(true);
    setNewEditTest(test);
    setNewTest({
      test_name: test.test_name,
      test_description: test.test_description,
      category_names: test.categories, // Assuming this is an array
      company_name: test.company,
    });
  };

  const handleShowDeleteModal = (test) => {
    setTestToDelete(test);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setTestToDelete(null);
    setShowDeleteModal(false);
  };

  const resetForm = () => {
    setNewTest({
      test_name: "",
      test_description: "",
      category_names: [],
      company_name: "",
    });
    setTestNameError("");
    setTestDescriptionError("");
    setCategoryNamesError("");
    setCompanyNameError("");
    setValidationError("");
  };

  const handleAddTest = async () => {
    // Validation checks
    let hasError = false;

    if (!newTest.test_name.trim()) {
      setTestNameError("Test name is required");
      hasError = true;
    } else {
      setTestNameError("");
    }
    if (!newTest.test_description.trim()) {
      setTestDescriptionError("Test description is required");
      hasError = true;
    } else {
      setTestDescriptionError("");
    }
    if (!newTest.category_names.join().trim()) {
      setCategoryNamesError("Test categories are required");
      hasError = true;
    } else {
      setCategoryNamesError("");
    }
    if (!newTest.company_name.trim()) {
      setCompanyNameError("Company name is required");
      hasError = true;
    } else {
      setCompanyNameError("");
    }

    if (hasError) {
      return;
    }

    const existingTest = tests.find(
      (test) => test.test_name.toLowerCase() === newTest.test_name.toLowerCase()
    );
    if (existingTest) {
      setTestNameError("Test already registered");
      return;
    }

    await dispatch(addTest(newTest));
    await dispatch(fetchTests());
    handleCloseAddModal();
    resetForm();
  };

  const handleEditTest = async () => {
    let hasError = false;

    if (!newTest.test_name.trim()) {
      setTestNameError("Test name is required");
      hasError = true;
    } else {
      setTestNameError("");
    }
    if (!newTest.test_description.trim()) {
      setTestDescriptionError("Test description is required");
      hasError = true;
    } else {
      setTestDescriptionError("");
    }
    if (!newTest.company_name.trim()) {
      setCompanyNameError("Company name is required");
      hasError = true;
    } else {
      setCompanyNameError("");
    }

    if (hasError) {
      return;
    }

    if (!neweditTest) {
      console.error("Error: newEditTest is undefined");
      return;
    }

    await dispatch(editTest(neweditTest.id, newTest));

    await dispatch(fetchTests());
    handleCloseEditModal();
  };

  const handleDeleteTest = (id) => {
    dispatch(deleteTest(id));
  };

  // const handleCategorySelect = (categoryName) => {
  //   setSelectedCategory(categoryName);
  //   setCategorySuggestions([]); // Clear suggestions after selection
  // };

  // Filter categories based on input value
  useEffect(() => {
    const filteredCategories = categories.filter((category) =>
      category.category_name
        .toLowerCase()
        .includes(selectedCategory.toLowerCase())
    );
    setCategorySuggestions(filteredCategories);
  }, [selectedCategory, categories]);

  const filteredTests = tests.filter((test) => {
    const fullName = `${test.test_name} ${test.testDescription}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of users per page
  // Pagination logic
  const totalPages = Math.ceil(filteredTests.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTests = filteredTests.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <h1>{t("tests.title")}</h1>
      <div className="mb-3">
        <input
          type="text"
          placeholder={t("tests.searchPlaceholder")}
          className="border border-gray-300 rounded px-3 py-1 w-1/4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleShowAddModal}
      >
        {t("tests.addTestButton")}
      </button>
      <table className="border-collapse w-full mb-4">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">ID</th>
            <th className="border border-gray-400 px-4 py-2">
              {t("tests.tableHeaders.testName")}
            </th>
            <th className="border border-gray-400 px-4 py-2">
              {t("tests.tableHeaders.testDescription")}
            </th>
            <th className="border border-gray-400 px-4 py-2">
              {t("tests.tableHeaders.testCategories")}
            </th>
            <th className="border border-gray-400 px-4 py-2">
              {t("tests.tableHeaders.actions")}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentTests.map((test) => (
            <tr key={test.id}>
              <td className="border border-gray-400 px-4 py-2">{test.id}</td>
              <td className="border border-gray-400 px-4 py-2">
                {test.test_name}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {test.test_description}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {test.categories}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2"
                  onClick={() => handleShowEditModal(test)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleShowDeleteModal(test)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TablePagination
        totalPages={Math.ceil(tests.length / itemsPerPage)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t("tests.modals.addTest.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTestName">
              <Form.Label>
                {t("tests.modals.addTest.formLabels.testName")}
              </Form.Label>
              <Form.Control
                type="text"
                value={newTest.test_name}
                onChange={(e) => {
                  setNewTest({ ...newTest, test_name: e.target.value });
                  setTestNameError("");
                }}
              />
              {testNameError && (
                <div className="text-danger">{testNameError}</div>
              )}
            </Form.Group>

            <Form.Group controlId="formTestDescription">
              <Form.Label>
                {t("tests.modals.addTest.formLabels.testDescription")}
              </Form.Label>
              <Form.Control
                type="text"
                value={newTest.test_description}
                onChange={(e) => {
                  setNewTest({ ...newTest, test_description: e.target.value });
                  setTestDescriptionError("");
                }}
              />
              {testDescriptionError && (
                <div className="text-danger">{testDescriptionError}</div>
              )}
            </Form.Group>

            <Form.Group controlId="formTestCategories">
              <Form.Label>
                {t("tests.modals.editTest.formLabels.testCategories")}
              </Form.Label>
              <Form.Control
                as="select"
                value={newTest.category_names}
                onChange={(e) => handleCategorySelect(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.category_name}>
                    {category.category_name}
                  </option>
                ))}
              </Form.Control>

              {categoryNameError && (
                <div className="text-danger">{categoryNameError}</div>
              )}
            </Form.Group>

            <Form.Group controlId="formCompanyName">
              <Form.Label>
                {t("tests.modals.addTest.formLabels.companyName")}
              </Form.Label>
              <Form.Control
                as="select"
                value={newTest.company_name}
                onChange={(e) => handleCompanySelect(e.target.value)}
              >
                <option value="">Select Company</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.name}>
                    {company.name}
                  </option>
                ))}
              </Form.Control>
              {companyNameError && (
                <div className="text-danger">{companyNameError}</div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            {t("tests.modals.addTest.buttons.close")}
          </Button>
          <Button
            variant="primary"
            onClick={handleAddTest}
            className="text-left"
          >
            {t("tests.modals.addTest.buttons.addTest")}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Test Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t("tests.modals.editTest.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTestName">
              <Form.Label>
                {t("tests.modals.editTest.formLabels.testName")}
              </Form.Label>
              <Form.Control
                type="text"
                value={newTest.test_name}
                onChange={(e) => {
                  setNewTest({ ...newTest, test_name: e.target.value });
                  setTestNameError("");
                }}
              />
              {testNameError && (
                <div className="text-danger">{testNameError}</div>
              )}
            </Form.Group>
            <Form.Group controlId="formTestDescription">
              <Form.Label>
                {t("tests.modals.editTest.formLabels.testDescription")}
              </Form.Label>
              <Form.Control
                type="text"
                value={newTest.test_description}
                onChange={(e) => {
                  setNewTest({ ...newTest, test_description: e.target.value });
                  setTestDescriptionError("");
                }}
              />
              {testDescriptionError && (
                <div className="text-danger">{testDescriptionError}</div>
              )}
            </Form.Group>
            <Form.Group controlId="formTestCategories">
              <Form.Label>Test Categories</Form.Label>
              <Form.Control
                as="select"
                value={newTest.category_names}
                onChange={(e) => handleCategorySelect(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.category_name}>
                    {category.category_name}
                  </option>
                ))}
              </Form.Control>
              {categoryNameError && (
                <div className="text-danger">{categoryNameError}</div>
              )}
            </Form.Group>
            <Form.Group controlId="formCompanyName">
              <Form.Label>
                {t("tests.modals.editTest.formLabels.companyName")}
              </Form.Label>
              <Form.Control
                as="select"
                value={newTest.company_name}
                onChange={(e) => handleCompanySelect(e.target.value)}
              >
                <option value="">Select Company</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.name}>
                    {company.name}
                  </option>
                ))}
              </Form.Control>
              {companyNameError && (
                <div className="text-danger">{companyNameError}</div>
              )}
            </Form.Group>
            {validationError && (
              <Alert variant="danger">{validationError}</Alert>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            {t("tests.modals.editTest.buttons.close")}
          </Button>
          <Button variant="primary" onClick={handleEditTest}>
            {t("tests.modals.editTest.buttons.saveChanges")}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Test</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this test?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDeleteTest(testToDelete.id);
              handleCloseDeleteModal();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Tests;
