
import React, { useState, useEffect } from 'react';
import { productAPI } from '../services/api';
import '../App.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalValue: 0,
        outOfStock: 0,
        lowStock: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await productAPI.getAll();
                const products = response.data;

                const totalValue = products.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
                const outOfStock = products.filter(p => p.quantity === 0).length;
                const lowStock = products.filter(p => p.quantity > 0 && p.quantity < 5).length;

                setStats({
                    totalProducts: products.length,
                    totalValue: totalValue.toFixed(2),
                    outOfStock,
                    lowStock
                });
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="container">
            <h1>Dashboard Inventory Overview</h1>

            <div className="dashboard-grid">
                <div className="stat-card">
                    <h3>Total Products</h3>
                    <p className="stat-value">{stats.totalProducts}</p>
                </div>

                <div className="stat-card">
                    <h3>Total Store Value</h3>
                    <p className="stat-value">${stats.totalValue}</p>
                </div>

                <div className="stat-card warning">
                    <h3>Low Stock Items</h3>
                    <p className="stat-value">{stats.lowStock}</p>
                </div>

                <div className="stat-card danger">
                    <h3>Out of Stock</h3>
                    <p className="stat-value">{stats.outOfStock}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
