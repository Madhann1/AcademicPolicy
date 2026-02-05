import { usePolicies } from '../../context/PolicyContext';
import { Check, X, Eye } from 'lucide-react';

const AdminApprovals = () => {
    const { policies, updatePolicyStatus } = usePolicies();

    const pendingPolicies = policies.filter(p => p.status === 'pending');

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Pending Approvals</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {pendingPolicies.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        No pending policies to review.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500">
                                <tr>
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Author</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {pendingPolicies.map((policy) => (
                                    <tr key={policy._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{policy.title}</td>
                                        <td className="px-6 py-4">{policy.category}</td>
                                        <td className="px-6 py-4">{policy.createdBy?.name || 'Unknown'}</td>
                                        <td className="px-6 py-4">{new Date(policy.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button
                                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100"
                                                title="View Details"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => updatePolicyStatus(policy._id, 'approved')}
                                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-50 text-green-600 hover:bg-green-100"
                                                title="Approve"
                                            >
                                                <Check size={16} />
                                            </button>
                                            <button
                                                onClick={() => updatePolicyStatus(policy._id, 'rejected')}
                                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100"
                                                title="Reject"
                                            >
                                                <X size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminApprovals;
