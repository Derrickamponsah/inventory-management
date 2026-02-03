
const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const testLogin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');

        const email = 'admin@example.com';
        const password = 'password123';

        const user = await User.findOne({ email });

        if (!user) {
            console.log('User NOT FOUND');
            process.exit(1);
        }

        console.log('User Found:', user.email);
        console.log('Stored Hashed Password:', user.password);

        const isMatch = await user.comparePassword(password);

        if (isMatch) {
            console.log('SUCCESS: Password matches!');
        } else {
            console.log('FAILURE: Password does NOT match.');
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

testLogin();
