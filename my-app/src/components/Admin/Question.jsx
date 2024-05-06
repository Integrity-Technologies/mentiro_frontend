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
    options: [
      { option_text: "", is_correct: false },
      { option_text: "", is_correct: false },
      { option_text: "", is_correct: false },
      { option_text: "", is_correct: false },
    ],
  });
  const [questionError, setQuestionError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [levelError, setLevelError] = useState("");
  const [categoriesError, setCategoriesError] = useState("");


  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

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

  const MAX_OPTIONS = 4; // Maximum number of options

  const addOption = () => {
    if (newQuestion.options.length < MAX_OPTIONS) {
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
    if (newQuestion.options.some((option) => option.option_text !== "")) {
      // Only add question if there are options
      await dispatch(addQuestion(newQuestion)); // Call addQuestion action
      await dispatch(getQuestions());
      handleCloseAddModal();
    } else {
      // Show an error message or prevent adding question if there are no options
      console.error("Please add at least one option.");
    }
  };

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowAddModal = () => setShowAddModal(true);
  const handleShowEditModal = () => setShowEditModal(true);


  const EditQuestion = async (id) => {
    await dispatch(editQuestion(id, newQuestion)); // Call editQuestion action
    await dispatch(getQuestions());

    handleCloseEditModal();
  }

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

  return (
    <div>
      <h1>Questions</h1>
      <Form inline className="mb-3">
        <FormControl
          type="text"
          placeholder="Search by question text"
          className="mr-sm-2 w-25"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>
      <Button variant="success" onClick={handleShowAddModal}>
        Add Question
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Question Text</th>
            <th>Difficulty Level</th>
            <th>Categories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((question) => (
            <tr key={question.id}>
              <td>{question.id}</td>
              <td>{question.question_text}</td>
              <td>{question.difficulty_level}</td>
              <td>{question.categories}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleShowEditModal(question)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteModal(question)}

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
                value={newQuestion.category_names}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    category_names: e.target.value.split(","),
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formOptions">
              <Form.Label>Options</Form.Label>
              {newQuestion.options.map((option, index) => (
                <div key={index} className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option.option_text}
                    onChange={(e) => handleOptionChange(e.target.value, index)}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Is Correct"
                    checked={option.is_correct}
                    onChange={(e) => handleCorrectChange(e.target.checked, index)}
                  />
                </div>
              ))}
              {newQuestion.options.length < MAX_OPTIONS && (
                <Button variant="primary" onClick={addOption}>
                  Add Option
                </Button>
              )}
            </Form.Group>
            <Button variant="success" onClick={handleAddQuestion}>
              Add Question
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Question Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
                value={newQuestion.category_names}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    category_names: e.target.value.split(","),
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formOptions">
              <Form.Label>Options</Form.Label>
              {newQuestion.options.map((option, index) => (
                <div key={index} className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option.option_text}
                    onChange={(e) => handleOptionChange(e.target.value, index)}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Is Correct"
                    checked={option.is_correct}
                    onChange={(e) => handleCorrectChange(e.target.checked, index)}
                  />
                </div>
              ))}
              {newQuestion.options.length < MAX_OPTIONS && (
                <Button variant="primary" onClick={addOption}>
                  Add Option
                </Button>
              )}
            </Form.Group>
            <Button variant="primary" onClick={() => EditQuestion(newQuestion.id)}>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this question?
        </Modal.Body>
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
