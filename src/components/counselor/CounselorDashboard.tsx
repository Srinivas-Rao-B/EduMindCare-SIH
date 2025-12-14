import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, MessageCircle, FileText, BarChart3, Star, Play, Bell, Phone, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Layout from '../Layout';
import SessionManagement from './SessionManagement';
import AnonymousSession from './AnonymousSession';
import ScheduleManagement from './ScheduleManagement';
import ReportsView from './ReportsView';
import BackButton from '../common/BackButton';
import { useAuth } from '../../context/AuthContext';
import { useSession } from '../../context/SessionContext';
import { useAlerts } from '../../context/AlertContext';
import { formatDistanceToNow } from 'date-fns';

type ActiveTab = 'dashboard' | 'sessions' | 'schedule' | 'reports' | 'feedback' | 'notifications';

const CounselorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const { user } = useAuth();
  const { activeSession, startCounselorSession } = useSession();
  const { alerts } = useAlerts();

  const newAlertCount = alerts.filter(a => a.status === 'new').length;

  const isSessionForCurrentUser = activeSession && activeSession.counselorId === user?.id;

  const handleStartSession = (sessionId: string, studentId: string) => {
    if (user) {
      startCounselorSession(sessionId, studentId, user.id);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: BarChart3 },
    { id: 'sessions', label: 'My Sessions', icon: Users },
    { id: 'schedule', label: 'My Schedule', icon: Clock },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'feedback', label: 'Feedback', icon: Star },
    { id: 'notifications', label: 'Notifications', icon: Bell, count: newAlertCount },
  ];

  if (isSessionForCurrentUser) {
    return <AnonymousSession />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'sessions':
        return <SessionManagement onStartSession={handleStartSession} />;
      case 'schedule':
        return <ScheduleManagement />;
      case 'reports':
        return <ReportsView />;
      case 'feedback':
        return <FeedbackView />;
      case 'notifications':
        return <NotificationsView onStartSession={handleStartSession} />;
      default:
        return <CounselorOverview onStartSession={handleStartSession} />;
    }
  };

  return (
    <Layout title="Counselor Portal">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 bg-white rounded-xl shadow-sm p-6">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as ActiveTab)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.count && item.count > 0 && (
                    <span className="bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{item.count}</span>
                  )}
                </motion.button>
              );
            })}
          </nav>
        </div>
        <div className="flex-1">
          {activeTab !== 'dashboard' && <BackButton onClick={() => setActiveTab('dashboard')} />}
          {renderContent()}
        </div>
      </div>
    </Layout>
  );
};

const CounselorOverview: React.FC<{ onStartSession: (sessionId: string, studentId: string) => void }> = ({ onStartSession }) => {
  const { alerts, acknowledgeAlert } = useAlerts();
  const newAlerts = alerts.filter(a => a.status === 'new');
  
  const todaySessions = [
    { id: 'session-1', time: '10:00 AM', anonymousId: 'ANON-A1B2C3', studentId: '3', type: 'chat' as const },
    { id: 'session-2', time: '02:00 PM', anonymousId: 'ANON-D4E5F6', studentId: '4', type: 'call' as const },
  ];
  const recentFeedback = [
    { id: 'fb-1', rating: 5, comment: 'Very helpful session, felt understood.', anonymousId: 'ANON-G7H8I9' },
    { id: 'fb-2', rating: 4, comment: 'Good advice, but we ran out of time.', anonymousId: 'ANON-J1K2L3' },
  ];
  const weeklySessionsData = [
    { week: 'Week 1', sessions: 5 }, { week: 'Week 2', sessions: 8 },
    { week: 'Week 3', sessions: 6 }, { week: 'This Week', sessions: 8 },
  ];

  const handleAcknowledgeAndStart = (alertId: string, studentId: string) => {
    acknowledgeAlert(alertId);
    onStartSession(`session-SOS-${alertId}`, studentId);
  };

  const getTypeIcon = (type: 'chat' | 'call') => {
    switch (type) {
      case 'chat': return <MessageCircle className="w-4 h-4 text-blue-700" />;
      case 'call': return <Phone className="w-4 h-4 text-green-700" />;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Users className="w-8 h-8 text-blue-500 mb-4" />
          <h3 className="text-3xl font-bold text-gray-900">{todaySessions.length}</h3>
          <p className="text-sm text-gray-600">Today's Sessions</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Star className="w-8 h-8 text-yellow-500 mb-4" />
          <h3 className="text-3xl font-bold text-gray-900">4.8</h3>
          <p className="text-sm text-gray-600">Average Rating</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <AlertTriangle className="w-8 h-8 text-red-500 mb-4" />
          <h3 className="text-3xl font-bold text-gray-900">{newAlerts.length}</h3>
          <p className="text-sm text-gray-600">New SOS Alerts</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Calendar className="w-8 h-8 text-green-500 mb-4" />
          <h3 className="text-3xl font-bold text-gray-900">8</h3>
          <p className="text-sm text-gray-600">Sessions This Week</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Appointments</h3>
            <div className="space-y-3">
              {todaySessions.length > 0 ? todaySessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${session.type === 'chat' ? 'bg-blue-100' : 'bg-green-100'}`}>
                      {getTypeIcon(session.type)}
                    </div>
                    <div>
                      <h4 className="font-medium">{session.time}</h4>
                      <p className="text-sm text-gray-500">{session.anonymousId}</p>
                    </div>
                  </div>
                  <button onClick={() => onStartSession(session.id, session.studentId)} className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center space-x-1">
                    <Play className="w-3 h-3" />
                    <span>Start</span>
                  </button>
                </div>
              )) : <p className="text-center text-gray-500 py-4">No sessions scheduled for today.</p>}
            </div>
          </div>
          
          {newAlerts.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Urgent Notifications</h3>
              <div className="space-y-3">
                {newAlerts.slice(0, 2).map(alert => (
                  <div key={alert.id} className="p-3 border-l-4 border-red-500 bg-red-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-red-800">SOS from {alert.studentName}</p>
                        <p className="text-sm text-gray-700">{alert.reason}</p>
                      </div>
                      <button onClick={() => handleAcknowledgeAndStart(alert.id, alert.studentId)} className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm">
                        Start Session
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Sessions</h3>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklySessionsData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <XAxis dataKey="week" fontSize={10} />
                  <YAxis fontSize={10} />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Feedback</h3>
            <div className="space-y-3">
              {recentFeedback.map((fb) => (
                <div key={fb.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-gray-700 italic">"{fb.comment}"</p>
                    <div className="flex items-center space-x-1 text-yellow-500 ml-2">
                      <span className="text-sm font-bold">{fb.rating}</span>
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeedbackView: React.FC = () => {
  const allFeedback = [
    { id: 'fb-1', rating: 5, comment: 'Very helpful session, felt understood.', anonymousId: 'ANON-G7H8I9', date: '2025-01-20' },
    { id: 'fb-2', rating: 4, comment: 'Good advice, but we ran out of time.', anonymousId: 'ANON-J1K2L3', date: '2025-01-19' },
    { id: 'fb-3', rating: 5, comment: 'Exactly what I needed to hear. Thank you!', anonymousId: 'ANON-M4N5O6', date: '2025-01-18' },
    { id: 'fb-4', rating: 5, comment: 'The breathing exercises were very effective.', anonymousId: 'ANON-P7Q8R9', date: '2025-01-17' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Session Feedback</h2>
        <p className="text-gray-600">All feedback received from students</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        {allFeedback.map(fb => (
          <div key={fb.id} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-800">"{fb.comment}"</p>
                <p className="text-xs text-gray-500 mt-2">- {fb.anonymousId} on {fb.date}</p>
              </div>
              <div className="flex items-center space-x-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < fb.rating ? 'fill-current' : ''}`} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const NotificationsView: React.FC<{ onStartSession: (sessionId: string, studentId: string) => void }> = ({ onStartSession }) => {
  const { alerts, acknowledgeAlert } = useAlerts();

  const handleAcknowledgeAndStart = (alertId: string, studentId: string) => {
    acknowledgeAlert(alertId);
    onStartSession(`session-SOS-${alertId}`, studentId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">SOS Notifications</h2>
        <p className="text-gray-600">Urgent alerts from students requiring immediate attention</p>
      </div>
      <div className="space-y-4">
        {alerts.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No new notifications.</p>
        ) : (
          alerts.map(alert => (
            <motion.div
              key={alert.id}
              className={`p-4 rounded-lg shadow-sm border-l-4 ${alert.status === 'new' ? 'bg-red-50 border-red-500' : 'bg-gray-50 border-gray-400'}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-red-800">SOS Alert from {alert.studentName}</p>
                  <p className="text-sm text-gray-700 mt-1">Reason: <span className="font-medium">{alert.reason}</span></p>
                  <p className="text-xs text-gray-500 mt-2">{formatDistanceToNow(alert.timestamp, { addSuffix: true })}</p>
                </div>
                {alert.status === 'new' && (
                  <button
                    onClick={() => handleAcknowledgeAndStart(alert.id, alert.studentId)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Acknowledge & Start Session
                  </button>
                )}
                {alert.status === 'acknowledged' && (
                   <span className="text-sm text-gray-600 font-medium">Acknowledged</span>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default CounselorDashboard;
