import React, { useState, useEffect } from "react";
import japancuisne from "../japan/japanCuisine.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Card, Form } from "react-bootstrap";

export const JapanCuisine = () => {
  const [cuisines, setCuisines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newCuisine, setNewCuisine] = useState({
    name: "",
    category: "",
    rating: "",
    iconic_place: "",
    description: "",
    ingredients: "",
    strImage: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCuisine({
      ...newCuisine,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewCuisine({ ...newCuisine, strImage: imageUrl });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!newCuisine.name) errors.name = "Meal name is required";
    if (!newCuisine.category) errors.category = "Category is required";
    if (!newCuisine.rating) errors.rating = "Rating is required";
    if (newCuisine.rating < 1 || newCuisine.rating > 5)
      errors.rating = "Rating must be between 1 and 5";
    if (!newCuisine.iconic_place)
      errors.iconic_place = "Iconic place is required";
    if (!newCuisine.description) errors.description = "Description is required";
    if (!newCuisine.ingredients)
      errors.ingredients = "Ingredients are required";
    if (!newCuisine.strImage) errors.strImage = "Image is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setCuisines((prevCuisines) => [...prevCuisines, newCuisine]);
      setShowForm(false);
      setNewCuisine({
        name: "",
        category: "",
        rating: "",
        iconic_place: "",
        description: "",
        ingredients: "",
        strImage: "",
      });
      setSuccessMessage("Your meal has been added!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  };

  useEffect(() => {
    try {
      setCuisines(japancuisne.dishes);
      setLoading(false);
    } catch (error) {
      setError("Failed to load cuisines");
      setLoading(false);
    }
  }, []);

  const handleImageClick = (cuisine) => {
    setSelectedCuisine(cuisine);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedCuisine(null);
  };

  const filteredCuisines = cuisines.filter((cuisine) =>
    cuisine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="india_cusi">
      <div className="search">
        <h2>JAPANESE CUISINES</h2>
        <input
          type="text"
          placeholder="Search Food"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Button
          variant="primary"
          className="add-meal-btn"
          onClick={() => setShowForm(true)}
        >
          <span>Add Meal</span>
        </Button>
      </div>
      {successMessage && (
        <div className="alert alert-success mt-3">{successMessage}</div>
      )}

      <div className="cuisine-grid">
        {filteredCuisines.map((cuisine, index) => (
          <Card
            key={index}
            className="cuisine-item"
            style={{ width: "18rem", cursor: "pointer" }}
            onClick={() => handleImageClick(cuisine)}
          >
            <Card.Img
              variant="top"
              src={cuisine.strImage}
              width="200px"
              height="200px"
              alt={cuisine.strMeal}
            />
            <Card.Body>
              <Card.Text>
                <h3>{cuisine.name}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Modal for Popup */}
      {showPopup && selectedCuisine && (
        <Modal show={showPopup} onHide={closePopup} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedCuisine.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              {/* Image */}
              <img
                src={selectedCuisine.strImage}
                alt={selectedCuisine.name}
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  marginBottom: "20px",
                }}
              />
              {/* Meal Name */}
              <p className="modal-text">
                <i className="fa fa-utensils" aria-hidden="true"></i>
                <strong>{selectedCuisine.name}</strong>
              </p>
              {/* Category */}
              <p className="modal-text">
                <i className="fa fa-tag" aria-hidden="true"></i>
                {selectedCuisine.category}
              </p>
              {/* Rating */}
              <p className="modal-text">
                <i className="fa fa-star" aria-hidden="true"></i>
                {selectedCuisine.rating}
              </p>
              {/* Iconic Place */}
              <p className="modal-text">
                <i className="fa fa-map-marker" aria-hidden="true"></i>
                {selectedCuisine.iconic_place}
              </p>
              {/* Description */}
              <p className="modal-text">
                <i className="fa fa-align-left" aria-hidden="true"></i>
                {selectedCuisine.description}
              </p>
              {/* Ingredients */}
              <p className="modal-text">
                <i className="fa fa-list" aria-hidden="true"></i>
                {selectedCuisine.ingredients}
              </p>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {/* Modal for Add New Meal Form */}
      {showForm && (
        <Modal
          show={showForm}
          onHide={() => setShowForm(false)}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Your Meal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="mealName">
                <Form.Label>Meal Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter meal name"
                  name="name"
                  value={newCuisine.name}
                  onChange={handleInputChange}
                  isInvalid={formErrors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="mealCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  value={newCuisine.category}
                  onChange={handleInputChange}
                  isInvalid={formErrors.category}
                >
                  <option value="">Select Category</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Dessert">Dessert</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formErrors.category}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="mealRating">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter rating (1-5)"
                  name="rating"
                  value={newCuisine.rating}
                  onChange={handleInputChange}
                  isInvalid={formErrors.rating}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.rating}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="iconicPlace">
                <Form.Label>Iconic Place</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Where is this meal iconic?"
                  name="iconic_place"
                  value={newCuisine.iconic_place}
                  onChange={handleInputChange}
                  isInvalid={formErrors.iconic_place}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.iconic_place}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="mealDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter meal description"
                  name="description"
                  value={newCuisine.description}
                  onChange={handleInputChange}
                  isInvalid={formErrors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="mealIngredients">
                <Form.Label>Ingredients</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter ingredients (comma separated)"
                  name="ingredients"
                  value={newCuisine.ingredients}
                  onChange={handleInputChange}
                  isInvalid={formErrors.ingredients}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.ingredients}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="mealImage">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleImageUpload}
                  isInvalid={formErrors.strImage}
                />
                {formErrors.strImage && (
                  <Form.Control.Feedback type="invalid">
                    {formErrors.strImage}
                  </Form.Control.Feedback>
                )}
                {newCuisine.strImage && (
                  <img
                    src={newCuisine.strImage}
                    alt="Preview"
                    style={{ width: "100px", marginTop: "10px" }}
                  />
                )}
              </Form.Group>

              <Button variant="primary" type="submit">
                Add Meal
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};
