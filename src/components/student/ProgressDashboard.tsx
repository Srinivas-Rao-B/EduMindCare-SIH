import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Calendar, Award, Target, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const ProgressDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'semester'>('month');

  // Mock data for visualizations
  const moodData = [
    { date: '2025-01-01', mood: 7, stress: 4, energy: 6 },
    { date: '2025-01-02', mood: 6, stress: 5, energy: 5 },
    { date: '2025-01-03', mood: 8, stress: 3, energy: 7 },
    { date: '2025-01-04', mood: 5, stress: 7, energy: 4 },
    { date: '2025-01-05', mood: 7, stress: 4, energy: 6 },
    { date: '2025-01-06', mood: 9, stress: 2, energy: 8 },
    { date: '2025-01-07', mood: 6, stress: 5, energy: 5 }
  ];

  const academicData = [
    { subject: 'Mathematics', marks: 85, attendance: 92 },
    { subject: 'Physics', marks: 78, attendance: 88 },
    { subject: 'Chemistry', marks: 92, attendance: 95 },
    { subject: 'English', marks: 88, attendance: 90 },
    { subject: 'Computer Science', marks: 94, attendance: 96 }
  ];

  const counselingData = [
    { month: 'Nov', sessions: 2, improvement: 15 },
    { month: 'Dec', sessions: 3, improvement: 25 },
    { month: 'Jan', sessions: 1, improvement: 35 }
  ];

  const wellnessDistribution = [
    { name: 'Sleep Quality', value: 75, color: '#8B5CF6' },
    { name: 'Stress Management', value: 60, color: '#10B981' },
    { name: 'Social Connection', value: 80, color: '#F59E0B' },
    { name: 'Academic Balance', value: 70, color: '#EF4444' }
  ];

  const getCurrentWeekComparison = () => {
    const currentWeek = { mood: 7.2, stress: 4.1, academic: 87.5 };
    const lastWeek = { mood: 6.8, stress: 5.2, academic: 85.2 };
    
    return {
      mood: { current: currentWeek.mood, change: currentWeek.mood - lastWeek.mood },
      stress: { current: currentWeek.stress, change: currentWeek.stress - lastWeek.stress },
      academic: { current: currentWeek.academic, change: currentWeek.academic - lastWeek.academic }
    };
  };

  const comparison = getCurrentWeekComparison();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Progress Dashboard</h2>
          <p className="text-gray-600">Track your wellness journey and academic growth</p>
        </div>
        <div className="flex space-x-2">
          {(['week', 'month', 'semester'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className={`flex items-center text-sm ${
              comparison.mood.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {comparison.mood.change >= 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {Math.abs(comparison.mood.change).toFixed(1)}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{comparison.mood.current}/10</h3>
          <p className="text-sm text-gray-600">Average Mood Score</p>
          <p className="text-xs text-gray-500 mt-1">vs last week</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div className={`flex items-center text-sm ${
              comparison.stress.change <= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {comparison.stress.change <= 0 ? (
                <TrendingDown className="w-4 h-4 mr-1" />
              ) : (
                <TrendingUp className="w-4 h-4 mr-1" />
              )}
              {Math.abs(comparison.stress.change).toFixed(1)}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{comparison.stress.current}/10</h3>
          <p className="text-sm text-gray-600">Average Stress Level</p>
          <p className="text-xs text-gray-500 mt-1">vs last week</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div className={`flex items-center text-sm ${
              comparison.academic.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {comparison.academic.change >= 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {Math.abs(comparison.academic.change).toFixed(1)}%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{comparison.academic.current}%</h3>
          <p className="text-sm text-gray-600">Academic Average</p>
          <p className="text-xs text-gray-500 mt-1">vs last week</p>
        </motion.div>
      </div>

      {/* Mood Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Mood & Wellness Trends</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={moodData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
              <YAxis domain={[0, 10]} />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value: number, name: string) => [value, name.charAt(0).toUpperCase() + name.slice(1)]}
              />
              <Line type="monotone" dataKey="mood" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981' }} />
              <Line type="monotone" dataKey="stress" stroke="#EF4444" strokeWidth={3} dot={{ fill: '#EF4444' }} />
              <Line type="monotone" dataKey="energy" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: '#8B5CF6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Academic Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={academicData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" angle={-45} textAnchor="end" height={60} />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="marks" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="attendance" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Marks</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Attendance</span>
            </div>
          </div>
        </motion.div>

        {/* Wellness Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Wellness Areas</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wellnessDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {wellnessDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value}%`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {wellnessDistribution.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs text-gray-600">{item.name}</span>
                <span className="text-xs font-medium text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Counseling Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Counseling Journey</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
            <p className="text-sm text-gray-600">Total Sessions</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">35%</div>
            <p className="text-sm text-gray-600">Improvement Score</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">85%</div>
            <p className="text-sm text-gray-600">Goal Achievement</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-3">Recent Achievements</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <Award className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-800">Completed stress management techniques training</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-blue-800">Achieved 7-day mood tracking consistency</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-purple-800">Improved academic performance by 5%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressDashboard;
