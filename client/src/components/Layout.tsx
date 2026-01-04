import { Link, useLocation, Outlet } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Briefcase,
    Bell,
    Search,
    ChevronDown,
    HelpCircle,
    LogOut,
    BarChart3,
    Award,
    GitBranch,
    Settings
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
    const location = useLocation();
    const { logout, user } = useAuth();
    const username = user?.email?.split('@')[0] || 'User';

    const handleLogout = () => {
        logout();
    };

    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Personnel', path: '/personnel', icon: Users },
        { name: 'Skills', path: '/skills', icon: Award },
        { name: 'Projects', path: '/projects', icon: Briefcase },
        { name: 'Project Matching', path: '/project-matching', icon: GitBranch },
        { name: 'Analytics', path: '/analytics', icon: BarChart3 },
        { name: 'Settings', path: '/settings', icon: Settings as any },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white flex flex-col">
                {/* Logo */}
                <div className="px-6 py-5 border-b border-gray-800">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">SM</span>
                        </div>
                        <span className="text-lg font-semibold">Skills Manager</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-4 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center px-3 py-2.5 rounded-lg transition text-sm font-medium ${
                                    isActive
                                        ? 'bg-gray-800 text-white'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`}
                            >
                                <Icon size={18} className="mr-3" />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Section */}
                <div className="p-4 border-t border-gray-800 space-y-2">
                    <button className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition">
                        <HelpCircle size={18} className="mr-3" />
                        <span>Help & support</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition"
                    >
                        <LogOut size={18} className="mr-3" />
                        <span>Sign out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-200 px-8 py-4">
                    <div className="flex items-center justify-between">
                        {/* Search Bar */}
                        <div className="flex-1 max-w-xl">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Explore data..."
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition"
                                />
                            </div>
                        </div>

                        {/* Right Side - Insights, Notifications, User */}
                        <div className="flex items-center space-x-4 ml-6">
                            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition">
                                Insights
                            </button>
                            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition">
                                More projects
                            </button>

                            {/* Notifications */}
                            <button className="p-2 relative hover:bg-gray-50 rounded-lg transition">
                                <Bell className="w-5 h-5 text-gray-600" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            {/* User Menu */}
                            <button className="flex items-center space-x-3 pl-3 pr-2 py-1.5 hover:bg-gray-50 rounded-lg transition">
                                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                                    {username.substring(0, 2).toUpperCase()}
                                </div>
                                <span className="text-sm font-medium text-gray-700">{username}</span>
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;