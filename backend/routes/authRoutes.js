const express = require('express');
const router = express.Router();
const { loginUser, createUser } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/login', loginUser);
router.post('/create-user', protect, authorize('admin'), createUser);

module.exports = router;
