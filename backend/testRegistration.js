const axios = require('axios');

const testRegistration = async () => {
    try {
        console.log('Testing Registration API...');
        const uniqueId = Date.now();
        const newUser = {
            username: `user_${uniqueId}`,
            email: `user_${uniqueId}@example.com`,
            password: 'password123'
        };

        console.log('Registering user:', newUser.username);

        const response = await axios.post('http://localhost:5000/api/auth/register', newUser);

        console.log('Response Status:', response.status);
        console.log('Response Data:', response.data);

        if (response.status === 201 && response.data.token) {
            console.log('✅ Registration Successful');
        } else {
            console.log('❌ Registration Failed: Unexpected response');
        }

    } catch (error) {
        console.error('Error Status:', error.response ? error.response.status : 'Network Error');
        console.error('Error Data:', error.response ? error.response.data : error.message);
    }
};

testRegistration();
