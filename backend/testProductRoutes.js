
const axios = require('axios');

const generateSKU = () => 'SKU-' + Math.random().toString(36).substr(2, 9).toUpperCase();

const testProductRoutes = async () => {
    const API_URL = 'http://localhost:5000/api';
    let token;
    let productId;

    try {
        // 1. Login to get token
        console.log('\n1. Logging in...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: 'admin@example.com',
            password: 'password123'
        });
        token = loginRes.data.token;
        console.log('✅ Logged in successfully');

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        // 2. Create Product
        console.log('\n2. Creating Product...');
        const productData = {
            name: 'Test Product',
            description: 'This is a test product',
            category: 'Electronics',
            price: 99.99,
            quantity: 10,
            sku: generateSKU(),
            supplier: 'Test Supplier'
        };
        const createRes = await axios.post(`${API_URL}/products`, productData, config);
        productId = createRes.data._id;
        console.log('✅ Product created:', createRes.data.name);

        // 3. Get All Products
        console.log('\n3. Fetching All Products...');
        const getAllRes = await axios.get(`${API_URL}/products`, config);
        console.log(`✅ Fetched ${getAllRes.data.length} products`);

        // 4. Get Single Product
        console.log('\n4. Fetching Single Product...');
        const getOneRes = await axios.get(`${API_URL}/products/${productId}`, config);
        console.log('✅ Fetched product:', getOneRes.data.name);

        // 5. Update Product
        console.log('\n5. Updating Product...');
        const updateRes = await axios.put(`${API_URL}/products/${productId}`, {
            price: 199.99,
            quantity: 20
        }, config);
        console.log('✅ Product updated. New Price:', updateRes.data.price);

        // 6. Delete Product
        console.log('\n6. Deleting Product...');
        await axios.delete(`${API_URL}/products/${productId}`, config);
        console.log('✅ Product deleted');

        // 7. Verify Deletion
        console.log('\n7. Verifying Deletion...');
        try {
            await axios.get(`${API_URL}/products/${productId}`, config);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log('✅ Product correctly not found (404)');
            } else {
                throw error;
            }
        }

        console.log('\n🎉 ALL BACKEND TESTS PASSED');

    } catch (error) {
        console.error('\n❌ TEST FAILED:', error.response ? error.response.data : error.message);
    }
};

testProductRoutes();
