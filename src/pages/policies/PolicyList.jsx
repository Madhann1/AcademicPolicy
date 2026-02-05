import { useState } from 'react';
import { usePolicies } from '../../context/PolicyContext';
import { Search, Filter, FileText, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/roles';

const PolicyList = ({ view = 'all' }) => {
    const { policies, loading } = usePolicies();
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading policies...</div>;
    }

    // Filter policies based on role and search
    const filteredPolicies = policies.filter(policy => {
        const description = policy.content || '';
        const authorName = policy.createdBy?.name || 'Unknown';

        const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All' || policy.category === filterCategory;

        // Students see only approved policies (Backend already filters this, but good to keep safe)
        let isVisible = true; // user.role === ROLES.STUDENT ? policy.status === 'approved' : true;

        // Faculty "My Policies" view
        if (view === 'my' && user.role === ROLES.FACULTY) {
            // Check ID matching if available, else name
            const isAuthor = policy.createdBy?._id === user.id || policy.createdBy === user.id;
            isVisible = isVisible && isAuthor;
        }

        return matchesSearch && matchesCategory && isVisible;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved': return <CheckCircle size={16} />;
            case 'pending': return <Clock size={16} />;
            case 'rejected': return <XCircle size={16} />;
            default: return null;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Academic Policies</h1>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search policies..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <select
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        <option value="Academic">Academic</option>
                        <option value="Administrative">Administrative</option>
                        <option value="IT">IT & Resources</option>
                    </select>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredPolicies.map(policy => (
                    <div key={policy._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                <FileText size={24} />
                            </div>
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(policy.status)}`}>
                                {getStatusIcon(policy.status)}
                                {policy.status}
                            </span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2">{policy.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{policy.content}</p>

                        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-50">
                            <span>{policy.category}</span>
                            <div className="flex flex-col items-end">
                                <span>v{policy.version} • {new Date(policy.createdAt).toLocaleDateString()}</span>
                                <span className="text-gray-400">by {policy.createdBy?.name}</span>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredPolicies.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        No policies found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default PolicyList;
