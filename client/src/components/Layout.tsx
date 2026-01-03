import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    BookOpen,
    Briefcase,
    LogOut,
    UserCircle
} from 'lucide-react';

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const role = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Personnel', path: '/personnel', icon: Users },
        { name: 'Skills Catalog', path: '/skills', icon: BookOpen },
        { name: 'Project Matching', path: '/projects', icon: Briefcase },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-6">
                    <h1 className="text-xl font-bold text-blue-600 flex items-center">
                        <UserCircle className="mr-2" /> SkillMatch
                    </h1>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center px-4 py-3 rounded-lg transition ${
                                    isActive
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <Icon size={20} className="mr-3" />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="mb-4 px-4 py-2 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 uppercase font-bold">Logged in as</p>
                        <p className="text-sm font-semibold text-gray-700">{role}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                        <LogOut size={20} className="mr-3" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;