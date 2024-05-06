import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  FormControl,
  Alert,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  fetchTests,
  addTest,
  deleteTest,
  editTest,
} from "../../actions/testAction";
import { useDispatch, useSelector } from "react-redux";

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
    setSelectedCategory(categoryName);
    setCategorySuggestions([]); // Clear suggestions after selection
    if (!newTest.category_names.includes(categoryName)) {
      setNewTest({
        ...newTest,
        category_names: [...newTest.category_names, categoryName],
      });
    }
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

  return (
    <div>
      <h1>{t("tests.title")}</h1>
      <Form inline className="mb-3">
        <FormControl
          type="text"
          placeholder={t("tests.searchPlaceholder")}
          className="mr-sm-2 w-25 text-left"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>
      <Button variant="success" onClick={handleShowAddModal}>
        {t("tests.addTestButton")}
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>{t("tests.tableHeaders.testName")}</th>
            <th>{t("tests.tableHeaders.testDescription")}</th>
            <th>{t("tests.tableHeaders.testCategories")}</th>
            <th>{t("tests.tableHeaders.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {filteredTests.map((test) => (
            <tr key={test.id}>
              <td>{test.id}</td>
              <td>{test.test_name}</td>
              <td>{test.test_description}</td>
              <td>{test.categories}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleShowEditModal(test)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleShowDeleteModal(test)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

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
                {t("tests.modals.addTest.formLabels.testCategories")}
              </Form.Label>
              <FormControl
                type="text"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                placeholder="Type to search categories"
              />
              {selectedCategory && (
                <div>
                  {categorySuggestions.map((category) => (
                    <div
                      key={category.id}
                      onClick={() =>
                        handleCategorySelect(category.category_name)
                      }
                      className={`p-2 ${
                        selectedCategory === category.category_name
                          ? "bg-primary text-white"
                          : ""
                      }`}
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedCategory === category.category_name
                            ? "blue"
                            : "transparent",
                      }}
                    >
                      {category.category_name}
                    </div>
                  ))}
                </div>
              )}
              {categoryNamesError && (
                <div className="text-danger">{categoryNamesError}</div>
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
              <Form.Label>
                {t("tests.modals.editTest.formLabels.testCategories")}
              </Form.Label>
              <FormControl
                as="select"
                multiple
                value={newTest.category_names}
                onChange={(e) => {
                  const selectedOptions = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  );
                  setNewTest({
                    ...newTest,
                    category_names: selectedOptions,
                  });
                }}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.category_name}>
                    {category.category_name}
                  </option>
                ))}
              </FormControl>
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
