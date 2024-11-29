import React, { useState, useEffect } from "react";
import indianCuisinesData from "../CategoryList/indianCuisine.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Card, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import "font-awesome/css/font-awesome.min.css";
import "./CategoryList.css";

export const CategoryList = () => {
  const [cuisines, setCuisines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try {
      setCuisines(indianCuisinesData.indian_cuisines);
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      formik.setFieldValue("strImage", imageUrl);
    }
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Meal name must be at least 3 characters long")
      .required("Meal name is required"),
    category: Yup.string().required("Category is required"),
    rating: Yup.number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot be more than 5")
      .required("Rating is required"),
    iconic_place: Yup.string()
      .min(3, "Iconic place must be at least 3 characters long")
      .required("Iconic place is required"),
    description: Yup.string()
      .min(10, "Description must be at least 10 characters long")
      .required("Description is required"),
    ingredients: Yup.string().required("Ingredients are required"),
    strImage: Yup.string().required("Image is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      rating: "",
      iconic_place: "",
      description: "",
      ingredients: "",
      strImage: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setCuisines((prevCuisines) => [values, ...prevCuisines]);
      setShowForm(false);
      formik.resetForm();
      setImagePreview(null);
    },
    enableReinitialize: true,
  });

  const categories = ["Vegetarian", "Non-Vegetarian", "Dessert"];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="india_cusi">
      <div className="search">
        <h2>INDIAN CUISINES</h2>
        <input
          type="text"
          placeholder="Search Food"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          variant="primary"
          className="add-meal-btn"
          onClick={() => setShowForm(true)}
        >
          <span>Add Meal</span>
        </Button>
      </div>

      <div className="cuisine-grid">
        {filteredCuisines.map((cuisine, index) => (
          <Card
            key={index}
            className="cuisine-item"
            style={{ width: "18rem" }}
            onClick={() => handleImageClick(cuisine)}
          >
            <Card.Img
              variant="top"
              src={cuisine.strImage}
              width="200px"
              height="200px"
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
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3" controlId="mealName">
                <Form.Label>
                  <i className="fa fa-utensils" aria-hidden="true"></i> Meal
                  Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter meal name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  isInvalid={formik.touched.name && formik.errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Category Select Dropdown */}
              <Form.Group className="mb-3" controlId="mealCategory">
                <Form.Label>
                  <i className="fa fa-tag" aria-hidden="true"></i> Category
                </Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  isInvalid={formik.touched.category && formik.errors.category}
                >
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.category}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="mealRating">
                <Form.Label>
                  <i className="fa fa-star" aria-hidden="true"></i> Rating
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter rating (1-5)"
                  name="rating"
                  value={formik.values.rating}
                  onChange={formik.handleChange}
                  isInvalid={formik.touched.rating && formik.errors.rating}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.rating}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="iconicPlace">
                <Form.Label>
                  <i className="fa fa-map-marker" aria-hidden="true"></i> Iconic
                  Place
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Where is this meal iconic?"
                  name="iconic_place"
                  value={formik.values.iconic_place}
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched.iconic_place && formik.errors.iconic_place
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.iconic_place}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="mealDescription">
                <Form.Label>
                  <i className="fa fa-align-left" aria-hidden="true"></i>{" "}
                  Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter meal description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched.description && formik.errors.description
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="mealIngredients">
                <Form.Label>
                  <i className="fa fa-list" aria-hidden="true"></i> Ingredients
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter ingredients"
                  name="ingredients"
                  value={formik.values.ingredients}
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched.ingredients && formik.errors.ingredients
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.ingredients}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Image Upload */}
              <Form.Group className="mb-3" controlId="mealImage">
                <Form.Label>
                  <i className="fa fa-image" aria-hidden="true"></i> Upload
                  Image
                </Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  isInvalid={formik.touched.strImage && formik.errors.strImage}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ width: "100px", marginTop: "10px" }}
                  />
                )}
                <Form.Control.Feedback type="invalid">
                  {formik.errors.strImage}
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};
