import React, { useState, useEffect } from 'react';
import { products } from '../data/mockData';
import '../styles/ProductList.css';

const ProductList = () => {
    const [sortedProducts, setSortedProducts] = useState([]);

    useEffect(() => {
        const sorted = [...products].sort((a, b) => a.quantity - b.quantity);
        setSortedProducts(sorted);
    }, []);

    const isValidDateFormat = (dateString) => {
        if (!dateString) return false;
        
        const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        if (!regex.test(dateString)) return false;
        
        const [, day, month, year] = dateString.match(regex);
        
        const dayInt = parseInt(day, 10);
        const monthInt = parseInt(month, 10);
        const yearInt = parseInt(year, 10);
        
        if (monthInt < 1 || monthInt > 12) return false;
        
        const daysInMonth = new Date(yearInt, monthInt, 0).getDate();
        if (dayInt < 1 || dayInt > daysInMonth) return false;
        
        return true;
    };

    return (
        <div className="product-list-container">
            <h2>Product List</h2>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Import Date</th>
                        <th>Quantity</th>
                        <th>Product Type</th>
                        <th>Product Type ID</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td className={isValidDateFormat(product.importDate) ? '' : 'invalid-date'}>
                                {product.importDate}
                            </td>
                            <td>{product.quantity}</td>
                            <td>{product.productType.name}</td>
                            <td>{product.productType.id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList; 