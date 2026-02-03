
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productAPI } from '../services/api';
import '../App.css';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await productAPI.getOne(id);
                const { name, price, quantity } = response.data;
                setFormData({ name, price, quantity });
            } catch (err) {
                setError('Failed to fetch product details');
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await productAPI.update(id, formData);
            navigate('/products');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update product');
        }
    };

    return (
        <div className="container">
            <div className="login-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h2>Edit Product</h2>
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} style={{ flexDirection: 'column' }}>
                    <div className="form-group">
                        <label>Product Name</label>
                        <input type="text" name="name" value={formData.name} required onChange={handleChange} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="form-group">
                            <label>Price</label>
                            <input type="number" name="price" value={formData.price} step="0.01" required onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Quantity</label>
                            <input type="number" name="quantity" value={formData.quantity} required onChange={handleChange} />
                        </div>
                    </div>

                    <button type="submit">Update Product</button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
