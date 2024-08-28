import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import './AddProducts.css';

// Define the component for adding a new product
const AddProductForm = () => {
  const [product, setProduct] = useState({
    // productId: '',
    name: '',
    description: '',
    minQuantity:'',
    quantity: '',
    price: '',
  });
// State variables for success and error alerts
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
// Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {  
    e.preventDefault();
     // Validate form inputs
    if (!product.name || !product.description || !product.minQuantity || !product.quantity || !product.price) {
      setShowError(true);
      return;
    }

    // productId
        // Validate quantity, price, and minQuantity
    if (product.quantity < 0 || product.price < 0 || product.minQuantity < 0) {
      alert('Quantity and price should not be less than 0');
      return;
    }
  // Send a POST request to the API to add the product
    try {
      const response = await axios.post('http://localhost:8080/api/inventory/add', product);
      console.log('Product added successfully:', response.data);
      setShowSuccess(true);
      setShowError(false);

      // Clear form inputs after adding Product
      setProduct({
        // productId: '',
        name: '',
        description: '',
        minQuantity:'',
        quantity: '',
        price: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
      setShowError(true);
      setShowSuccess(false);
    }
  };
 // Function to handle form clearing
  const handleClear = () => {
      // Clear form inputs
    setProduct({
      // productId: '',
      name: '',
      description: '',
      minQuantity:'',
      quantity: '',
      price: '',
    });
    setShowSuccess(false);
    setShowError(false);
  };

  return (
    <Container className="form-container">
      <div className="form-wrapper">
        <h2 className="form-title">ADD NEW PRODUCT</h2>
        {showSuccess && (
          <Alert variant="success" onClose={() => setShowSuccess(false)}>
            Product added successfully!
          </Alert>
        )}
        {showError && (
          <Alert variant="danger" onClose={() => setShowError(false)}>
            Error adding product. Please try again.
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          {/* <div className="form-row"> */}
            {/* <Form.Group controlId="productId">
              <Form.Label>Product ID</Form.Label>
              <Form.Control
                type="text"
                name="productId"
                value={product.productId}
                onChange={handleChange}
                required
              />
            </Form.Group> */}
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          {/* </div> */}
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="description"
              value={product.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="minQuantity">
              <Form.Label> Minimum Quantity</Form.Label>
              <Form.Control
                type="number"
                name="minQuantity"
                value={product.minQuantity}
                onChange={handleChange}
                required
                min="0"
              />
              </Form.Group>
          <div className="form-row">
            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                required
                min="0"
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
                min="0"
              />
            </Form.Group>
          </div>
          <div className="button-group">
            <Button variant="primary" type="submit">
              Add Product
            </Button>
            <Button variant="secondary" type="button" onClick={handleClear}>
              Clear Form
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default AddProductForm;
