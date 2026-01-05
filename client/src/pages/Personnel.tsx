import {useEffect, useState} from 'react';
import {Filter, Briefcase, Loader2, Trash2, Edit, X, Mail} from 'lucide-react';
import api from '../api/axios.js';
import AssignSkill from '../components/AssignSkill';

interface PersonnelMember {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    experienceLevel: 'Junior' | 'Mid-Level' | 'Senior';
    isAvailable: boolean;
    skills: any[];
}

const Personnel = () => {
    const [personnel, setPersonnel] = useState<PersonnelMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingMember, setEditingMember] = useState<PersonnelMember | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        experienceLevel: 'Junior' as 'Junior' | 'Mid-Level' | 'Senior',
        isAvailable: true
    });

    // Filters State
    const [role, setRole] = useState('');

    const fetchPersonnel = async () => {
        setLoading(true);
        try {
            const response = await api.get('/personnel', {
                params: {role: role || undefined}
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
    }, []);

    const handleOpenModal = (member: PersonnelMember | null = null) => {
        if (member) {
            setEditingMember(member);
            setFormData({
                firstName: member.firstName,
                lastName: member.lastName,
                email: member.email,
                role: member.role,
                experienceLevel: member.experienceLevel,
                isAvailable: member.isAvailable
            });
        } else {
            setEditingMember(null);
            setFormData({firstName: '', lastName: '', email: '', role: '', experienceLevel: 'Junior', isAvailable: true});
        }
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingMember) {
                await api.put(`/personnel/${editingMember.id}`, formData);
            } else {
                await api.post('/personnel', formData);
            }
            setShowModal(false);
            fetchPersonnel();
        } catch (error) {
            alert("Error saving personnel data");
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this person?")) return;
        try {
            await api.delete(`/personnel/${id}`);
            fetchPersonnel();
        } catch (error) {
            alert("Error deleting record");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Personnel Directory</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage your team members and their skill sets.</p>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 flex items-center">
                        <Plus className="w-4 h-4 mr-2"/> Add Member
                    </button>
                </div>

                {/* Filter Bar */}
                <div
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-wrap gap-4 items-end">
                    <div className="flex-1 min-w-50">
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Search Role</label>
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                            <input type="text" placeholder="e.g. Developer"
                                   className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                   value={role} onChange={(e) => setRole(e.target.value)}/>
                        </div>
                    </div>
                    <button onClick={fetchPersonnel}
                            className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-gray-800 transition flex items-center">
                        <Filter className="w-4 h-4 mr-2"/> Apply
                    </button>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex justify-center py-20 text-indigo-600"><Loader2
                        className="animate-spin h-10 w-10"/></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {personnel.map((member) => (
                            <div key={member.id}
                                 className="bg-white rounded-3xl border border-gray-100 p-6 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <div
                                        className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-bold text-xl uppercase">
                                        {member.firstName?.charAt(0)}{member.lastName?.charAt(0)}
                                    </div>
                                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition">
                                        <button onClick={() => handleOpenModal(member)}
                                                className="p-2 text-gray-400 hover:text-indigo-600"><Edit size={16}/>
                                        </button>
                                        <button onClick={() => handleDelete(member.id)}
                                                className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={16}/>
                                        </button>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-gray-900">{member.firstName} {member.lastName}</h3>
                                    <p className="text-sm text-gray-400 flex items-center mt-1"><Mail size={12}
                                                                                                      className="mr-1"/> {member.email}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-50 p-3 rounded-2xl">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Role</p>
                                        <p className="text-sm font-bold text-gray-700 truncate">{member.role}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-2xl">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Level</p>
                                        <p className="text-sm font-bold text-gray-700">{member.experienceLevel}</p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Skills</p>
                                    <div className="flex flex-wrap gap-1">
                                        {member.skills?.length > 0 ? member.skills.map((s: any) => (
                                            <span key={s.id}
                                                  className="px-2 py-1 bg-white border border-gray-100 text-gray-600 rounded-lg text-[10px] font-medium shadow-sm">
                                                {s.name} <span
                                                className="text-indigo-500 ml-1">{s.PersonnelSkill.proficiencyLevel[0]}</span>
                                            </span>
                                        )) : <span
                                            className="text-[10px] text-gray-300 italic">No skills assigned</span>}
                                    </div>
                                </div>

                                <AssignSkill personnelId={member.id} onComplete={fetchPersonnel}/>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal Form */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-4xl w-full max-w-md p-8 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">{editingMember ? 'Edit Member' : 'New Member'}</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X/></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="First Name" required
                                       className="w-full p-3 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-500"
                                       value={formData.firstName}
                                       onChange={(e) => setFormData({...formData, firstName: e.target.value})}/>
                                <input type="text" placeholder="Last Name" required
                                       className="w-full p-3 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-500"
                                       value={formData.lastName}
                                       onChange={(e) => setFormData({...formData, lastName: e.target.value})}/>
                            </div>
                            <input type="email" placeholder="Email Address" required
                                   className="w-full p-3 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-500"
                                   value={formData.email}
                                   onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                            <input type="text" placeholder="Role (e.g. Backend Dev)" required
                                   className="w-full p-3 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-500"
                                   value={formData.role}
                                   onChange={(e) => setFormData({...formData, role: e.target.value})}/>
                            <select
                                   className="w-full p-3 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-500"
                                   value={formData.experienceLevel}
                                   onChange={(e) => setFormData({...formData, experienceLevel: e.target.value as 'Junior' | 'Mid-Level' | 'Senior'})}
                                   required>
                                <option value="Junior">Junior</option>
                                <option value="Mid-Level">Mid-Level</option>
                                <option value="Senior">Senior</option>
                            </select>
                            <div className="flex items-center space-x-2 p-2">
                                <input type="checkbox" id="avail" checked={formData.isAvailable}
                                       onChange={(e) => setFormData({...formData, isAvailable: e.target.checked})}/>
                                <label htmlFor="avail" className="text-sm font-medium text-gray-700">Available for
                                    Projects</label>
                            </div>
                            <button type="submit"
                                    className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                                {editingMember ? 'Update Profile' : 'Create Member'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Personnel;

const Plus = ({className, size = 18}: { className?: string; size?: number }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);