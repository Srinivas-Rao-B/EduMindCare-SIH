import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Users, TrendingUp, AlertTriangle, Activity } from 'lucide-react';

const AnalyticsDashboard: React.FC = () => {
  // Mock anonymized data
  const stressLevelData = [
    { level: 'Low (1-3)', count: 156, percentage: 45 },
    { level: 'Medium (4-6)', count: 142, percentage: 41 },
    { level: 'High (7-10)', count: 49, percentage: 14 }
  ];

  const academicPerformanceData = [
    { section: 'Section A', average: 87, attendance: 92 },
    { section: 'Section B', average: 82, attendance: 88 },
    { section: 'Section C', average: 85, attendance: 90 },
    { section: 'Section D', average: 80, attendance: 85 }
  ];

  const monthlyTrendsData = [
    { month: 'Aug', wellness: 7.2, academic: 82, sessions: 45 },
    { month: 'Sep', wellness: 7.0, academic: 84, sessions: 52 },
    { month: 'Oct', wellness: 6.8, academic: 86, sessions: 68 },
    { month: 'Nov', wellness: 7.1, academic: 88, sessions: 73 },
    { month: 'Dec', wellness: 7.4, academic: 85, sessions: 89 },
    { month: 'Jan', wellness: 7.6, academic: 87, sessions: 94 }
  ];

  const alertsData = [
    { type: 'High Stress', count: 23, color: '#EF4444' },
    { type: 'Low Attendance', count: 18, color: '#F59E0B' },
    { type: 'Academic Risk', count: 12, color: '#8B5CF6' },
    { type: 'Social Issues', count: 8, color: '#10B981' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <p className="text-gray-600">Anonymized insights and institutional trends</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Active Students', value: '347', change: '+12', icon: Users, color: 'blue' },
          { title: 'Avg Wellness Score', value: '7.4', change: '+0.2', icon: Activity, color: 'green' },
          { title: 'Active Alerts', value: '61', change: '-5', icon: AlertTriangle, color: 'red' },
          { title: 'Monthly Sessions', value: '94', change: '+18', icon: TrendingUp, color: 'purple' }
        ].map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 text-${metric.color}-500`} />
                <span className={`text-sm font-medium ${
                  metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
              <p className="text-sm text-gray-600">{metric.title}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Stress Level Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stressLevelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="level" />
                <YAxis />
                <Tooltip formatter={(value: number, name: string) => [value, name === 'count' ? 'Students' : name]} />
                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Alerts Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={alertsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {alertsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [value, 'Students']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {alertsData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs text-gray-600">{item.type}</span>
                <span className="text-xs font-medium text-gray-900">{item.count}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Performance by Section</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={academicPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="section" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="average" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="attendance" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Academic Average</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Attendance</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="wellness" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6' }} />
                <Line type="monotone" dataKey="academic" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981' }} />
                <Line type="monotone" dataKey="sessions" stroke="#F59E0B" strokeWidth={3} dot={{ fill: '#F59E0B' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Wellness</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Academic</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Sessions</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'Increase Counseling Capacity',
              description: '94 sessions this month shows high demand. Consider adding more counselors.',
              priority: 'High',
              color: 'bg-red-100 text-red-800'
            },
            {
              title: 'Target Section D Support',
              description: 'Section D shows lower academic performance and attendance rates.',
              priority: 'Medium',
              color: 'bg-yellow-100 text-yellow-800'
            },
            {
              title: 'Stress Management Workshop',
              description: '14% of students report high stress levels. Group workshops could help.',
              priority: 'Medium',
              color: 'bg-yellow-100 text-yellow-800'
            }
          ].map((recommendation, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{recommendation.title}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${recommendation.color}`}>
                  {recommendation.priority}
                </span>
              </div>
              <p className="text-sm text-gray-600">{recommendation.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;
