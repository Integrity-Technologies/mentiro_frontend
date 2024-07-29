import React, { useState, useEffect } from "react";
import { Table, Form, FormControl, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../actions/authActions"; // Import getToken function
import {
  getQuestions,
  addQuestion,
  deleteQuestion,
  editQuestion,
} from "../../actions/QuestionAction"; // Import action functions
import TablePagination from "./TablePagination"; // Import your TablePagination component

const Question = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.question.questions);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const token = useSelector(getToken); // Get token from Redux store
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    question_text: "",
    difficulty_level: "",
    category_names: [],
    options: [], // Initialize options as an empty array
    question_time: "",
    question_type: "", // New property for question type
  });
  const [questionError, setQuestionError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [levelError, setLevelError] = useState("");
  const [categoriesError, setCategoriesError] = useState("");
  
  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (newQuestion.question_type === "MCQS") {
      setNewQuestion((prevQuestion) => ({
        ...prevQuestion,
        options: [
          { option_text: "", is_correct: false },
          { option_text: "", is_correct: false },
          { option_text: "", is_correct: false },
          { option_text: "", is_correct: false },
        ],
      }));
    } else if (newQuestion.question_type === "true_false") {
      setNewQuestion((prevQuestion) => ({
        ...prevQuestion,
        options: [{ option_text: "True", is_correct: false }, { option_text: "False", is_correct: false }],
      }));
    }
  }, [newQuestion.question_type]);

  const handleOptionChange = (text, index) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index].option_text = text;
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  const handleCorrectChange = (checked, index) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index].is_correct = checked;
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  const addOption = () => {
    if (newQuestion.question_type === "MCQS" && newQuestion.options.length < 4) {
      setNewQuestion({
        ...newQuestion,
        options: [
          ...newQuestion.options,
          { option_text: "", is_correct: false },
        ],
      });
    }
  };

  const handleAddQuestion = async () => {
    if (
      (newQuestion.question_type === "MCQS" &&
        newQuestion.options.some((option) => option.option_text !== "")) ||
      newQuestion.question_type === "true_false"
    ) {
      // Only add question if there are options and the question type is "Multiple Choice" or "True/False"
      console.log("newQuestion", newQuestion);
      await dispatch(addQuestion(newQuestion)); // Call addQuestion action
      await dispatch(getQuestions());
      handleCloseAddModal();
    } else {
      // Show an error message or prevent adding question if there are no options
      console.error("Please add options or select True/False.");
    }
  };

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const EditQuestion = async (updatedQuestion) => {
    if (selectedQuestion) {
      await dispatch(editQuestion(selectedQuestion.id, updatedQuestion)); // Call editQuestion action
      await dispatch(getQuestions());
    }
    handleCloseEditModal();
  };

  const handleShowEditModal = (question) => {
    setSelectedQuestion(question);
    setNewQuestion(question); // Set newQuestion to the selected question for editing
    setShowEditModal(true);
  };

  const handleDeleteModal = (question) => {
    setSelectedQuestion(question);
    setShowDeleteModal(true);
  };

  const handleDeleteQuestion = async () => {
    if (selectedQuestion) {
      await dispatch(deleteQuestion(selectedQuestion.id));
      await dispatch(getQuestions());
      setShowDeleteModal(false);
    }
  };

  const filteredQuestions = questions.filter((question) => {
    const fullQuestion = `${question.question_text} ${question.difficulty_level} ${question.categories}`;
    return fullQuestion.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of users per page

  // Pagination logic
  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentQuestions = filteredQuestions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Questions</h1>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by question text"
          className="border border-gray-300 rounded px-3 py-1 w-1/4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleShowAddModal}
      >
        Add Question
      </button>

      <table className="border-collapse w-full mb-4">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">ID</th>
            <th className="border border-gray-400 px-4 py-2">Question Text</th>
            <th className="border border-gray-400 px-4 py-2">
              Difficulty Level
            </th>
            <th className="border border-gray-400 px-4 py-2">Categories</th>
            <th className="border border-gray-400 px-4 py-2">Type</th> {/* New Column */}
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentQuestions.map((question) => (
            <tr key={question.id}>
              <td className="border border-gray-400 px-4 py-2">
                {question.id}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {question.question_text}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {question.difficulty_level}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {question.categories}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {question.question_type} {/* Display the question type */}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2"
                  onClick={() => handleShowEditModal(question)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleDeleteModal(question)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TablePagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddQuestion}>
            <Form.Group controlId="formQuestionText">
              <Form.Label>Question Text</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter question text"
                value={newQuestion.question_text}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    question_text: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formQuestionType">
              <Form.Label>Question Type</Form.Label>
              <Form.Control
                as="select"
                value={newQuestion.question_type}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    question_type: e.target.value,
                  })
                }
              >
                <option value="">Select Type</option>
                <option value="MCQS">Multiple Choice</option>
                <option value="true_false">True/False</option>
              </Form.Control>
            </Form.Group>
            {newQuestion.question_type && (
              <>
                {newQuestion.options.map((option, index) => (
                  <Form.Group key={index} controlId={`formOption${index}`}>
                    <Form.Label>Option {index + 1}</Form.Label>
                    <FormControl
                      type="text"
                      placeholder={`Enter option ${index + 1}`}
                      value={option.option_text}
                      onChange={(e) => handleOptionChange(e.target.value, index)}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Correct"
                      checked={option.is_correct}
                      onChange={(e) => handleCorrectChange(e.target.checked, index)}
                    />
                  </Form.Group>
                ))}
               
              </>
            )}
            <Form.Group controlId="formDifficultyLevel">
              <Form.Label>Difficulty Level</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter difficulty level"
                value={newQuestion.difficulty_level}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    difficulty_level: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formCategories">
              <Form.Label>Categories</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter categories (comma separated)"
                value={newQuestion.category_names.join(",")}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    category_names: e.target.value.split(",").map((cat) => cat.trim()),
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formQuestionTime">
              <Form.Label>Question Time</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter question time"
                value={newQuestion.question_time}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    question_time: e.target.value,
                  })
                }
              />
            </Form.Group>
            {questionError && <div className="text-danger">{questionError}</div>}
            {typeError && <div className="text-danger">{typeError}</div>}
            {levelError && <div className="text-danger">{levelError}</div>}
            {categoriesError && <div className="text-danger">{categoriesError}</div>}
            <Button variant="primary" onClick={handleAddQuestion} >
              Add Question
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={() => EditQuestion(newQuestion)}>
            {/* Same fields as Add Question Modal */}
            <Form.Group controlId="formQuestionText">
              <Form.Label>Question Text</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter question text"
                value={newQuestion.question_text}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    question_text: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formQuestionType">
              <Form.Label>Question Type</Form.Label>
              <Form.Control
                as="select"
                value={newQuestion.question_type}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    question_type: e.target.value,
                  })
                }
              >
                <option value="">Select Type</option>
                <option value="Multiple Choice">Multiple Choice</option>
                <option value="True/False">True/False</option>
              </Form.Control>
            </Form.Group>
            {newQuestion.question_type && (
              <>
                {newQuestion.options.map((option, index) => (
                  <Form.Group key={index} controlId={`formOption${index}`}>
                    <Form.Label>Option {index + 1}</Form.Label>
                    <FormControl
                      type="text"
                      placeholder={`Enter option ${index + 1}`}
                      value={option.option_text}
                      onChange={(e) => handleOptionChange(e.target.value, index)}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Correct"
                      checked={option.is_correct}
                      onChange={(e) => handleCorrectChange(e.target.checked, index)}
                    />
                  </Form.Group>
                ))}
                {newQuestion.question_type === "Multiple Choice" && (
                  <Button variant="secondary" onClick={addOption}>
                    Add Option
                  </Button>
                )}
              </>
            )}
            <Form.Group controlId="formDifficultyLevel">
              <Form.Label>Difficulty Level</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter difficulty level"
                value={newQuestion.difficulty_level}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    difficulty_level: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formCategories">
              <Form.Label>Categories</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter categories (comma separated)"
                value={newQuestion.category_names.join(",")}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    category_names: e.target.value.split(",").map((cat) => cat.trim()),
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formQuestionTime">
              <Form.Label>Question Time</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter question time"
                value={newQuestion.question_time}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    question_time: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Question
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this question?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteQuestion}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Question;
