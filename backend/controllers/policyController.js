const Policy = require('../models/Policy');
const PolicyVersion = require('../models/PolicyVersion');

// @desc    Get all policies
// @route   GET /api/policies
// @access  Private (Role-based filtering)
const getPolicies = async (req, res) => {
    let query = {};

    if (req.user.role === 'student') {
        // Students only see approved policies
        query.status = 'approved';
    } else if (req.user.role === 'faculty') {
        // Faculty see approved policies + their own pending/rejected
        query = {
            $or: [
                { status: 'approved' },
                { createdBy: req.user._id }
            ]
        };
    }
    // Admin sees all (empty query)

    const policies = await Policy.find(query)
        .populate('createdBy', 'name')
        .populate('approvedBy', 'name')
        .sort({ createdAt: -1 });

    res.json(policies);
};

// @desc    Get single policy
// @route   GET /api/policies/:id
// @access  Private
const getPolicyById = async (req, res) => {
    const policy = await Policy.findById(req.params.id)
        .populate('createdBy', 'name')
        .populate('currentVersionId');

    if (policy) {
        // Check access for students/faculty if restricted
        if (req.user.role === 'student' && policy.status !== 'approved') {
            res.status(403);
            throw new Error('Not authorized to view this policy');
        }
        res.json(policy);
    } else {
        res.status(404);
        throw new Error('Policy not found');
    }
};

// @desc    Create a policy
// @route   POST /api/policies
// @access  Private (Faculty)
const createPolicy = async (req, res) => {
    const { title, category, content } = req.body;

    const policy = new Policy({
        title,
        category,
        content,
        createdBy: req.user._id,
        status: 'pending',
        version: 1.0,
    });

    const createdPolicy = await policy.save();

    // Create initial version
    const version = await PolicyVersion.create({
        policyId: createdPolicy._id,
        versionNumber: 1.0,
        content,
        createdBy: req.user._id,
    });

    createdPolicy.currentVersionId = version._id;
    await createdPolicy.save();

    res.status(201).json(createdPolicy);
};

// @desc    Update a policy (New Version)
// @route   PUT /api/policies/:id
// @access  Private (Faculty)
const updatePolicy = async (req, res) => {
    const { title, content, category } = req.body;
    const policy = await Policy.findById(req.params.id);

    if (policy) {
        if (policy.createdBy.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error('Not authorized to update this policy');
        }

        // Update metadata
        policy.title = title || policy.title;
        policy.category = category || policy.category;
        policy.content = content || policy.content;

        // Increment version
        const newVersionNum = parseFloat((policy.version + 0.1).toFixed(1));
        policy.version = newVersionNum;
        policy.status = 'pending'; // Reset to pending on update
        policy.approvedBy = undefined; // Clear approval

        const updatedPolicy = await policy.save();

        // Archive new version
        const version = await PolicyVersion.create({
            policyId: updatedPolicy._id,
            versionNumber: newVersionNum,
            content: content || policy.content,
            createdBy: req.user._id,
        });

        updatedPolicy.currentVersionId = version._id;
        await updatedPolicy.save();

        res.json(updatedPolicy);
    } else {
        res.status(404);
        throw new Error('Policy not found');
    }
};

// @desc    Update policy status (Approve/Reject)
// @route   PATCH /api/policies/:id/status
// @access  Private (Admin)
const updatePolicyStatus = async (req, res) => {
    const { status } = req.body;
    const policy = await Policy.findById(req.params.id);

    if (policy) {
        policy.status = status;
        if (status === 'approved') {
            policy.approvedBy = req.user._id;
        }
        const updatedPolicy = await policy.save();
        res.json(updatedPolicy);
    } else {
        res.status(404);
        throw new Error('Policy not found');
    }
};

module.exports = {
    getPolicies,
    getPolicyById,
    createPolicy,
    updatePolicy,
    updatePolicyStatus,
};
