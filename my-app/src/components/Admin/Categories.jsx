import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  FormControl,
  Alert,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCategories,
  addCategory,
  deleteCategory,
} from "../../actions/categoryAction"; // Correct import statement
import { editCategory } from "../../actions/categoryAction";
import { getToken } from "../../actions/authActions"; // Import getToken function

const Category = () => {
  const categories = useSelector((state) => state.category.categories); // Get categories from state
  const dispatch = useDispatch(); // Initialize dispatch

  const [categoryId, setCategoryId] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryNameError, setCategoryNameError] = useState(""); // State for category name validation error
  const token = useSelector(getToken); // Get token from Redux store
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

  const resetForm = () => {
    setNewCategory("");
    setCategoryNameError("");
  };

  const handleShowDeleteModal = (categoryId) => {
    setCategoryIdToDelete(categoryId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllCategories()); // Dispatch action to fetch categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setCategoryNameError(""); // Clear category name error when modal closes
    setNewCategory(""); // Clear category name input when modal closes
    resetForm();
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
    resetForm(); // Clear category name input and error state when modal opens
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setCategoryNameError(""); // Clear category name error when modal closes
    resetForm();
  };

  const handleShowEditModal = (category) => {
    setShowEditModal(true);
    setNewCategory(category.category_name); // Set the initial value of the category name in the modal
    setCategoryId(category.id); // Set the category ID
    resetForm();
  };



  const handleAddCategory = async () => {
    try {
      if (!newCategory.trim()) {
        setCategoryNameError("Category name is required");
        return;
      }
  
      // Check if category already exists
      const existingCategory = categories.find(category => category.category_name.toLowerCase() === newCategory.toLowerCase());
      if (existingCategory) {
        setCategoryNameError("Category already exists");
        return;
      }
  
      const responseData = await dispatch(addCategory(newCategory));
      console.log(responseData);
      console.log(token); // Console log the token
      handleCloseAddModal();
      await dispatch(getAllCategories());
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };
  

  const handleEditCategory = async () => {
    try {
      if (!newCategory.trim()) {
        setCategoryNameError("Category name is required");
        return;
      }
      await dispatch(editCategory(categoryId, newCategory));
      await dispatch(getAllCategories());
      handleCloseEditModal();
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await dispatch(deleteCategory(categoryId));
      await dispatch(getAllCategories());
      setShowDeleteModal(false); // Close the delete modal after deletion
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  

  const filteredCategories = categories.filter((category) => {
    const fullName = `${category.category_name}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>Categories</h1>
      <Form inline className="mb-3">
        <FormControl
          type="text"
          placeholder="Search by name"
          className="mr-sm-2 w-25 text-left"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>
      <Button variant="success" onClick={handleShowAddModal}>
        Add Category
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.category_name}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleShowEditModal(category)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleShowDeleteModal(category.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Category Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCategoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                value={newCategory}
                onChange={(e) => {
                  setNewCategory(e.target.value);
                  setCategoryNameError(""); // Clear error when user starts typing
                }}
              />
              {categoryNameError && (
                <div className="text-danger">{categoryNameError}</div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleAddCategory}
            className="text-left"
          >
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Category Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCategoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                value={newCategory}
                onChange={(e) => {
                  setNewCategory(e.target.value);
                  setCategoryNameError(""); // Clear error when user starts typing
                }}
              />
              {categoryNameError && (
                <div className="text-danger">{categoryNameError}</div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditCategory}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
  <Modal.Header closeButton>
    <Modal.Title>Delete Category</Modal.Title>
  </Modal.Header>
  <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseDeleteModal}>
      Cancel
    </Button>
    <Button variant="danger" onClick={() => handleDeleteCategory(categoryIdToDelete)}>
      Delete
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  );
};

export default Category;
