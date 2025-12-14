import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Play, Eye, User, MessageSquare, Phone } from 'lucide-react';

interface Session {
  id: string;
  anonymousId: string;
  studentId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  type: 'chat' | 'call';
}

interface SessionManagementProps {
  onStartSession: (sessionId: string, studentId: string) => void;
}

const SessionManagement: React.FC<SessionManagementProps> = ({ onStartSession }) => {
  const [sessions] = useState<Session[]>([
    {
      id: '1',
      anonymousId: 'ANON-A1B2C3',
      studentId: '3',
      date: '2025-01-21',
      time: '10:00 AM',
      status: 'scheduled',
      type: 'chat'
    },
    {
      id: '2',
      anonymousId: 'ANON-D4E5F6',
      studentId: '4',
      date: '2025-01-21',
      time: '2:00 PM',
      status: 'scheduled',
      type: 'call'
    },
    {
      id: '3',
      anonymousId: 'ANON-G7H8I9',
      studentId: '5',
      date: '2025-01-20',
      time: '11:00 AM',
      status: 'completed',
      type: 'chat'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: 'chat' | 'call') => {
    switch (type) {
      case 'chat': return <MessageSquare className="w-4 h-4" />;
      case 'call': return <Phone className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Session Management</h2>
        <p className="text-gray-600">Manage your counseling sessions</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {sessions.filter(s => s.status === 'scheduled').map((session) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{session.anonymousId}</h4>
                    <p className="text-sm text-gray-600">
                      {session.date} at {session.time}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(session.status)}`}>
                        {session.status}
                      </span>
                      <span className="flex items-center space-x-1 text-xs text-gray-500">
                        {getTypeIcon(session.type)}
                        <span className="capitalize">{session.type}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onStartSession(session.id, session.studentId)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>Start</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Sessions</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {sessions.filter(s => s.status === 'completed').map((session) => (
            <div key={session.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{session.anonymousId}</h4>
                    <p className="text-sm text-gray-600">
                      {session.date} at {session.time}
                    </p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${getStatusColor(session.status)}`}>
                      {session.status}
                    </span>
                  </div>
                </div>
                <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SessionManagement;
