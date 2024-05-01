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
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [neweditTest, setNewEditTest] = useState(null);
  const [newTest, setNewTest] = useState({
    test_name: "",
    test_description: "",
    category_names: [],
    company_name: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [validationError, setValidationError] = useState(""); // State for validation error
  const [testNameError, setTestNameError] = useState("");
  const [testDescriptionError, setTestDescriptionError] = useState("");
  const [categoryNamesError, setCategoryNamesError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");

  useEffect(() => {
    dispatch(fetchTests());
  }, [dispatch]);

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setValidationError(""); // Clear validation error when modal closes
  };
  const handleShowAddModal = () => setShowAddModal(true);

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setValidationError(""); // Clear validation error when modal closes
  };
  const handleShowEditModal = (test) => {
    setShowEditModal(true);
    setNewEditTest(test);
    setNewTest(test);
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
    // if (!newTest.category_names.trim()) {
    //   setCategoryNamesError("Test categories are required");
    //   hasError = true;
    // } else {
    //   setCategoryNamesError("");
    // }
    if (!newTest.company_name.trim()) {
      setCompanyNameError("Company name is required");
      hasError = true;
    } else {
      setCompanyNameError("");
    }

    if (hasError) {
      return;
    }

    await dispatch(addTest(newTest));
    await dispatch(fetchTests());
    handleCloseAddModal();
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
    // if (!newTest.category_names.trim()) {
    //   setCategoryNamesError("Test categories are required");
    //   hasError = true;
    // } else {
    //   setCategoryNamesError("");
    // }
    if (!newTest.company_name.trim()) {
      setCompanyNameError("Company name is required");
      hasError = true;
    } else {
      setCompanyNameError("");
    }

    if (hasError) {
      return;
    }


    await dispatch(editTest(editTest.id, newTest));

    await dispatch(fetchTests());
    handleCloseEditModal();
  };

  const handleDeleteTest = (id) => {
    dispatch(deleteTest(id));
  };

  const filteredTests = tests.filter((test) => {
    const fullName = `${test.testName} ${test.testDescription}`;
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
            <th>{t("tests.tableHeaders.companyName")}</th>
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
              <td>{test.company}</td>
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
                  onClick={() => handleDeleteTest(test.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Test Modal */}
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
                  setTestNameError("")
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
                  setTestDescriptionError("")
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
              <Form.Control
                type="text"
                value={newTest.category_names}
                onChange={(e) => {
                  // Split the input value by comma to extract individual category names
                  const categoryNamesArray = e.target.value.split(",");
                  // Update the category_names state with the array of category names
                  setNewTest({
                    ...newTest,
                    category_names: categoryNamesArray,
                  });
                }}
              />
              {categoryNamesError && (
                <div className="text-danger">{categoryNamesError}</div>
              )}
            </Form.Group>

            <Form.Group controlId="formCompanyName">
              <Form.Label>
                {t("tests.modals.addTest.formLabels.companyName")}
              </Form.Label>
              <Form.Control
                type="text"
                value={newTest.company_name}
                onChange={(e) => {
                  setNewTest({ ...newTest, company_name: e.target.value });
                  setCompanyNameError("")
                }}
              />
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
                  setTestNameError("")
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
                  setTestDescriptionError("")
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
                type="text"
                value={newTest.category_names}
                onChange={(e) => {
                  // Split the input value by comma to extract individual category names
                  const categoryNamesArray = e.target.value.split(",");
                  // Update the category_names state with the array of category names
                  setNewTest({
                    ...newTest,
                    category_names: categoryNamesArray,
                  });
                }}
              />
            </Form.Group>
            <Form.Group controlId="formCompanyName">
              <Form.Label>
                {t("tests.modals.editTest.formLabels.companyName")}
              </Form.Label>
              <Form.Control
                type="text"
                value={newTest.company_name}
                onChange={(e) => {
                  setNewTest({ ...newTest, company_name: e.target.value });
                  setCompanyNameError("")
                }}
              />
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
    </div>
  );
};

export default Tests;
