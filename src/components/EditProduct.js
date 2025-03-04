import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, fetchProductTypes, updateProduct } from '../services/api';
import { isValidDateFormat, isNotFutureDate, isValidProductName, isValidQuantity } from '../utils/validation';
import '../styles/EditProduct.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState({
    id: '',
    name: '',
    importDate: '',
    quantity: '',
    productType: { id: '', name: '' }
  });
  
  const [productTypes, setProductTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData, productTypesData] = await Promise.all([
          fetchProductById(id),
          fetchProductTypes()
        ]);
        
        setProduct(productData);
        setProductTypes(productTypesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  const validateForm = () => {
    const newErrors = {};
    
    // Validate product name
    if (!isValidProductName(product.name)) {
      newErrors.name = 'Product name must not be empty and not exceed 100 characters';
    }
    
    // Validate import date
    if (!isValidDateFormat(product.importDate)) {
      newErrors.importDate = 'Invalid date format. Please use DD/MM/YYYY';
    } else if (!isNotFutureDate(product.importDate)) {
      newErrors.importDate = 'Import date cannot be in the future';
    }
    
    // Validate quantity
    if (!isValidQuantity(product.quantity)) {
      newErrors.quantity = 'Quantity must be a positive integer';
    }
    
    // Validate product type
    if (!product.productType || !product.productType.id) {
      newErrors.productType = 'Please select a product type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'productTypeId') {
      const selectedType = productTypes.find(type => type.id === value);
      setProduct({
        ...product,
        productType: selectedType || { id: '', name: '' }
      });
    } else {
      setProduct({
        ...product,
        [name]: value
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await updateProduct(id, product);
        setSuccessMessage('Product updated successfully!');
        
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        console.error('Error updating product:', error);
        setErrors({ submit: 'Failed to update product. Please try again.' });
      }
    }
  };
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>
      
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      
      {errors.submit && (
        <div className="error-message">
          {errors.submit}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label htmlFor="id">Product ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={product.id}
            disabled
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          />
          {errors.name && <div className="error-text">{errors.name}</div>}
          <small className="form-text">Maximum 100 characters</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="importDate">Import Date:</label>
          <input
            type="text"
            id="importDate"
            name="importDate"
            value={product.importDate}
            onChange={handleChange}
            placeholder="DD/MM/YYYY"
            className={`form-control ${errors.importDate ? 'is-invalid' : ''}`}
          />
          {errors.importDate && <div className="error-text">{errors.importDate}</div>}
          <small className="form-text">Format: DD/MM/YYYY (must not be in the future)</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
          />
          {errors.quantity && <div className="error-text">{errors.quantity}</div>}
          <small className="form-text">Must be a positive integer</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="productTypeId">Product Type:</label>
          <select
            id="productTypeId"
            name="productTypeId"
            value={product.productType.id}
            onChange={handleChange}
            className={`form-control ${errors.productType ? 'is-invalid' : ''}`}
          >
            <option value="">Select a product type</option>
            {productTypes.map(type => (
              <option key={type.id} value={type.id}>
                {type.name} ({type.id})
              </option>
            ))}
          </select>
          {errors.productType && <div className="error-text">{errors.productType}</div>}
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn-save">Save Changes</button>
          <button 
            type="button" 
            className="btn-cancel"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct; 