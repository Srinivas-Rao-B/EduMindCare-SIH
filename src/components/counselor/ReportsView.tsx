import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Users, TrendingUp, Star, Clock } from 'lucide-react';

const ReportsView: React.FC = () => {
  const sessionData = [
    { month: 'Aug', count: 12 }, { month: 'Sep', count: 15 },
    { month: 'Oct', count: 22 }, { month: 'Nov', count: 25 },
    { month: 'Dec', count: 31 }, { month: 'Jan', count: 28 }
  ];

  const ratingTrend = [
    { month: 'Aug', rating: 4.5 }, { month: 'Sep', rating: 4.6 },
    { month: 'Oct', rating: 4.7 }, { month: 'Nov', rating: 4.8 },
    { month: 'Dec', rating: 4.7 }, { month: 'Jan', rating: 4.9 }
  ];

  const sessionTypeData = [
    { type: 'Chat', value: 75, color: '#3B82F6' },
    { type: 'Call', value: 25, color: '#10B981' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Counselor Reports</h2>
        <p className="text-gray-600">An overview of your counseling activities and impact</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Sessions (6 mo)', value: '133', icon: Users, color: 'blue' },
          { title: 'Avg Rating', value: '4.7 / 5', icon: Star, color: 'yellow' },
          { title: 'Busiest Month', value: 'December', icon: TrendingUp, color: 'green' },
          { title: 'Avg Session Length', value: '45 min', icon: Clock, color: 'purple' }
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
              <Icon className={`w-8 h-8 text-${metric.color}-500 mb-4`} />
              <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
              <p className="text-sm text-gray-600">{metric.title}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Session Volume</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sessionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Type Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sessionTypeData} dataKey="value" nameKey="type" cx="50%" cy="50%" outerRadius={80} label>
                  {sessionTypeData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(value: number) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Feedback Rating Over Time</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ratingTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[4, 5]} />
              <Tooltip />
              <Line type="monotone" dataKey="rating" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default ReportsView;
