import {useEffect, useState} from 'react';
import {Plus, Award, Trash2, Loader2} from 'lucide-react';
import api from '../api/axios.js';

interface Skill {
    id: number;
    name: string;
    category: string;
}

const Skills = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [newSkill, setNewSkill] = useState({name: '', category: 'Technical'});
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);

    const fetchSkills = async () => {
        try {
            const res = await api.get('/skills');
            setSkills(res.data);
        } catch (err) {
            console.error("Error fetching skills", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleAddSkill = async (e: React.FormEvent) => {
        e.preventDefault();
        setAdding(true);
        try {
            await api.post('/skills', newSkill);
            setNewSkill({name: '', category: 'Technical'});
            fetchSkills(); // ලැයිස්තුව Refresh කිරීම
        } catch (err) {
            console.error("Error adding skill", err);
        } finally {
            setAdding(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this skill?")) return;

        try {
            await api.delete(`/skills/${id}`);
            setSkills(skills.filter(skill => skill.id !== id));
        } catch (err) {
            console.error("Error deleting skill", err);
            alert("Cannot delete skill. It might be assigned to a personnel.");
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Skills Catalog</h1>
                <p className="text-gray-500">Manage the global library of skills available in the organization.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add New Skill Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-8">
                        <h2 className="font-bold text-gray-800 mb-4 flex items-center">
                            <Plus className="mr-2 text-indigo-600" size={18}/> Add New Skill
                        </h2>
                        <form onSubmit={handleAddSkill} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Skill
                                    Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="e.g. React, Docker"
                                    value={newSkill.name}
                                    onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
                                <select
                                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={newSkill.category}
                                    onChange={(e) => setNewSkill({...newSkill, category: e.target.value})}
                                >
                                    <option value="Technical">Technical</option>
                                    <option value="Soft Skill">Soft Skill</option>
                                    <option value="Management">Management</option>
                                    <option value="Language">Language</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                disabled={adding}
                                className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center"
                            >
                                {adding ? <Loader2 className="animate-spin" size={18}/> : 'Save Skill'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Skills List Table */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Skill Name</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Category</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-10 text-center text-gray-400">Loading
                                        catalog...
                                    </td>
                                </tr>
                            ) : skills.map((skill) => (
                                <tr key={skill.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <Award className="text-indigo-500 mr-3" size={18}/>
                                            <span className="font-medium text-gray-800">{skill.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{skill.category}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleDelete(skill.id)}
                                                className="text-red-400 hover:text-red-600 transition">
                                            <Trash2 size={18}/>
                                        </button>
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

export default Skills;