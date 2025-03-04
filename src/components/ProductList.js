import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import { isValidDateFormat } from '../utils/validation';
import ProductFilter from './ProductFilter';
import '../styles/ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const productsData = await fetchProducts();
                const sorted = [...productsData].sort((a, b) => a.quantity - b.quantity);
                setProducts(sorted);
                setFilteredProducts(sorted);
                setLoading(false);
            } catch (err) {
                setError('Failed to load products. Please try again later.');
                setLoading(false);
                console.error('Error loading products:', err);
            }
        };

        loadProducts();
    }, []);

    const handleFilter = ({ name, typeId }) => {
        let filtered = [...products];

        // Filter by name (case-insensitive partial match)
        if (name) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(name.toLowerCase())
            );
        }

        // Filter by product type
        if (typeId) {
            filtered = filtered.filter(product =>
                product.productType.id === typeId
            );
        }

        setFilteredProducts(filtered);
    };

    if (loading) {
        return <div className="loading">Loading products...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="product-list-container">
            <h2>Product List</h2>
            
            <ProductFilter onFilter={handleFilter} />

            {filteredProducts.length === 0 ? (
                <div className="no-products-message">
                    No products found matching your search criteria
                </div>
            ) : (
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Import Date</th>
                            <th>Quantity</th>
                            <th>Product Type</th>
                            <th>Product Type ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td className={isValidDateFormat(product.importDate) ? '' : 'invalid-date'}>
                                    {product.importDate}
                                </td>
                                <td>{product.quantity}</td>
                                <td>{product.productType.name}</td>
                                <td>{product.productType.id}</td>
                                <td>
                                    <Link to={`/edit/${product.id}`} className="edit-button">
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProductList; 