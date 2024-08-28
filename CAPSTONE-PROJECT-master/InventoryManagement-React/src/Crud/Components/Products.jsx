import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineClose } from "react-icons/ai";
import { FaEdit, FaTrashAlt, FaBell } from 'react-icons/fa';
import './Products.css';

// Define the main component for managing products
const Products = () => {
   // State variables for products, editing product, alert visibility, and alert message
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
 // Fetch products from the API and handle low inventory alerts
  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:8080/api/inventory');
    const fetchedProducts = response.data;
    setProducts(fetchedProducts);
 // Play a notification sound for low inventory
    const lowInventoryProducts = fetchedProducts.filter(p => p.quantity < p.minQuantity);
    
    if (lowInventoryProducts.length > 0) {
      setShowAlert(true);
      setAlertMessage(`Warning: Low inventory! The following products have less quantity: ${lowInventoryProducts.map(p => p.name).join(', ')}`);

      const audio = new Audio('/tap-notification.mp3'); 
      audio.play().catch(error => console.error('Error playing sound:', error));
    } else {
      setShowAlert(false);
    }
  };
// Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);
 // Handle saving edited product to the API
  const handleSaveProduct = async () => {
    await axios.put(`http://localhost:8080/api/inventory/update/${editingProduct.id}`, editingProduct);
    setEditingProduct(null);
    fetchProducts();
  };
// Handle editing a product
  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
  };

  // Handle deleting a product from the API
  const handleDeleteProduct = async (id) => {
    await axios.delete(`http://localhost:8080/api/inventory/delete/${id}`);
    fetchProducts();
  };
 // Render the main component with product table and CRUD operations
  return (
    <div className="products-page">
      <div className="crud-container">
        <h2>Products Management</h2>

        {/* // Display alert for low inventory */}
        {showAlert && (
          <div className="alert">
              <div class="alert alert-danger" role="alert">
                <FaBell /> {alertMessage}
                <button onClick={() => setShowAlert(false)} className='close-button'><AiOutlineClose style={{fontSize: 30}}/>
                </button>
              </div>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Available Quantity</th>
              <th>Minimum Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="text"
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td>
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="text"
                      value={editingProduct.description}
                      onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    />
                  ) : (
                    product.description
                  )}
                </td>
                <td>
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="number"
                      value={editingProduct.quantity}
                      onChange={(e) => setEditingProduct({ ...editingProduct, quantity: e.target.value })}
                    />
                  ) : (
                    product.quantity
                  )}
                </td>
                <td>
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="number"
                      value={editingProduct.minQuantity}
                      onChange={(e) => setEditingProduct({ ...editingProduct, minQuantity: e.target.value })}
                    />
                  ) : (
                    product.minQuantity
                  )}
                </td>
                <td>
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    />
                  ) : (
                    product.price
                  )}
                </td>
                <td className="action-buttons">
                  {editingProduct && editingProduct.id === product.id ? (
                    <>
                      <button onClick={handleSaveProduct} className='save-button'>Save</button>
                      <button onClick={() => setEditingProduct(null)} className='delete-button'>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditProduct(product)} className="edit-button">
                        <FaEdit /> Edit
                      </button>
                      <button onClick={() => handleDeleteProduct(product.id)} className="delete-button">
                        <FaTrashAlt /> Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
