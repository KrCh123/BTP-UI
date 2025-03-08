import React, { useState } from 'react';
import { Row, Col, Form, Button, Card, Container, CardBody } from "react-bootstrap";

export const TeacherExamPage = () => {
  const [exam, setExam] = useState({
    title: '',
    description: '',
    duration: '',
    questions: [],
  });

  const [newQuestion, setNewQuestion] = useState({
    type: 'Subjective',
    text: '',
    options: [],
    correctAnswer: '',
    relatedTheory: '',
    marks: '',
  });

  const [showQuestionForm, setShowQuestionForm] = useState(false);

  const handleExamChange = (e) => {
    const { name, value } = e.target;
    setExam((prevExam) => ({
      ...prevExam,
      [name]: value,
    }));
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      [name]: value,
    }));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = value;
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      options: updatedOptions,
    }));
  };

  const addOption = () => {
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      options: [...prevQuestion.options, ''],
    }));
  };

  const removeOption = (index) => {
    const updatedOptions = newQuestion.options.filter((_, i) => i !== index);
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      options: updatedOptions,
    }));
  };

  const addQuestion = () => {
    if (!newQuestion.text.trim()) return; // Prevent adding empty questions
    setExam((prevExam) => ({
      ...prevExam,
      questions: [...prevExam.questions, newQuestion],
    }));
    setNewQuestion({
      type: 'Subjective',
      text: '',
      options: [],
      correctAnswer: '',
      relatedTheory: '',
      marks: '',
    });
  };

  const editQuestion = (index) => {
    const questionToEdit = exam.questions[index];
    setNewQuestion(questionToEdit);
    deleteQuestion(index);
  };

  const deleteQuestion = (index) => {
    setExam((prevExam) => ({
      ...prevExam,
      questions: prevExam.questions.filter((_, i) => i !== index),
    }));
  };

  return (
    <Container className="p-4 exam-container" style={{ marginTop: '100px' }}>
      <Card style={{ backgroundColor: 'black' }}>
        <Card.Body>
          {!showQuestionForm &&
            (<Form>
              <Form.Group className="exam-group" controlId="examTitle">
                <Form.Label className='exam-label'>Exam Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter exam name"
                  value={exam.title}
                  onChange={(e) =>
                    setExam((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
              </Form.Group>

              <Form.Group className="exam-group" controlId="examDuration">
                <Form.Label className='exam-label'>Duration (mins)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter duration in minutes"
                  value={exam.duration}
                  onChange={(e) =>
                    setExam((prev) => ({ ...prev, duration: e.target.value }))
                  }
                />
              </Form.Group>

              <Form.Group className="exam-group" controlId="examDescription">
                <Form.Label className='exam-label'>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter exam description"
                  value={exam.description}
                  onChange={(e) =>
                    setExam((prev) => ({ ...prev, description: e.target.value }))
                  }
                />
                <button
                  type="button"
                  className='custom-add-question-btn'
                  style={{left:'51%',top:'340px'}}
                  onClick={() => setShowQuestionForm(true)}
                >
                  Create New Exam
                </button>
              </Form.Group>
            </Form>)
          }

          {showQuestionForm && <Form
            style={{
              minHeight: "464.44444px",
              maxHeight: "80vh", // Prevents excessive expansion
              overflowY: "auto", // Enables scrolling when needed
              borderRadius: "8px",
              border: "solid #1e90ff",
              padding: "20px",
              marginTop: "30px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3 className="mt-3 text-center" style={{ color: "white" }}>Add Questions</h3>

            {/* Question Type & Marks */}
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="questionType">
                  <Form.Label className="exam-label">Question Type</Form.Label>
                  <Form.Select
                    value={newQuestion.type}
                    onChange={(e) =>
                      setNewQuestion((prev) => ({ ...prev, type: e.target.value }))
                    }
                  >
                    <option value="Subjective">Subjective</option>
                    <option value="MCQ">MCQ</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="marks">
                  <Form.Label className="exam-label">Marks</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Marks"
                    value={newQuestion.marks}
                    onChange={(e) =>
                      setNewQuestion((prev) => ({ ...prev, marks: e.target.value }))
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Question Text */}
            <Form.Group className="mb-3" controlId="questionText">
              <Form.Label className="exam-label">Question</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter question"
                style={{ minHeight: "50px", resize: "vertical" }}
                value={newQuestion.text}
                onChange={(e) =>
                  setNewQuestion((prev) => ({ ...prev, text: e.target.value }))
                }
              />
            </Form.Group>

            {/* MCQ Options */}
            {newQuestion.type === "MCQ" &&
              newQuestion.options.map((option, index) => (
                <Form.Group key={index} className="mb-2">
                  <Row>
                    <Col xs={10}>
                      <Form.Control
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => {
                          const updatedOptions = [...newQuestion.options];
                          updatedOptions[index] = e.target.value;
                          setNewQuestion((prev) => ({ ...prev, options: updatedOptions }));
                        }}
                      />
                    </Col>
                    <Col xs={2} className="text-end">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() =>
                          setNewQuestion((prev) => ({
                            ...prev,
                            options: prev.options.filter((_, i) => i !== index),
                          }))
                        }
                      >
                        ✖
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              ))}

            {newQuestion.type === "MCQ" && (
              <Button
                variant="outline-primary"
                size="sm"
                className="mb-3"
                style={{
                  width: "117.481482px",
                  height: "29.481482px"
                }}
                onClick={() =>
                  setNewQuestion((prev) => ({
                    ...prev,
                    options: [...prev.options, ""],
                  }))
                }
              >
                + Add Option
              </Button>
            )}

            {/* Correct Answer & Related Theory */}
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="correctAnswer">
                  <Form.Label className="exam-label">Correct Answer</Form.Label>
                  <Form.Control
                    as="textarea"
                    type="text"
                    style={{ minHeight: "40px", resize: "vertical" }}
                    placeholder="Answer"
                    value={newQuestion.correctAnswer}
                    onChange={(e) =>
                      setNewQuestion((prev) => ({ ...prev, correctAnswer: e.target.value }))
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="relatedTheory">
                  <Form.Label className="exam-label">Related Theory</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    placeholder="Theory"
                    style={{ minHeight: "40px", resize: "vertical" }}
                    value={newQuestion.relatedTheory}
                    onChange={(e) =>
                      setNewQuestion((prev) => ({ ...prev, relatedTheory: e.target.value }))
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Submit Button */}
            <div className="text-center mt-auto">
              <Button variant="primary" onClick={addQuestion}>
                Add Question
              </Button>
            </div>
          </Form>

          }

          {showQuestionForm && <Card className="mb-3 exam-card" style={{marginTop:'30px',backgroundColor:'black',border:'solid #1e90ff'}}>
            <Card.Body>
              <Card.Title style={{color:'white'}}>Added Questions</Card.Title>
              {exam.questions.length === 0 ? (
                <p style={{color:'white'}}>No questions added yet.</p>
              ) : (
                exam.questions.map((question, index) => (
                  <Card key={index} className="mb-2">
                    <Card.Body>
                      <Card.Text>
                        <strong>Q{index + 1}:</strong> {question.text}
                      </Card.Text>
                      {question.type === 'MCQ' && (
                        <ul>
                          {question.options.map((option, i) => (
                            <li key={i}>{option}</li>
                          ))}
                        </ul>
                      )}
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => editQuestion(index)}
                        className="me-2"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => deleteQuestion(index)}
                      >
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                ))
              )}
            </Card.Body>
          </Card>}
        </Card.Body>
      </Card>



      {showQuestionForm && <Button className="custom-add-question-btn" variant="primary" style={{ marginTop:'15px', left: '51%' }}>
        Save Exam
      </Button>}
    </Container>
  );
}
