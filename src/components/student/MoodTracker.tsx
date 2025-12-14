import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Plus, Save } from 'lucide-react';
import { format } from 'date-fns';

interface MoodEntry {
  id: string;
  date: string;
  mood: string;
  stressLevel: number;
  energy: number;
  sleep: number;
  notes: string;
  physicalSymptoms: string[];
  triggers: string[];
}

const MoodTracker: React.FC = () => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    mood: '',
    stressLevel: 5,
    energy: 5,
    sleep: 5,
    notes: '',
    physicalSymptoms: [] as string[],
    triggers: [] as string[]
  });

  const moods = [
    { emoji: '😊', label: 'Happy', color: 'bg-green-100 border-green-300' },
    { emoji: '😐', label: 'Neutral', color: 'bg-gray-100 border-gray-300' },
    { emoji: '😢', label: 'Sad', color: 'bg-blue-100 border-blue-300' },
    { emoji: '😰', label: 'Anxious', color: 'bg-yellow-100 border-yellow-300' },
    { emoji: '😴', label: 'Tired', color: 'bg-purple-100 border-purple-300' },
    { emoji: '😡', label: 'Angry', color: 'bg-red-100 border-red-300' }
  ];

  const physicalSymptoms = [
    'Headache', 'Fatigue', 'Muscle tension', 'Stomach issues',
    'Sleep problems', 'Appetite changes', 'Heart palpitations'
  ];

  const commonTriggers = [
    'Exams', 'Assignments', 'Social situations', 'Family issues',
    'Financial stress', 'Health concerns', 'Relationship problems'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: format(new Date(), 'yyyy-MM-dd'),
      ...formData
    };
    setEntries(prev => [newEntry, ...prev]);
    setFormData({
      mood: '',
      stressLevel: 5,
      energy: 5,
      sleep: 5,
      notes: '',
      physicalSymptoms: [],
      triggers: []
    });
    setShowForm(false);
  };

  const toggleSymptom = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      physicalSymptoms: prev.physicalSymptoms.includes(symptom)
        ? prev.physicalSymptoms.filter(s => s !== symptom)
        : [...prev.physicalSymptoms, symptom]
    }));
  };

  const toggleTrigger = (trigger: string) => {
    setFormData(prev => ({
      ...prev,
      triggers: prev.triggers.includes(trigger)
        ? prev.triggers.filter(t => t !== trigger)
        : [...prev.triggers, trigger]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mood Tracker</h2>
          <p className="text-gray-600">Track your emotional wellbeing over time</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Entry</span>
        </motion.button>
      </div>

      {/* Mood Entry Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How are you feeling today?
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {moods.map((mood) => (
                  <motion.button
                    key={mood.label}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFormData(prev => ({ ...prev, mood: mood.label }))}
                    className={`p-4 rounded-lg border-2 text-center transition-all ${
                      formData.mood === mood.label
                        ? mood.color
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="text-2xl mb-1">{mood.emoji}</div>
                    <div className="text-xs font-medium">{mood.label}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stress Level: {formData.stressLevel}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.stressLevel}
                  onChange={(e) => setFormData(prev => ({ ...prev, stressLevel: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Energy Level: {formData.energy}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.energy}
                  onChange={(e) => setFormData(prev => ({ ...prev, energy: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sleep Quality: {formData.sleep}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.sleep}
                  onChange={(e) => setFormData(prev => ({ ...prev, sleep: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Physical Symptoms
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {physicalSymptoms.map((symptom) => (
                  <button
                    key={symptom}
                    type="button"
                    onClick={() => toggleSymptom(symptom)}
                    className={`p-2 text-xs rounded-lg border transition-colors ${
                      formData.physicalSymptoms.includes(symptom)
                        ? 'bg-blue-100 border-blue-300 text-blue-800'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Triggers
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {commonTriggers.map((trigger) => (
                  <button
                    key={trigger}
                    type="button"
                    onClick={() => toggleTrigger(trigger)}
                    className={`p-2 text-xs rounded-lg border transition-colors ${
                      formData.triggers.includes(trigger)
                        ? 'bg-red-100 border-red-300 text-red-800'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {trigger}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any additional thoughts or details..."
              />
            </div>

            <div className="flex space-x-3">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Entry</span>
              </motion.button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Mood History */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Entries</h3>
        {entries.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No mood entries yet. Start tracking your mood!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {moods.find(m => m.label === entry.mood)?.emoji || '😐'}
                    </span>
                    <div>
                      <h4 className="font-medium text-gray-900">{entry.mood}</h4>
                      <p className="text-sm text-gray-500">{entry.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      Stress: {entry.stressLevel}/10
                    </div>
                  </div>
                </div>
                
                {entry.notes && (
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg mb-3">
                    {entry.notes}
                  </p>
                )}
                
                {(entry.physicalSymptoms.length > 0 || entry.triggers.length > 0) && (
                  <div className="flex flex-wrap gap-2">
                    {entry.physicalSymptoms.map((symptom) => (
                      <span
                        key={symptom}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {symptom}
                      </span>
                    ))}
                    {entry.triggers.map((trigger) => (
                      <span
                        key={trigger}
                        className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full"
                      >
                        {trigger}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodTracker;
