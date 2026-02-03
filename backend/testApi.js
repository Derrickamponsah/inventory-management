
const axios = require('axios');

const testApi = async () => {
    try {
        console.log('Testing Login API...');
        const response = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'admin@example.com',
            password: 'password123'
        });
        console.log('Response Status:', response.status);
        console.log('Response Data:', response.data);
    } catch (error) {
        console.error('Error Status:', error.response ? error.response.status : 'Network Error');
        console.error('Error Data:', error.response ? error.response.data : error.message);
    }
};

testApi();
