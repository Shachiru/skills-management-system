import {useState, useEffect} from 'react';
import {PlusCircle, Loader2} from 'lucide-react';
import api from '../api/axios.js';

interface AssignSkillProps {
    personnelId: number;
    onComplete: () => void;
}

const AssignSkill = ({personnelId, onComplete}: AssignSkillProps) => {
    const [skills, setSkills] = useState([]);
    const [selectedSkillId, setSelectedSkillId] = useState('');
    const [level, setLevel] = useState('Beginner');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // සියලුම Skills පද්ධතියෙන් ගෙන්වා ගැනීම
        api.get('/skills').then(res => setSkills(res.data));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSkillId) return;

        setLoading(true);
        try {
            await api.post(`/personnel/${personnelId}/skills`, {
                skillId: selectedSkillId,
                proficiencyLevel: level
            });
            setSelectedSkillId('');
            onComplete(); // ලැයිස්තුව Refresh කිරීමට
        } catch (err) {
            console.error("Error assigning skill", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <select
                        className="flex-1 p-2 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-indigo-500"
                        value={selectedSkillId}
                        onChange={(e) => setSelectedSkillId(e.target.value)}
                        required
                    >
                        <option value="">Select a skill to add</option>
                        {skills.map((s: any) => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>

                    <select
                        className="p-2 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-indigo-500"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                    >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading || !selectedSkillId}
                    className="w-full bg-indigo-600 text-white py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-700 transition disabled:opacity-50 flex items-center justify-center"
                >
                    {loading ? <Loader2 size={14} className="animate-spin"/> : <><PlusCircle size={14}
                                                                                             className="mr-1"/> Add
                        Skill</>}
                </button>
            </div>
        </form>
    );
};

export default AssignSkill;