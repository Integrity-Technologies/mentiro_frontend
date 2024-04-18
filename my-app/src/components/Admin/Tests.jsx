import React, { useState } from "react";
import { Table, Button, Modal, Form, FormControl } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Tests = () => {
  const { t, i18n } = useTranslation(); // Use useTranslation hook here
  const [tests, setTests] = useState([
    {
      id: 1,
      testName: "Test 1",
      testDescription: "Description for Test 1",
      testCategories: "Category A",
      testLevel: "Beginner",
      companyName: "Company A",
    },
    {
      id: 2,
      testName: "Test 2",
      testDescription: "Description for Test 2",
      testCategories: "Category B",
      testLevel: "Intermediate",
      companyName: "Company B",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTest, setEditTest] = useState(null);
  const [newTest, setNewTest] = useState({
    id: "",
    testName: "",
    testDescription: "",
    testCategories: "",
    testLevel: "",
    companyName: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = (test) => {
    setShowEditModal(true);
    setEditTest(test);
    setNewTest(test);
  };

  const handleAddTest = () => {
    const id = tests.length > 0 ? tests[tests.length - 1].id + 1 : 1; // Generate a unique ID
    const newTestWithId = { ...newTest, id }; // Add ID to the new test object
    setTests([...tests, newTestWithId]);
    setNewTest({
      id: "",
      testName: "",
      testDescription: "",
      testCategories: "",
      testLevel: "",
      companyName: "",
    });
    handleCloseAddModal();
  };

  const handleEditTest = () => {
    setTests(tests.map((test) => (test.id === editTest.id ? newTest : test)));
    setEditTest(null);
    handleCloseEditModal();
  };

  const handleDeleteTest = (id) => {
    setTests(tests.filter((test) => test.id !== id));
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
            <th>{t("tests.tableHeaders.testLevel")}</th>
            <th>{t("tests.tableHeaders.companyName")}</th>
            <th>{t("tests.tableHeaders.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {filteredTests.map((test) => (
            <tr key={test.id}>
              <td>{test.id}</td>
              <td>{test.testName}</td>
              <td>{test.testDescription}</td>
              <td>{test.testCategories}</td>
              <td>{test.testLevel}</td>
              <td>{test.companyName}</td>
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
                value={newTest.testName}
                onChange={(e) =>
                  setNewTest({ ...newTest, testName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formTestDescription">
              <Form.Label>
                {t("tests.modals.addTest.formLabels.testDescription")}
              </Form.Label>
              <Form.Control
                type="text"
                value={newTest.testDescription}
                onChange={(e) =>
                  setNewTest({ ...newTest, testDescription: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formTestCategories">
              <Form.Label>
                {t("tests.modals.addTest.formLabels.testCategories")}
              </Form.Label>
              <Form.Control
                type="text"
                value={newTest.testCategories}
                onChange={(e) =>
                  setNewTest({ ...newTest, testCategories: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formTestLevel">
              <Form.Label>
                {t("tests.modals.addTest.formLabels.testLevel")}
              </Form.Label>
              <Form.Control
                type="text"
                value={newTest.testLevel}
                onChange={(e) =>
                  setNewTest({ ...newTest, testLevel: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formCompanyName">
              <Form.Label>
                {t("tests.modals.addTest.formLabels.companyName")}
              </Form.Label>
              <Form.Control
                type="text"
                value={newTest.companyName}
                onChange={(e) =>
                  setNewTest({ ...newTest, companyName: e.target.value })
                }
              />
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
                value={newTest.testName}
                onChange={(e) =>
                  setNewTest({ ...newTest, testName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formTestDescription">
              <Form.Label>
                {t("tests.modals.editTest.formLabels.testDescription")}
              </Form.Label>
              <Form.Control
                type="text"
                value={newTest.testDescription}
                onChange={(e) =>
                  setNewTest({ ...newTest, testDescription: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formTestCategories">
              <Form.Label>
                {t("tests.modals.editTest.formLabels.testCategories")}
              </Form.Label>
              <Form.Control
                type="text"
                value={newTest.testCategories}
                onChange={(e) =>
                  setNewTest({ ...newTest, testCategories: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formTestLevel">
              <Form.Label>
                {t("tests.modals.editTest.formLabels.testLevel")}
              </Form.Label>
              <Form.Control
                type="text"
                value={newTest.testLevel}
                onChange={(e) =>
                  setNewTest({ ...newTest, testLevel: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formCompanyName">
              <Form.Label>
                {t("tests.modals.editTest.formLabels.companyName")}
              </Form.Label>
              <Form.Control
                type="text"
                value={newTest.companyName}
                onChange={(e) =>
                  setNewTest({ ...newTest, companyName: e.target.value })
                }
              />
            </Form.Group>
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
