import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/roles';
import {
    LayoutDashboard,
    FileText,
    Settings,
    LogOut,
    Menu,
    X,
    PlusCircle,
    ShieldCheck
} from 'lucide-react';
import clsx from 'clsx';

const SidebarLink = ({ to, icon: Icon, children }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            clsx(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-300 hover:bg-slate-800 hover:text-white"
            )
        }
    >
        <Icon size={20} />
        <span className="font-medium">{children}</span>
    </NavLink>
);

const DashboardLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getNavItems = () => {
        switch (user?.role) {
            case ROLES.ADMIN:
                return (
                    <>
                        <SidebarLink to="/admin" icon={LayoutDashboard}>Dashboard</SidebarLink>
                        <SidebarLink to="/admin/approvals" icon={ShieldCheck}>Approvals</SidebarLink>
                        <SidebarLink to="/policies" icon={FileText}>All Policies</SidebarLink>
                    </>
                );
            case ROLES.FACULTY:
                return (
                    <>
                        <SidebarLink to="/faculty" icon={LayoutDashboard}>Dashboard</SidebarLink>
                        <SidebarLink to="/faculty/create-policy" icon={PlusCircle}>Create Policy</SidebarLink>
                        <SidebarLink to="/faculty/my-policies" icon={FileText}>My Policies</SidebarLink>
                    </>
                );
            case ROLES.STUDENT:
                return (
                    <>
                        <SidebarLink to="/student" icon={LayoutDashboard}>Dashboard</SidebarLink>
                        <SidebarLink to="/policies" icon={FileText}>Browse Policies</SidebarLink>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={clsx(
                    "fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
                    !isSidebarOpen && "-translate-x-full"
                )}
            >
                <div className="flex items-center justify-between p-6 border-b border-slate-800">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        AcademicPolicy
                    </h1>
                    <button
                        className="md:hidden text-gray-400 hover:text-white"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    {getNavItems()}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
                            {user?.name?.[0] || 'U'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">{user?.name}</p>
                            <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile Header */}
                <header className="bg-white shadow-sm md:hidden flex items-center p-4">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="text-gray-600"
                    >
                        <Menu size={24} />
                    </button>
                    <span className="ml-4 font-semibold text-gray-800">
                        Academic Policy System
                    </span>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-4 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
