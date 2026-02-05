const mongoose = require('mongoose');

const policySchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: ['Academic', 'Administrative', 'IT', 'Student Affairs'],
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
        version: {
            type: Number,
            default: 1.0,
        },
        currentVersionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PolicyVersion',
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        approvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

const Policy = mongoose.model('Policy', policySchema);

module.exports = Policy;
