import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
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
      const existingCategory = categories.find(
        (category) =>
          category.category_name.toLowerCase() === newCategory.toLowerCase()
      );
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
      <h1 className="text-3xl font-bold my-4">Categories</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="border border-gray-300 rounded px-3 py-2 w-1/4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleShowAddModal}
      >
        Add Category
      </button>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Category Name</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((category) => (
            <tr key={category.id}>
              <td className="border px-4 py-2">{category.id}</td>
              <td className="border px-4 py-2">{category.category_name}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2"
                  onClick={() => handleShowEditModal(category)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleShowDeleteModal(category.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Category Modal */}
      <Modal
  show={showAddModal}
  onHide={handleCloseAddModal}
  className="fixed inset-0 flex items-center justify-center"
>
  <div className="bg-white rounded-lg w-76 p-8">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold">Add Category</h2>
      <button onClick={handleCloseAddModal}>
        <svg
          className="w-6 h-6 text-gray-600 hover:text-gray-700 cursor-pointer"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <form>
      <div className="mb-4">
        <label className="block mb-1">Category Name</label>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => {
            setNewCategory(e.target.value);
            setCategoryNameError(""); // Clear error when user starts typing
          }}
          className="border border-gray-300 rounded w-full px-3 py-2"
        />
        {categoryNameError && (
          <div className="text-red-500">{categoryNameError}</div>
        )}
      </div>
    </form>
    <div className="flex justify-end mt-6">
      <button
        className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded"
        onClick={handleAddCategory}
      >
        Add Category
      </button>
      <button
        className="text-gray-500 hover:text-gray-600 ml-4"
        onClick={handleCloseAddModal}
      >
        Close
      </button>
    </div>
  </div>
</Modal>

      {/* Edit Category Modal */}
      <Modal
  show={showEditModal}
  onHide={handleCloseEditModal}
  className="fixed inset-0 flex items-center justify-center"
>
  <div className="bg-white rounded-lg w-76 p-8">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold">Edit Category</h2>
      <button onClick={handleCloseEditModal}>
        <svg
          className="w-6 h-6 text-gray-600 hover:text-gray-700 cursor-pointer"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <form>
      <div className="mb-4">
        <label className="block mb-1">Category Name</label>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => {
            setNewCategory(e.target.value);
            setCategoryNameError(""); // Clear error when user starts typing
          }}
          className="border border-gray-300 rounded w-full px-3 py-2"
        />
        {categoryNameError && (
          <div className="text-red-500">{categoryNameError}</div>
        )}
      </div>
    </form>
    <div className="flex justify-end mt-6">
      <button
        className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded"
        onClick={handleEditCategory}
      >
        Save Changes
      </button>
      <button
        className="text-gray-500 hover:text-gray-600 ml-4"
        onClick={handleCloseEditModal}
      >
        Close
      </button>
    </div>
  </div>
</Modal>


      {/* Delete Category Modal */}
      <Modal
  show={showDeleteModal}
  onHide={handleCloseDeleteModal}
  className="fixed inset-0 flex items-center justify-center"
>
  <div className="bg-white rounded-lg w-76 p-8">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold">Delete Category</h2>
      <button onClick={handleCloseDeleteModal}>
        <svg
          className="w-6 h-6 text-gray-600 hover:text-gray-700 cursor-pointer"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <div>
      <p>Are you sure you want to delete this category?</p>
    </div>
    <div className="flex justify-end mt-6">
      <button
        className="text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded"
        onClick={() => handleDeleteCategory(categoryIdToDelete)}
      >
        Delete
      </button>
      <button
        className="text-gray-500 hover:text-gray-600 ml-4"
        onClick={handleCloseDeleteModal}
      >
        Cancel
      </button>
    </div>
  </div>
</Modal>

    </div>
  );
};

export default Category;
