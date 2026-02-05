import { usePolicies } from '../../context/PolicyContext';
import { useAuth } from '../../context/AuthContext';

const FacultyDashboard = () => {
    const { policies } = usePolicies();
    const { user } = useAuth();

    const myPolicies = policies.filter(p => p.author === user.name);
    const policiesUnderReview = myPolicies.filter(p => p.status === 'pending').length;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Faculty Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-700">My Policies</h3>
                    <p className="text-3xl font-bold text-orange-600 mt-2">{myPolicies.length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-700">Policies Under Review</h3>
                    <p className="text-3xl font-bold text-yellow-600 mt-2">{policiesUnderReview}</p>
                </div>
            </div>
        </div>
    );
};

export default FacultyDashboard;
