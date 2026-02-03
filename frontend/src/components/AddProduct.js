
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import '../App.css';

const AddProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await productAPI.create(formData);
            navigate('/products');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create product');
        }
    };

    return (
        <div className="container">
            <div className="login-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h2>Add New Product</h2>
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} style={{ flexDirection: 'column' }}>
                    <div className="form-group">
                        <label>Product Name</label>
                        <input type="text" name="name" required onChange={handleChange} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="form-group">
                            <label>Price</label>
                            <input type="number" name="price" step="0.01" required onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Quantity</label>
                            <input type="number" name="quantity" required onChange={handleChange} />
                        </div>
                    </div>

                    <button type="submit">Create Product</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
