import React, { useState, useEffect } from 'react';
import { fetchProductTypes } from '../services/api';
import '../styles/ProductFilter.css';

const ProductFilter = ({ onFilter }) => {
    const [productName, setProductName] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [productTypes, setProductTypes] = useState([]);

    useEffect(() => {
        const loadProductTypes = async () => {
            try {
                const types = await fetchProductTypes();
                setProductTypes(types);
            } catch (error) {
                console.error('Error loading product types:', error);
            }
        };

        loadProductTypes();
    }, []);

    const handleFilter = () => {
        onFilter({
            name: productName.trim(),
            typeId: selectedType
        });
    };

    const handleReset = () => {
        setProductName('');
        setSelectedType('');
        onFilter({
            name: '',
            typeId: ''
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'productName') {
            setProductName(value);
        } else if (name === 'productType') {
            setSelectedType(value);
        }
        
        // Apply filter immediately when changing values
        onFilter({
            name: name === 'productName' ? value.trim() : productName.trim(),
            typeId: name === 'productType' ? value : selectedType
        });
    };

    return (
        <div className="product-filter">
            <div className="filter-group">
                <input
                    type="text"
                    name="productName"
                    value={productName}
                    onChange={handleChange}
                    placeholder="Search by product name..."
                    className="filter-input"
                />
            </div>

            <div className="filter-group">
                <select
                    name="productType"
                    value={selectedType}
                    onChange={handleChange}
                    className="filter-select"
                >
                    <option value="">All Product Types</option>
                    {productTypes.map(type => (
                        <option key={type.id} value={type.id}>
                            {type.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-actions">
                <button onClick={handleReset} className="reset-button">
                    Reset Filters
                </button>
            </div>
        </div>
    );
};

export default ProductFilter; 