import { useEffect, useState } from 'react';
import { Bell, Eye, Settings, FileText, List, ChevronRight, Clock, Calendar } from 'lucide-react';
import api from '../api/axios.js';

interface Stats {
    summary: {
        totalPersonnel: number;
        totalProjects: number;
        totalSkills: number;
    };
    projectDistribution: { status: string; count: number }[];
}

interface Project {
    id: string;
    name: string;
    status: string;
    assignee: string;
    organization: string;
    docsCount: number;
    tasksCount: number;
    reviewCount: number;
    progress: number;
}

const Dashboard = () => {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/analytics/stats');
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    // Mock projects data - replace with actual API call
    const projects: Project[] = [
        {
            id: '1',
            name: 'Abstergo-DD-2025',
            status: 'In Progress',
            assignee: 'Tom Jones',
            organization: 'Sianne LLC',
            docsCount: 5,
            tasksCount: 24,
            reviewCount: 25,
            progress: 14
        },
        {
            id: '2',
            name: 'Abstergo-DD-2025',
            status: 'In Progress',
            assignee: 'Tom Jones',
            organization: 'Sianne LLC',
            docsCount: 5,
            tasksCount: 24,
            reviewCount: 25,
            progress: 14
        },
        {
            id: '3',
            name: 'Abstergo-DD-2025',
            status: 'In Progress',
            assignee: 'Tom Jones',
            organization: 'Sianne LLC',
            docsCount: 5,
            tasksCount: 24,
            reviewCount: 25,
            progress: 14
        }
    ];

    const tasks = [
        { title: 'Team building workshop', task: 'Activity planning', startTime: '07:12', totalTime: '02:16:00' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with Stats */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-8 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Alerts Card */}
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                                <Bell className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                                <p className="text-3xl font-semibold text-gray-900">2</p>
                                <p className="text-sm text-gray-500">Alerts</p>
                            </div>
                        </div>

                        {/* Review Needs Card */}
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                                <Eye className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                                <p className="text-3xl font-semibold text-gray-900">{stats?.summary.totalProjects || 25}</p>
                                <p className="text-sm text-gray-500">Review needs</p>
                            </div>
                        </div>

                        {/* Active Projects Card */}
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                                <Settings className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                                <p className="text-3xl font-semibold text-gray-900">{stats?.summary.totalProjects || 3}</p>
                                <p className="text-sm text-gray-500">Active projects</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-8 py-6">
                {/* Filter Tabs and Actions */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-6">
                        <button className="text-sm font-medium text-gray-900 border-b-2 border-gray-900 pb-1">
                            Timesheet
                        </button>
                        <button className="text-sm font-medium text-gray-500 hover:text-gray-900 pb-1">
                            Pending approval
                        </button>
                        <button className="text-sm font-medium text-gray-500 hover:text-gray-900 pb-1">
                            Unsubmitted
                        </button>
                        <button className="text-sm font-medium text-gray-500 hover:text-gray-900 pb-1">
                            Approved
                        </button>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                            <List className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                            <Settings className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {projects.map((project, index) => (
                        <div key={index} className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                            {/* Project Image Header */}
                            <div className="relative h-40 bg-gradient-to-br from-gray-800 to-gray-600">
                                <div className="absolute inset-0 bg-black/20"></div>
                                <div className="absolute top-4 left-4 flex items-center space-x-2">
                                    <button className="p-1.5 bg-white/90 hover:bg-white rounded-lg transition">
                                        <Eye className="w-4 h-4 text-gray-700" />
                                    </button>
                                    <button className="p-1.5 bg-white/90 hover:bg-white rounded-lg transition">
                                        <FileText className="w-4 h-4 text-gray-700" />
                                    </button>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <button className="p-1.5 bg-white/90 hover:bg-white rounded-lg transition">
                                        <Settings className="w-4 h-4 text-gray-700" />
                                    </button>
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <span className="text-white/90 text-sm font-medium">01</span>
                                </div>
                            </div>

                            {/* Project Info */}
                            <div className="p-5">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">{project.name}</h3>
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700">
                                            {project.status}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500">Done/Reviewed</p>
                                        <p className="text-sm font-semibold text-gray-900">{project.progress} / 25</p>
                                    </div>
                                </div>

                                {/* Assignee */}
                                <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-100">
                                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                                        TJ
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{project.assignee}</p>
                                        <p className="text-xs text-gray-500">{project.organization}</p>
                                    </div>
                                </div>

                                {/* Stats Row */}
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center space-x-1 text-gray-600">
                                        <FileText className="w-4 h-4" />
                                        <span>{project.docsCount}</span>
                                        <span className="text-xs text-gray-400">Docs</span>
                                    </div>
                                    <div className="flex items-center space-x-1 text-gray-600">
                                        <List className="w-4 h-4" />
                                        <span>{project.tasksCount}</span>
                                        <span className="text-xs text-gray-400">To-do tasks</span>
                                    </div>
                                    <div className="flex items-center space-x-1 text-gray-600">
                                        <Eye className="w-4 h-4" />
                                        <span>{project.reviewCount}</span>
                                        <span className="text-xs text-gray-400">Review needs</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
                                        Actions
                                    </button>
                                    <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition flex items-center">
                                        Open the project
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Timesheet Section */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                                <ChevronRight className="w-5 h-5 text-gray-400 rotate-180" />
                            </button>
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">Today April 3 2025</span>
                            </div>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                        <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition">
                            + Clock time
                        </button>
                    </div>

                    {/* Timesheet Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left">
                                        <input type="checkbox" className="rounded border-gray-300" />
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Task
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Start time
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total time
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {tasks.map((task, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <input type="checkbox" className="rounded border-gray-300" />
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{task.title}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{task.task}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500 flex items-center space-x-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{task.startTime}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 flex items-center space-x-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{task.totalTime}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <button className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition">
                                                    <span className="text-xs">▶</span>
                                                </button>
                                                <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                                                    <span className="text-gray-400">⋮</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;