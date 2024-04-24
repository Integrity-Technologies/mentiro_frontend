import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories, addCategory,  deleteCategory } from "../../actions/categoryAction"; // Correct import statement

const Category = () => {
  const categories = useSelector((state) => state.category.categories); // Get categories from state
  const dispatch = useDispatch(); // Initialize dispatch
  

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    id: "",
    category_name: "",
  });

  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllCategories()); // Dispatch action to fetch categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = (category) => {
    setShowEditModal(true);
    setEditCategory(category);
    setNewCategory(category);
  };

  const handleAddCategory = async () => {
    try {
      const { responseData, token } = await dispatch(addCategory(newCategory)); // Dispatch action to add category
      
      // Use responseData and token as needed
      console.log(responseData);
      console.log(token);
  
      handleCloseAddModal();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };
  

  const handleEditCategory = async () => {
    try {
      await dispatch(editCategory(editCategory.id, newCategory)); // Dispatch action to edit category
      handleCloseEditModal();
    } catch (error) {
      console.error('Error editing category:', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await dispatch(deleteCategory(id)); // Dispatch action to delete category
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const filteredCategories = categories.filter((category) => {
    const fullName = `${category.category_name} ${category.categoryDescription}`;
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
                <Button variant="primary" size="sm" onClick={() => handleShowEditModal(category)}>
                  Edit
                </Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDeleteCategory(category.id)}>
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
                value={newCategory.category_name}
                onChange={(e) => setNewCategory({ ...newCategory, category_name: e.target.value })}
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCategory} className="text-left">
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
                value={newCategory.categoryName}
                onChange={(e) => setNewCategory({ ...newCategory, categoryName: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formCategoryDescription">
              <Form.Label>Category Description</Form.Label>
              <Form.Control
                type="text"
                value={newCategory.categoryDescription}
                onChange={(e) => setNewCategory({ ...newCategory, categoryDescription: e.target.value })}
              />
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
    </div>
  );
};

export default Category;
