import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-8 text-white">
                <h2 className="text-3xl font-bold">Welcome, Student!</h2>
                <p className="mt-2 opacity-90">Browse currently approved academic policies and regulations.</p>
                <button
                    onClick={() => navigate('/policies')}
                    className="mt-6 bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold shadow-lg hover:bg-gray-50 transition-colors"
                >
                    Browse Policies
                </button>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h3>
                <p className="text-gray-500">Check the Policies tab for the latest updates.</p>
            </div>
        </div>
    );
};

export default StudentDashboard;
