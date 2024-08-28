// Import necessary libraries
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaRupeeSign, FaBoxOpen, FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Define the HomePage component
const HomePage = () => {
  // Use the useNavigate hook to navigate between routes
  const navigate = useNavigate();

  // State variable to store dashboard data
  const [data, setData] = useState({
    totalItems: 0,
    totalRevenue: 0,
    lowStockItems: 0,
  });

  // Fetch dashboard data from the server on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Send a GET request to the server to fetch inventory data
        const response = await axios.get('http://localhost:8080/api/inventory');
        const inventoryData = response.data;

        // Initialize counters for total items, total revenue, and low stock items
        let totalItems = 0;
        let totalRevenue = 0;
        let lowStockItems = 0;

        // Iterate through the inventory data and calculate the counters
        inventoryData.forEach(item => {
          totalItems += item.quantity;
          totalRevenue += item.quantity * item.price; // Assuming price is per unit
          if (item.quantity < item.minQuantity) {
            lowStockItems++;
          }
        });

        // Update the state with the calculated data
        setData({
          totalItems,
          totalRevenue,
          lowStockItems,
        });
      } catch (error) {
        // Log any errors to the console
        console.error('Error fetching dashboard data', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  // Handle the "Get Started" button click
  const handleGetStarted = () => {
    // Navigate to the products page
    navigate('/products');
  };

  // Render the home page component
  return (
    <Container fluid className="p-0">
      {/* Header section */}
      <div className="bg-primary text-white py-5">
        <Container>
          <Row className="mb-5 text-center">
            <Col>
              <h1 className="display-3 fw-bold">Inventory Management System</h1>
              <p className="lead fs-4">Empower your business with our cutting-edge inventory solution</p>
              <button
                className="btn btn-light btn-lg mt-3 text-primary fw-bold"
                onClick={handleGetStarted}
              >
                Get Started
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Dashboard section */}
      <Container className="py-5">
        <Row className="mb-5 g-4">
          <Col md={4}>
            <Card className="h-100 shadow border-0 text-center">
              <Card.Body>
                <FaBoxOpen className="text-primary mb-3" size={48} />
                <Card.Title className="fs-4 fw-bold">Total Items</Card.Title>
                <Card.Text className="fs-1 fw-bold">{data.totalItems}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow border-0 text-center">
              <Card.Body>
                <FaRupeeSign className="text-primary mb-3" size={48} />
                <Card.Title className="fs-4 fw-bold">Total Stock Value</Card.Title>
                <Card.Text className="fs-1 fw-bold">₹{data.totalRevenue ? data.totalRevenue.toFixed(2) : '0.00'}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow border-0 text-center">
              <Card.Body>
                <FaExclamationTriangle className="text-primary mb-3" size={48} />
                <Card.Title className="fs-4 fw-bold">Low Stock Items</Card.Title>
                <Card.Text className="fs-1 fw-bold">{data.lowStockItems}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

// Export the HomePage component
export default HomePage;