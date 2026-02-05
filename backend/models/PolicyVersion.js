const mongoose = require('mongoose');

const policyVersionSchema = mongoose.Schema(
    {
        policyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Policy',
            required: true,
        },
        versionNumber: {
            type: Number,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const PolicyVersion = mongoose.model('PolicyVersion', policyVersionSchema);

module.exports = PolicyVersion;
