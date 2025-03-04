import React from 'react';
import ProductList from './ProductList';
import '../styles/StoreManagement.css';

const StoreManagement = () => {
    return (
        <div className="store-management">
            <header className="header">
                <h1>Store Management</h1>
            </header>
            <main className="main-content">
                <ProductList />
            </main>
            <footer className="footer">
                <p>&copy; 2077 Store Management</p>
            </footer>
        </div>
    );
};

export default StoreManagement; 