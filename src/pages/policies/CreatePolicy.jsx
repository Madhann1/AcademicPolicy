import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePolicies } from '../../context/PolicyContext';
import { useAuth } from '../../context/AuthContext';
import { Save, X } from 'lucide-react';

const CreatePolicy = () => {
    const navigate = useNavigate();
    const { addPolicy } = usePolicies();
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        title: '',
        category: 'Academic',
        description: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await addPolicy({
            title: formData.title,
            category: formData.category,
            content: formData.description,
        });

        if (result.success) {
            navigate('/faculty/my-policies');
        } else {
            alert(result.message);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h1 className="text-xl font-bold text-gray-900">Create New Policy</h1>
                    <p className="text-sm text-gray-500 mt-1">Draft a new academic policy for approval.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Policy Title
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Examination Conduct Guidelines"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="Academic">Academic</option>
                            <option value="Administrative">Administrative</option>
                            <option value="IT">IT & Resources</option>
                            <option value="Student Affairs">Student Affairs</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description & Content
                        </label>
                        <textarea
                            required
                            rows={6}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Describe the policy details..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                        >
                            <X size={18} />
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium shadow-sm"
                        >
                            <Save size={18} />
                            Submit for Approval
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePolicy;
