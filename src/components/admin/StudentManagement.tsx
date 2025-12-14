import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { faker } from '@faker-js/faker';
import { User } from '../../types';

const subjects = ['Math', 'Physics', 'Chemistry', 'English', 'Computer Science'];

const generateMockStudent = (): User => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  usn: `1CS${faker.number.int({ min: 20, max: 22 })}${faker.string.alpha(2).toUpperCase()}${faker.number.int({ min: 10, max: 99 })}`,
  section: faker.helpers.arrayElement(['A', 'B', 'C']),
  branch: faker.helpers.arrayElement(['CSE', 'ISE', 'ECE', 'MECH']),
  semester: faker.number.int({ min: 1, max: 8 }),
  email: faker.internet.email(),
  username: faker.internet.username(),
  role: 'student',
  institutionCode: 'EDU001',
  profile: {
    internalMarks: subjects.reduce((acc, s) => ({ ...acc, [s]: faker.number.int({ min: 60, max: 100 }) }), {}),
    quizMarks: subjects.reduce((acc, s) => ({ ...acc, [s]: faker.number.int({ min: 60, max: 100 }) }), {}),
    attendance: subjects.reduce((acc, s) => ({ ...acc, [s]: faker.number.int({ min: 70, max: 100 }) }), {}),
    stressLevel: 0, moodHistory: [], counselingSessions: []
  }
});

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<User[]>([generateMockStudent()]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const openModal = (mode: 'add' | 'edit' | 'view', student: User | null = null) => {
    setModalMode(mode);
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleSave = (studentData: User) => {
    if (modalMode === 'edit' && selectedStudent) {
      setStudents(students.map(s => s.id === studentData.id ? studentData : s));
    } else {
      setStudents([studentData, ...students]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.usn?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateAverage = (data: Record<string, number> | undefined) => {
    if (!data) return 'N/A';
    const values = Object.values(data);
    if (values.length === 0) return 'N/A';
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Student Management</h2>
        <motion.button onClick={() => openModal('add')} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus className="w-4 h-4" /> <span>Add Student</span>
        </motion.button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" /><input type="text" placeholder="Search students by name or USN..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" /></div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden"><div className="overflow-x-auto"><table className="w-full">
        <thead className="bg-gray-50"><tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Academic Avg</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance Avg</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
        </tr></thead>
        <tbody className="bg-white divide-y divide-gray-200">{filteredStudents.map((student) => (
          <tr key={student.id} className="hover:bg-gray-50">
            <td className="px-6 py-4"><div className="flex items-center"><div className="ml-4"><div className="text-sm font-medium text-gray-900">{student.name}</div><div className="text-sm text-gray-500">{student.usn}</div></div></div></td>
            <td className="px-6 py-4 text-sm text-gray-900">{calculateAverage(student.profile?.internalMarks)}%</td>
            <td className="px-6 py-4 text-sm text-gray-900">{calculateAverage(student.profile?.attendance)}%</td>
            <td className="px-6 py-4 space-x-2">
              <button onClick={() => openModal('view', student)} className="text-gray-500 p-1"><Eye className="w-4 h-4" /></button>
              <button onClick={() => openModal('edit', student)} className="text-blue-600 p-1"><Edit className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(student.id)} className="text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
            </td>
          </tr>
        ))}</tbody>
      </table></div></div>

      {isModalOpen && <StudentModal mode={modalMode} student={selectedStudent} onSave={handleSave} onCancel={() => setIsModalOpen(false)} />}
    </div>
  );
};

const StudentModal: React.FC<{ mode: 'add' | 'edit' | 'view', student: User | null, onSave: (data: User) => void, onCancel: () => void }> = ({ mode, student, onSave, onCancel }) => {
  const [formData, setFormData] = useState<User>(student || generateMockStudent());
  const [password, setPassword] = useState('');
  const isViewMode = mode === 'view';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleScoreChange = (type: 'internalMarks' | 'attendance', subject: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      profile: {
        ...prev.profile!,
        [type]: {
          ...prev.profile![type],
          [subject]: parseInt(value) || 0
        }
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-6 capitalize">{mode} Student</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required readOnly={isViewMode} className="w-full p-2 border rounded bg-gray-50 read-only:bg-gray-100" />
            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required readOnly={isViewMode} className="w-full p-2 border rounded bg-gray-50 read-only:bg-gray-100" />
            <input name="usn" value={formData.usn} onChange={handleChange} placeholder="USN" required readOnly={isViewMode} className="w-full p-2 border rounded bg-gray-50 read-only:bg-gray-100" />
            <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required readOnly={isViewMode} className="w-full p-2 border rounded bg-gray-50 read-only:bg-gray-100" />
            <select name="branch" value={formData.branch} onChange={handleChange} required disabled={isViewMode} className="w-full p-2 border rounded bg-gray-50 disabled:bg-gray-100"><option value="">Select Branch</option>{['CSE', 'ISE', 'ECE', 'MECH'].map(b => <option key={b} value={b}>{b}</option>)}</select>
            <select name="semester" value={formData.semester} onChange={handleChange} required disabled={isViewMode} className="w-full p-2 border rounded bg-gray-50 disabled:bg-gray-100"><option value="">Select Semester</option>{[...Array(8)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}</select>
            <select name="section" value={formData.section} onChange={handleChange} required disabled={isViewMode} className="w-full p-2 border rounded bg-gray-50 disabled:bg-gray-100"><option value="">Select Section</option>{['A', 'B', 'C'].map(s => <option key={s} value={s}>{s}</option>)}</select>
            {mode !== 'view' && <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={mode === 'add' ? "Initial Password" : "New Password (optional)"} className="w-full p-2 border rounded bg-gray-50" />}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div><h4 className="font-medium mb-2">Internal Marks (%)</h4><div className="space-y-2">{subjects.map(s => (<div key={s} className="flex items-center justify-between"><label className="text-sm">{s}</label><input type="number" min="0" max="100" value={formData.profile?.internalMarks[s] || ''} onChange={e => handleScoreChange('internalMarks', s, e.target.value)} readOnly={isViewMode} className="w-20 p-1 border rounded bg-gray-50 read-only:bg-gray-100" /></div>))}</div></div>
            <div><h4 className="font-medium mb-2">Attendance (%)</h4><div className="space-y-2">{subjects.map(s => (<div key={s} className="flex items-center justify-between"><label className="text-sm">{s}</label><input type="number" min="0" max="100" value={formData.profile?.attendance[s] || ''} onChange={e => handleScoreChange('attendance', s, e.target.value)} readOnly={isViewMode} className="w-20 p-1 border rounded bg-gray-50 read-only:bg-gray-100" /></div>))}</div></div>
          </div>

          <div className="flex space-x-3 mt-6">
            {mode !== 'view' && <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Save</button>}
            <button type="button" onClick={onCancel} className="bg-gray-200 px-6 py-2 rounded-lg">{mode === 'view' ? 'Close' : 'Cancel'}</button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default StudentManagement;
