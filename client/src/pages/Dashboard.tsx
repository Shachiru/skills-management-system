import { useEffect, useState } from 'react';
import { Users, Briefcase, Award, PieChart } from 'lucide-react';
import api from '../api/axios.js';

interface Stats {
    summary: {
        totalPersonnel: number;
        totalProjects: number;
        totalSkills: number;
    };
    projectDistribution: { status: string; count: number }[];
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

    if (loading) return <div className="p-8 text-center">Loading Dashboard...</div>;

    const cards = [
        { title: 'Total Personnel', value: stats?.summary.totalPersonnel, icon: Users, color: 'bg-blue-500' },
        { title: 'Active Projects', value: stats?.summary.totalProjects, icon: Briefcase, color: 'bg-green-500' },
        { title: 'Total Skills', value: stats?.summary.totalSkills, icon: Award, color: 'bg-purple-500' },
    ];

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {cards.map((card, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
                        <div className={`${card.color} p-3 rounded-lg text-white`}>
                            <card.icon size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">{card.title}</p>
                            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Project Distribution Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                    <PieChart className="mr-2" size={20} /> Project Status Distribution
                </h2>
                <div className="space-y-4">
                    {stats?.projectDistribution.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <span className="text-gray-600">{item.status}</span>
                            <div className="flex-1 mx-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500"
                                    style={{ width: `${(item.count / stats.summary.totalProjects) * 100}%` }}
                                ></div>
                            </div>
                            <span className="font-semibold text-gray-800">{item.count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;