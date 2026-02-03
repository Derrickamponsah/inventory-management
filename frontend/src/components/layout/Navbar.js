
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';
import '../../App.css';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = async () => {
        try {
            await authAPI.logout();
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            // Force logout even if API call fails
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/dashboard">Inventory System</Link>
            </div>
            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link to="/dashboard" className="navbar-item">Dashboard</Link>
                    <Link to="/products" className="navbar-item">Products</Link>
                    <Link to="/products/add" className="navbar-item">Add Product</Link>
                </div>
                <div className="navbar-end">
                    <span className="navbar-item user-welcome">
                        Welcome, {user ? user.username : 'User'}
                    </span>
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
