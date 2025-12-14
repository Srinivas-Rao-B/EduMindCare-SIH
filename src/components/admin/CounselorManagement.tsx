import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, UserCog } from 'lucide-react';
import { User } from '../../types';
import { faker } from '@faker-js/faker';

const CounselorManagement: React.FC = () => {
  const [counselors, setCounselors] = useState<User[]>([
    { id: 'counselor-1', name: 'Dr. Sarah Johnson', email: 'sarah.j@edumindcare.com', specialization: 'Cognitive Behavioral Therapy', role: 'counselor', username: 'counselor1', institutionCode: 'EDU001' },
    { id: 'counselor-2', name: 'Dr. Michael Chen', email: 'michael.c@edumindcare.com', specialization: 'Stress Management', role: 'counselor', username: 'counselor2', institutionCode: 'EDU001' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCounselor, setEditingCounselor] = useState<User | null>(null);

  const openModalForNew = () => {
    setEditingCounselor(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (counselor: User) => {
    setEditingCounselor(counselor);
    setIsModalOpen(true);
  };

  const handleSave = (counselorData: User) => {
    if (editingCounselor) {
      setCounselors(counselors.map(c => c.id === counselorData.id ? counselorData : c));
    } else {
      const newCounselor = { ...counselorData, id: `counselor-${Date.now()}`, role: 'counselor' as const };
      setCounselors([...counselors, newCounselor]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setCounselors(counselors.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Counselor Management</h2>
          <p className="text-gray-600">Add, edit, and manage counselor accounts</p>
        </div>
        <motion.button onClick={openModalForNew} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus className="w-4 h-4" /> <span>Add Counselor</span>
        </motion.button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specialization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {counselors.map(counselor => (
                <tr key={counselor.id}>
                  <td className="px-6 py-4 font-medium">{counselor.name}</td>
                  <td className="px-6 py-4">{counselor.email}</td>
                  <td className="px-6 py-4">{counselor.specialization}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button onClick={() => openModalForEdit(counselor)} className="text-blue-600 p-1"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(counselor.id)} className="text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && <CounselorModal counselor={editingCounselor} onSave={handleSave} onCancel={() => setIsModalOpen(false)} />}
    </div>
  );
};

const CounselorModal: React.FC<{ counselor: User | null, onSave: (data: User) => void, onCancel: () => void }> = ({ counselor, onSave, onCancel }) => {
  const [formData, setFormData] = useState<User>(counselor || {
    id: '', name: '', email: '', username: '', specialization: '', role: 'counselor', institutionCode: 'EDU001'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div className="bg-white rounded-xl p-6 w-full max-w-lg">
        <h3 className="text-xl font-semibold mb-4">{counselor ? 'Edit' : 'Add'} Counselor</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="w-full p-2 border rounded" />
          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required className="w-full p-2 border rounded" />
          <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required className="w-full p-2 border rounded" />
          <input name="specialization" value={formData.specialization} onChange={handleChange} placeholder="Specialization" required className="w-full p-2 border rounded" />
          <div className="flex space-x-3">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Save</button>
            <button type="button" onClick={onCancel} className="bg-gray-200 px-6 py-2 rounded-lg">Cancel</button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CounselorManagement;
