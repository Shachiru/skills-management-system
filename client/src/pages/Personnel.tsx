import {useEffect, useState} from 'react';
import {Filter, Briefcase, Calendar, Star, Loader2} from 'lucide-react';
import api from '../api/axios.js';

interface PersonnelMember {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    yearsOfExperience: number;
    isAvailable: boolean;
    skills: any[];
}

const Personnel = () => {
    const [personnel, setPersonnel] = useState<PersonnelMember[]>([]);
    const [loading, setLoading] = useState(true);

    // Filters State
    const [role, setRole] = useState('');
    const [minExp, setMinExp] = useState('');

    const fetchPersonnel = async () => {
        setLoading(true);
        try {
            // Backend Advanced Search API එකට Query Params යැවීම
            const response = await api.get('/personnel', {
                params: {
                    role: role || undefined,
                    minExp: minExp || undefined
                }
            });
            setPersonnel(response.data);
        } catch (error) {
            console.error("Error fetching personnel", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPersonnel();
    }, []); // මුලින්ම load වන විට

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Personnel Directory</h1>
                    <button
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
                        + Add Personnel
                    </button>
                </div>

                {/* Advanced Search & Filtering Bar */}
                <div
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-wrap gap-4 items-end">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Search by
                            Role</label>
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"/>
                            <input
                                type="text"
                                placeholder="e.g. Developer, Manager"
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="w-48">
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Min Experience
                            (Years)</label>
                        <div className="relative">
                            <Star className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"/>
                            <input
                                type="number"
                                placeholder="0"
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                value={minExp}
                                onChange={(e) => setMinExp(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        onClick={fetchPersonnel}
                        className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition flex items-center"
                    >
                        <Filter className="w-4 h-4 mr-2"/> Filter Results
                    </button>
                </div>

                {/* Personnel Grid */}
                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="animate-spin h-8 w-8 text-indigo-600"/>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {personnel.map((member) => (
                            <div key={member.id}
                                 className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div
                                        className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                                        {member.firstName?.charAt(0) || 'U'}
                                        {member.lastName?.charAt(0) || ''}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{member.firstName} {member.lastName}</h3>
                                        <p className="text-sm text-gray-500">{member.email}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Briefcase className="w-4 h-4 mr-2"/>
                                        <span>{member.role || 'Not Assigned'}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Calendar className="w-4 h-4 mr-2"/>
                                        <span>{member.yearsOfExperience} Years Experience</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-medium ${member.isAvailable ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                                            {member.isAvailable ? 'Available' : 'On Project'}
                                        </span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                                        View Skills
                                    </button>
                                    <button className="text-sm font-medium text-gray-400 hover:text-gray-600">
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && personnel.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                        <p className="text-gray-500">No personnel found matching your filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Personnel;