
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import '../App.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await productAPI.getAll();
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await productAPI.delete(id);
                setProducts(products.filter(product => product._id !== id));
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product');
            }
        }
    };

    if (loading) return <div className="container">Loading...</div>;

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1>Product List</h1>
                <Link to="/products/add" className="add-btn" style={{
                    backgroundColor: '#10b981',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: '600'
                }}>
                    + Add Product
                </Link>
            </div>

            <div className="product-list">
                {products.map((product) => (
                    <div key={product._id} className="product-card">
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                <span style={{ fontWeight: 'bold' }}>${product.price}</span>
                                <span style={{ color: product.quantity < 5 ? '#ef4444' : '#10b981' }}>
                                    Qty: {product.quantity}
                                </span>
                            </div>
                        </div>
                        <div className="product-actions">
                            <Link to={`/products/edit/${product._id}`}>
                                <button className="edit-btn">Edit</button>
                            </Link>
                            <button className="delete-btn" onClick={() => handleDelete(product._id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {products.length === 0 && (
                <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '40px' }}>
                    No products found. Start by adding one!
                </p>
            )}
        </div>
    );
};

export default ProductList;
