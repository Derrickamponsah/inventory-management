
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dropSkuIndex = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');

        const collection = mongoose.connection.collection('products');

        try {
            await collection.dropIndex('sku_1');
            console.log('✅ Index "sku_1" dropped successfully');
        } catch (error) {
            console.log('ℹ️ Index drop failed (might not exist):', error.message);
        }

        // List indexes to confirm
        const indexes = await collection.indexes();
        console.log('Current Indexes:', indexes);

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

dropSkuIndex();
