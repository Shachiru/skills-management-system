import {useState, useEffect} from 'react';
import {UserCheck, Target, AlertCircle, ChevronRight, Star, Briefcase} from 'lucide-react';
import api from '../api/axios.js';

interface MatchingPerson {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    yearsOfExperience: number;
    matchPercentage: number;
    skills: any[];
}

const ProjectMatching = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState('');
    const [matches, setMatches] = useState<MatchingPerson[]>([]);
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
        if (!id) {
            setMatches([]);
            setSelectedProjectId('');
            return;
        }
        setLoading(true);
        setSelectedProjectId(id);
        try {
            const res = await api.get(`/projects/${id}/matches`);
            setMatches(res.data);
        } catch (err) {
            console.error("Error fetching matches", err);
            setMatches([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 lg:p-8">
            <header className="mb-10 text-center lg:text-left">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Smart Talent Matching</h1>
                <p className="text-gray-500 mt-2">Algorithm-driven personnel suggestions based on project
                    requirements.</p>
            </header>

            {/* Project Selection Dropdown */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-10">
                <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Select a Project
                    to Analyze</label>
                <div className="relative">
                    <select
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition appearance-none font-medium text-gray-700"
                        value={selectedProjectId}
                        onChange={(e) => findMatches(e.target.value)}
                    >
                        <option value="">-- Choose a Project --</option>
                        {projects.map((p: any) => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                        <ChevronRight className="rotate-90 text-gray-400" size={20}/>
                    </div>
                </div>
            </div>

            {/* Results Display */}
            {loading ? (
                <div className="text-center py-24">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-6 text-gray-500 font-medium animate-pulse">Calculating match scores...</p>
                </div>
            ) : selectedProjectId && matches.length > 0 ? (
                <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center">
                            <UserCheck className="mr-3 text-emerald-500"/> Top Recommendations
                        </h2>
                        <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                            {matches.length} Candidates Found
                        </span>
                    </div>

                    <div className="grid gap-4">
                        {matches.map((person) => (
                            <div key={person.id}
                                 className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 group">

                                {/* Personnel Profile Info */}
                                <div className="flex items-center space-x-5">
                                    <div className="relative">
                                        <div
                                            className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg">
                                            {person.firstName?.charAt(0)}{person.lastName?.charAt(0)}
                                        </div>
                                        <div
                                            className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm ${
                                                person.matchPercentage >= 80 ? 'bg-emerald-500' : 'bg-amber-500'
                                            }`}>
                                            {person.matchPercentage}%
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition">{person.firstName} {person.lastName}</h3>
                                        <div className="flex items-center text-sm text-gray-400 font-medium mt-1">
                                            <Briefcase size={14} className="mr-1.5"/> {person.role}
                                        </div>
                                    </div>
                                </div>

                                {/* Match Progress Bar */}
                                <div className="flex-1 max-w-xs">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Match Strength</span>
                                        <span
                                            className="text-xs font-bold text-gray-700">{person.matchPercentage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-1000 ease-out ${
                                                person.matchPercentage >= 80 ? 'bg-emerald-500' :
                                                    person.matchPercentage >= 50 ? 'bg-indigo-500' : 'bg-amber-500'
                                            }`}
                                            style={{width: `${person.matchPercentage}%`}}
                                        ></div>
                                    </div>
                                </div>

                                {/* Experience & Action */}
                                <div className="flex items-center justify-between md:justify-end space-x-10">
                                    <div className="text-center">
                                        <div className="flex items-center text-gray-800 font-bold justify-center">
                                            <Star size={14} className="text-amber-400 mr-1" fill="currentColor"/>
                                            {person.yearsOfExperience}y
                                        </div>
                                        <p className="text-[10px] text-gray-400 uppercase font-bold mt-1">Experience</p>
                                    </div>
                                    <button
                                        className="bg-gray-900 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-indigo-600 transition shadow-md flex items-center group">
                                        Assign <ChevronRight size={16}
                                                             className="ml-1 group-hover:translate-x-1 transition"/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : selectedProjectId ? (
                <div
                    className="bg-amber-50 border border-amber-100 p-12 rounded-[40px] text-center max-w-2xl mx-auto shadow-sm">
                    <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="text-amber-600" size={40}/>
                    </div>
                    <h3 className="text-xl font-bold text-amber-900">No Strong Matches Found</h3>
                    <p className="text-amber-700 mt-2">Current personnel don't meet the minimum proficiency requirements
                        for this project.</p>
                    <button className="mt-8 text-sm font-bold text-amber-900 underline hover:text-amber-600">
                        Try lowering requirement thresholds
                    </button>
                </div>
            ) : (
                <div className="text-center py-32 border-2 border-dashed border-gray-200 rounded-[40px]">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Target className="text-gray-300" size={48}/>
                    </div>
                    <h3 className="text-xl font-bold text-gray-400">Ready to Match?</h3>
                    <p className="text-gray-400 mt-2">Select a project from the list above to find the best talent.</p>
                </div>
            )}
        </div>
    );
};

export default ProjectMatching;