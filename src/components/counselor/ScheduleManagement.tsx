import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Plus, MessageSquare, Phone, Trash2 } from 'lucide-react';
import { format, addDays } from 'date-fns';

interface NewSlot {
  date: string;
  time: string;
  type: 'chat' | 'call';
}

interface AvailableSlot {
  id: string;
  date: string;
  time: string;
  type: 'chat' | 'call';
}

const ScheduleManagement: React.FC = () => {
  const [slots, setSlots] = useState<AvailableSlot[]>([
    { id: 's1', date: format(new Date(), 'yyyy-MM-dd'), time: '09:00', type: 'chat' },
    { id: 's2', date: format(addDays(new Date(), 1), 'yyyy-MM-dd'), time: '14:00', type: 'call' },
  ]);
  const [newSlot, setNewSlot] = useState<NewSlot>({
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '10:00',
    type: 'chat',
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const slotToAdd: AvailableSlot = {
      id: `slot-${Date.now()}`,
      ...newSlot,
    };
    setSlots(prev => [...prev, slotToAdd].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    setShowAddForm(false);
  };

  const handleDeleteSlot = (id: string) => {
    setSlots(prev => prev.filter(slot => slot.id !== id));
  };

  const getTypeIcon = (type: 'chat' | 'call') => {
    switch (type) {
      case 'chat': return <MessageSquare className="w-4 h-4 text-blue-600" />;
      case 'call': return <Phone className="w-4 h-4 text-green-600" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Schedule Management</h2>
          <p className="text-gray-600">Manage your availability for student bookings</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Slot</span>
        </motion.button>
      </div>

      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Availability Slot</h3>
          <form onSubmit={handleAddSlot} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={newSlot.date}
                onChange={(e) => setNewSlot(prev => ({ ...prev, date: e.target.value }))}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <input
                type="time"
                value={newSlot.time}
                onChange={(e) => setNewSlot(prev => ({ ...prev, time: e.target.value }))}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={newSlot.type}
                onChange={(e) => setNewSlot(prev => ({ ...prev, type: e.target.value as NewSlot['type'] }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="chat">Chat Session</option>
                <option value="call">Call Session</option>
              </select>
            </div>
            <div className="md:col-span-3 flex space-x-3">
              <motion.button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Create Slot
              </motion.button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Available Slots</h3>
        {slots.length === 0 ? (
          <p className="text-gray-500 text-center py-8">You have no available slots. Add some to allow bookings.</p>
        ) : (
          <div className="space-y-3">
            {slots.map(slot => (
              <div key={slot.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getTypeIcon(slot.type)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{format(new Date(slot.date), 'EEEE, MMMM d, yyyy')}</p>
                    <p className="text-sm text-gray-600">{slot.time} - <span className="capitalize">{slot.type}</span></p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDeleteSlot(slot.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleManagement;
