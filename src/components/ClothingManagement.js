import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './ProductList';
import EditProduct from './EditProduct';
import '../styles/ClothingManagement.css';

const ClothingManagement = () => {
    return (
        <div className="clothing-management">
            <header className="header">
                <h1>Clothing Distribution Agency</h1>
                <nav className="nav">
                    <Link to="/" className="nav-link">Product List</Link>
                </nav>
            </header>
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/edit/:id" element={<EditProduct />} />
                </Routes>
            </main>
            <footer className="footer">
                <p>&copy; 2025 Clothing Distribution Agency</p>
            </footer>
        </div>
    );
};

export default ClothingManagement; 