const express = require('express');
const router = express.Router();
const {
    getPolicies,
    getPolicyById,
    createPolicy,
    updatePolicy,
    updatePolicyStatus,
} = require('../controllers/policyController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getPolicies)
    .post(protect, authorize('faculty'), createPolicy);

router.route('/:id')
    .get(protect, getPolicyById)
    .put(protect, authorize('faculty'), updatePolicy);

router.route('/:id/status')
    .patch(protect, authorize('admin'), updatePolicyStatus);

module.exports = router;
