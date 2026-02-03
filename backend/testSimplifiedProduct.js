
const axios = require('axios');

const testSimplifiedProduct = async () => {
    const API_URL = 'http://localhost:5000/api';

    try {
        // 1. Login
        console.log('Logging in...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: 'admin@example.com',
            password: 'password123'
        });
        const token = loginRes.data.token;

        // 2. Create Product (Minimal fields)
        console.log('Creating minimal product...');
        const productData = {
            name: 'Minimal Product',
            price: 10.50,
            quantity: 100
        };

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const createRes = await axios.post(`${API_URL}/products`, productData, config);
        console.log('✅ Product created successfully:', createRes.data.name);
        console.log('Product ID:', createRes.data._id);

    } catch (error) {
        console.error('❌ Failed to create product:');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error(error.message);
        }
    }
};

testSimplifiedProduct();
