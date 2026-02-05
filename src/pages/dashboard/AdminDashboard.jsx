import { usePolicies } from '../../context/PolicyContext';

const AdminDashboard = () => {
    const { policies } = usePolicies();

    const pendingCount = policies.filter(p => p.status === 'pending').length;
    const totalCount = policies.length;
    const activeUsers = 12; // Mock user count as we don't track comprehensive users list in context yet

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-700">Pending Approvals</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{pendingCount}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-700">Total Policies</h3>
                    <p className="text-3xl font-bold text-cyan-600 mt-2">{totalCount}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-700">Active Users</h3>
                    <p className="text-3xl font-bold text-purple-600 mt-2">{activeUsers}</p>
                </div>
            </div>
            {/* Recent Activity Section could go here */}
        </div>
    );
};

export default AdminDashboard;
