
const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');

        const users = await User.find({});
        console.log('Existing Users:', users);

        if (users.length === 0) {
            console.log('No users found. Seeding default admin user...');
            const adminUser = await User.create({
                username: 'admin',
                email: 'admin@example.com',
                password: 'password123', // Will be hashed by pre-save hook
                role: 'admin'
            });
            console.log('User created:', adminUser);
            console.log('Credentials -> Email: admin@example.com, Password: password123');
        } else {
            console.log('Users already exist. No seeding needed.');
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkUsers();
