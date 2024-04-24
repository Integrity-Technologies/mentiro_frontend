import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, FormControl } from "react-bootstrap";
import { fetchCategories } from "../../actions/categoryAction";
import { addCategory } from "../../actions/categoryAction";
import { useSelector } from "react-redux";

const Category = () => {
  const { token } = useSelector((state) => state.auth);
  const [categories, setCategories] = useState([
    {
      id: 1,
      category_name: "Category A",
      categoryDescription: "Description for Category A",
    },
    {
      id: 2,
      category_name: "Category B",
      categoryDescription: "Description for Category B",
    },
  ]);

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
      const data = await fetchCategories();
      setCategories(data);
    };
    fetchData();
  }, []);

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = (category) => {
    setShowEditModal(true);
    setEditCategory(category);
    setNewCategory(category);
  };

  const handleAddCategory = () => {
    try {
      const response =  addCategory(newCategory, token);
      if (response) {
        // Assuming your backend returns the added category data,
        // you can update the categories state with the response data
        setCategories([...categories, response]);
        handleCloseAddModal();
      } else {
        console.error('Failed to add category');
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleEditCategory = () => {
    setCategories(categories.map((category) => (category.id === editCategory.id ? newCategory : category)));
    setEditCategory(null);
    handleCloseEditModal();
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
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
