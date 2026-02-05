const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const checkDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to: ${conn.connection.name}`);

        const collections = await mongoose.connection.db.listCollections().toArray();

        console.log('\n--- Collections & Counts ---');
        for (let collection of collections) {
            const count = await mongoose.connection.db.collection(collection.name).countDocuments();
            console.log(`${collection.name}: ${count} documents`);
        }
        console.log('----------------------------\n');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkDB();
