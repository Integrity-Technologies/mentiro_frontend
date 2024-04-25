import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories, addCategory, deleteCategory} from "../../actions/categoryAction"; // Correct import statement
import { editCategory } from "../../actions/categoryAction";
import { getToken } from "../../actions/authActions"; // Import getToken function


const Category = () => {
  const categories = useSelector((state) => state.category.categories); // Get categories from state
  const dispatch = useDispatch(); // Initialize dispatch
  
const [newCategoryId, setnewCategoryId] = useState("")
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  // const [editCategory, setEditCategory] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const token = useSelector(getToken); // Get token from Redux store



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
    // setEditCategory(category);
    console.log(category[2]  + "from handleShowEditModal ");
    setNewCategory(category[2]);
    setnewCategoryId(category.id)
    handleEditCategory(category.id, category[2]);
  };

  const handleAddCategory = async () => {
    try {
      const responseData = await dispatch(addCategory(newCategory));
      console.log(responseData);
      console.log(token); // Console log the token
      handleCloseAddModal();
      
      // Dispatch action to fetch all categories again
      await dispatch(getAllCategories());
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };
  

  const handleEditCategory = async (categoryId, updatedCategoryData) => {
    try {
      console.log(newCategoryId, newCategory );
      await dispatch(editCategory(categoryId, updatedCategoryData));
      // Handle success or update UI
      await dispatch(getAllCategories());

    } catch (error) {
      console.error('Error editing category:', error);
      // Handle error or display error message
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await dispatch(deleteCategory(categoryId));
      // Handle success or update UI

      await dispatch(getAllCategories());
    } catch (error) {
      console.error('Error deleting category:', error);
      // Handle error or display error message
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
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
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
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
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
