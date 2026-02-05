const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await User.deleteMany();

        // Use bcrypt to manually hash passwords since insertMany skips pre-save hooks
        const bcrypt = require('bcryptjs');
        const salt = await bcrypt.genSalt(10);
        const initialPassword = await bcrypt.hash('password123', salt);

        const users = [
            {
                name: 'Admin User',
                email: 'admin@college.edu',
                password: initialPassword,
                role: 'admin',
            },
            {
                name: 'Faculty Member',
                email: 'faculty@college.edu',
                password: initialPassword,
                role: 'faculty',
            },
            {
                name: 'Student User',
                email: 'student@college.edu',
                password: initialPassword,
                role: 'student',
            },
        ];

        await User.insertMany(users);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
