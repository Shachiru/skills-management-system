import {useEffect, useState} from 'react';
import {Plus, Calendar, ClipboardList, Loader2, Trash2, X, ListChecks, LayoutGrid, CheckCircle2} from 'lucide-react';
import api from '../api/axios.js';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        status: 'Planning'
    });

    const [selectedSkillId, setSelectedSkillId] = useState('');
    const [minProficiency, setMinProficiency] = useState('Beginner');

    const fetchProjects = async () => {
        try {
            const res = await api.get('/projects');
            setProjects(res.data);
        } catch (err) {
            console.error("Fetch projects error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
        api.get('/skills').then(res => setSkills(res.data)).catch(err => console.log(err));
    }, []);

    // 1. Create new project
    const handleSubmitProject = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // Client-side validation
            if (formData.name.trim().length < 3) {
                alert("Project name must be at least 3 characters long");
                setSubmitting(false);
                return;
            }

            if (formData.description.trim().length < 10) {
                alert("Description must be at least 10 characters long");
                setSubmitting(false);
                return;
            }

            // Validate dates
            const startDate = new Date(formData.startDate);
            const endDate = new Date(formData.endDate);

            if (isNaN(startDate.getTime())) {
                alert("Invalid start date");
                setSubmitting(false);
                return;
            }

            if (isNaN(endDate.getTime())) {
                alert("Invalid end date");
                setSubmitting(false);
                return;
            }

            if (endDate <= startDate) {
                alert("End date must be after start date");
                setSubmitting(false);
                return;
            }

            // Prepare data for backend
            const projectData = {
                name: formData.name.trim(),
                description: formData.description.trim(),
                startDate: formData.startDate,
                endDate: formData.endDate,
                status: formData.status
            };

            console.log("Sending project data:", projectData);

            const response = await api.post('/projects', projectData);
            console.log("Project created:", response.data);

            setFormData({name: '', description: '', startDate: '', endDate: '', status: 'Planning'});
            fetchProjects();
            alert('Project created successfully!');
        } catch (err: any) {
            console.error("Project creation error:", err);
            console.error("Error response:", err.response?.data);

            if (err.response?.data?.errors) {
                // Show validation errors from Zod
                const errors = err.response.data.errors.map((e: any) => `${e.field}: ${e.message}`).join('\n');
                alert(`Validation failed:\n${errors}`);
            } else if (err.response?.data?.message) {
                alert(`Error: ${err.response.data.message}`);
            } else if (err.response?.status === 401 || err.response?.status === 403) {
                alert("Authentication failed. Please log in again.");
            } else {
                alert("Failed to create project. Please check your input and try again.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteProject = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;
        try {
            await api.delete(`/projects/${id}`);
            fetchProjects();
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddRequirement = async (projectId: number) => {
        if (!selectedSkillId) return;
        try {
            await api.post(`/projects/${projectId}/requirements`, {
                skillId: parseInt(selectedSkillId),
                minProficiency
            });
            setSelectedSkillId('');
            fetchProjects();
        } catch (err) {
            alert("Error adding requirement");
        }
    };

    const handleDeleteRequirement = async (projectId: number, reqId: number) => {
        try {
            await api.delete(`/projects/${projectId}/requirements/${reqId}`);
            fetchProjects();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 lg:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Project Hub</h1>
                <p className="text-gray-500">Register new projects and define their technical requirements.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                <div className="lg:col-span-4">
                    <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm sticky top-8">
                        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                            <Plus className="mr-2 text-indigo-600" size={20}/> Create New Project
                        </h2>

                        <form onSubmit={handleSubmitProject} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Project
                                    Name</label>
                                <input
                                    type="text"
                                    required
                                    minLength={3}
                                    placeholder="e.g. Cloud Migration 2026"
                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>

                            <div>
                                <label
                                    className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Description</label>
                                <textarea
                                    required
                                    minLength={10}
                                    placeholder="Briefly describe the project goals..."
                                    rows={3}
                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                />
                                <p className="text-xs text-gray-400 mt-1 ml-1">{formData.description.length}/10 characters minimum</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Start
                                        Date</label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">End
                                        Date</label>
                                    <input
                                        type="date"
                                        required
                                        min={formData.startDate}
                                        className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Initial
                                    Status</label>
                                <select
                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none"
                                    value={formData.status}
                                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                                >
                                    <option value="Planning">Planning</option>
                                    <option value="Active">Active</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition flex items-center justify-center shadow-lg shadow-indigo-100 disabled:bg-gray-300"
                            >
                                {submitting ? <Loader2 className="animate-spin mr-2" size={20}/> :
                                    <CheckCircle2 className="mr-2" size={20}/>}
                                {submitting ? 'Creating...' : 'Launch Project'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-8 space-y-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="animate-spin text-indigo-600 mb-4" size={40}/>
                            <p className="text-gray-400 font-medium">Loading projects...</p>
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-[40px]">
                            <LayoutGrid className="mx-auto text-gray-300 mb-4" size={50}/>
                            <p className="text-gray-400">No projects found. Start by creating one!</p>
                        </div>
                    ) : (
                        projects.map((project: any) => (
                            <div key={project.id}
                                 className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:border-indigo-200 transition-all overflow-hidden group">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span
                                                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                                    project.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                {project.status}
                                            </span>
                                            <h3 className="text-xl font-bold text-gray-900 mt-2">{project.name}</h3>
                                            <p className="text-gray-500 text-sm mt-1">{project.description}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteProject(project.id)}
                                            className="text-gray-300 hover:text-red-500 transition p-2"
                                        >
                                            <Trash2 size={18}/>
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-6 text-xs text-gray-400 font-medium mb-6">
                                        <div className="flex items-center"><Calendar size={14}
                                                                                     className="mr-1.5 text-indigo-500"/> {project.startDate} - {project.endDate}
                                        </div>
                                        <div className="flex items-center"><ClipboardList size={14}
                                                                                          className="mr-1.5 text-indigo-500"/> {project.requirements?.length || 0} Skills
                                            Required
                                        </div>
                                    </div>

                                    {/* --- REQUIREMENTS SECTION INSIDE EACH CARD --- */}
                                    <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-50">
                                        <div
                                            className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                                            <ListChecks size={16} className="mr-2 text-indigo-600"/> Technical
                                            Requirements
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-5">
                                            {project.requirements?.length > 0 ? project.requirements.map((req: any) => (
                                                <div key={req.id}
                                                     className="bg-white px-3 py-1.5 rounded-xl border border-gray-200 flex items-center shadow-sm text-xs">
                                                    <span className="font-bold text-gray-700">{req.skill?.name}</span>
                                                    <span
                                                        className="ml-2 bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded font-bold uppercase text-[9px]">
                                                        {req.minProficiency}+
                                                    </span>
                                                    <button onClick={() => handleDeleteRequirement(project.id, req.id)}
                                                            className="ml-2 text-gray-300 hover:text-red-500">
                                                        <X size={12}/>
                                                    </button>
                                                </div>
                                            )) : <p className="text-[11px] text-gray-400 italic">No specific skills
                                                required yet.</p>}
                                        </div>

                                        {/* Add Requirement Form Inline */}
                                        <div className="flex gap-2">
                                            <select
                                                className="flex-1 p-2 text-xs bg-white border border-gray-200 rounded-lg outline-none"
                                                value={selectedSkillId}
                                                onChange={(e) => setSelectedSkillId(e.target.value)}
                                            >
                                                <option value="">Select a Skill</option>
                                                {skills.map((s: any) => <option key={s.id}
                                                                                value={s.id}>{s.name}</option>)}
                                            </select>
                                            <select
                                                className="p-2 text-xs bg-white border border-gray-200 rounded-lg outline-none"
                                                value={minProficiency}
                                                onChange={(e) => setMinProficiency(e.target.value)}
                                            >
                                                <option value="Beginner">Beginner</option>
                                                <option value="Intermediate">Intermediate</option>
                                                <option value="Advanced">Advanced</option>
                                                <option value="Expert">Expert</option>
                                            </select>
                                            <button
                                                onClick={() => handleAddRequirement(project.id)}
                                                className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition"
                                            >
                                                <Plus size={16}/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Projects;