import {useState, useEffect} from 'react';
import {UserCheck, Target, AlertCircle, ChevronRight} from 'lucide-react';
import api from '../api/axios.js';

const ProjectMatching = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState('');
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get('/projects');
                setProjects(res.data);
            } catch (err) {
                console.error("Error fetching projects", err);
            }
        };
        fetchProjects();
    }, []);

    const findMatches = async (id: string) => {
        if (!id) return;
        setLoading(true);
        setSelectedProjectId(id);
        try {
            const res = await api.get(`/projects/${id}/matches`);
            setMatches(res.data);
        } catch (err) {
            console.error("Error fetching matches", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Smart Talent Matching</h1>
                <p className="text-gray-500">Find the best personnel for your projects based on skill requirements.</p>
            </header>

            {/* Selection Bar */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select a Project to Analyze</label>
                <div className="flex gap-4">
                    <select
                        className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        value={selectedProjectId}
                        onChange={(e) => findMatches(e.target.value)}
                    >
                        <option value="">-- Choose a Project --</option>
                        {projects.map((p: any) => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Results Section */}
            {loading ? (
                <div className="text-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-500">Scanning database for best matches...</p>
                </div>
            ) : selectedProjectId && matches.length > 0 ? (
                <div className="grid gap-6">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                        <UserCheck className="mr-2 text-indigo-600"/> Best Candidates Found
                    </h2>
                    {matches.map((person: any) => (
                        <div key={person.id}
                             className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-md transition flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div
                                    className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                                    {person.firstName?.charAt(0) || 'U'}
                                    {person.lastName?.charAt(0) || ''}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{person.firstName} {person.lastName}</h3>
                                    <p className="text-sm text-gray-500">{person.role}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-8">
                                <div className="text-center">
                                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Experience</p>
                                    <p className="font-semibold text-gray-800">{person.yearsOfExperience} Years</p>
                                </div>
                                <div className="text-right">
                                    <button
                                        className="flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition">
                                        Assign to Project <ChevronRight size={18}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : selectedProjectId ? (
                <div className="bg-amber-50 border border-amber-200 p-8 rounded-2xl text-center">
                    <AlertCircle className="mx-auto text-amber-500 mb-3" size={40}/>
                    <p className="text-amber-800 font-medium">No 100% matches found for this project's specific
                        requirements.</p>
                    <p className="text-amber-600 text-sm">Try updating your personnel skills or lowering the
                        requirements.</p>
                </div>
            ) : (
                <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-3xl">
                    <Target className="mx-auto text-gray-300 mb-4" size={50}/>
                    <p className="text-gray-400">Select a project above to start the matching process.</p>
                </div>
            )}
        </div>
    );
};

export default ProjectMatching;