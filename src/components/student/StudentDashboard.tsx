import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Users, 
  Calendar, 
  User, 
  TrendingUp, 
  Heart,
  Activity,
  BookOpen,
  Clock
} from 'lucide-react';
import Layout from '../Layout';
import MoodTracker from './MoodTracker';
import AIChat from './AIChat';
import PeerForum from './PeerForum';
import CounselingBooking from './CounselingBooking';
import ProgressDashboard from './ProgressDashboard';
import ActiveCounselingSession from './ActiveCounselingSession';
import { useAuth } from '../../context/AuthContext';
import { useSession } from '../../context/SessionContext';
import WelcomeModal from './WelcomeModal';

type ActiveTab = 'dashboard' | 'mood' | 'chat' | 'forum' | 'counseling' | 'progress';

const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const { user } = useAuth();
  const { activeSession } = useSession();
  const [showSession, setShowSession] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  const isSessionForCurrentUser = activeSession && activeSession.studentId === user?.id;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'mood', label: 'Mood Tracker', icon: Heart },
    { id: 'chat', label: 'AI Chatbot', icon: MessageCircle },
    { id: 'forum', label: 'Peer Forum', icon: Users },
    { id: 'counseling', label: 'Counseling', icon: Calendar },
    { id: 'progress', label: 'Progress', icon: TrendingUp }
  ];

  if (showSession && isSessionForCurrentUser) {
    return <ActiveCounselingSession onEndSession={() => setShowSession(false)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'mood':
        return <MoodTracker />;
      case 'chat':
        return <AIChat />;
      case 'forum':
        return <PeerForum />;
      case 'counseling':
        return <CounselingBooking />;
      case 'progress':
        return <ProgressDashboard />;
      default:
        return <DashboardHome setActiveTab={setActiveTab} />;
    }
  };

  return (
    <>
      <AnimatePresence>
        {showWelcomeModal && user?.role === 'student' && (
          <WelcomeModal
            studentName={user?.name?.split(' ')[0] || 'Student'}
            onClose={() => setShowWelcomeModal(false)}
          />
        )}
      </AnimatePresence>
      
      <Layout title="Student Portal">
        {isSessionForCurrentUser && !showSession && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg shadow-md flex items-center justify-between"
            role="alert"
          >
            <div>
              <p className="font-bold">Your counseling session is ready!</p>
              <p className="text-sm">Your counselor is waiting for you.</p>
            </div>
            <motion.button
              onClick={() => setShowSession(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition-colors animate-pulse"
            >
              Join Now
            </motion.button>
          </motion.div>
        )}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-xl shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Hi {user?.name?.split(' ')[0]}, 
              </h2>
              <p className="text-sm text-gray-600">How are you feeling today?</p>
            </div>
            
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(item.id as ActiveTab)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </Layout>
    </>
  );
};

const DashboardHome: React.FC<{ setActiveTab: (tab: ActiveTab) => void }> = ({ setActiveTab }) => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white"
      >
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h2>
        <p className="text-blue-100">Your mental wellness journey continues today.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Heart className="w-8 h-8 text-red-500" />
            <span className="text-sm text-gray-500">Today</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">7/10</h3>
          <p className="text-sm text-gray-600">Mood Score</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-8 h-8 text-green-500" />
            <span className="text-sm text-gray-500">This Week</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">4/10</h3>
          <p className="text-sm text-gray-600">Stress Level</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="w-8 h-8 text-blue-500" />
            <span className="text-sm text-gray-500">Current</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">85%</h3>
          <p className="text-sm text-gray-600">Academic Avg</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-purple-500" />
            <span className="text-sm text-gray-500">Next</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Today 3PM</h3>
          <p className="text-sm text-gray-600">Counseling</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Heart className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Mood entry logged</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <MessageCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">AI Chat session</p>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setActiveTab('mood')} className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors">
              <Heart className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-blue-900">Log Mood</span>
            </button>
            <button onClick={() => setActiveTab('chat')} className="p-3 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors">
              <MessageCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-green-900">Chat with AI</span>
            </button>
            <button onClick={() => setActiveTab('counseling')} className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors">
              <Calendar className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-purple-900">Book Session</span>
            </button>
            <button onClick={() => setActiveTab('forum')} className="p-3 bg-orange-50 hover:bg-orange-100 rounded-lg text-center transition-colors">
              <Users className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-orange-900">Join Forum</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;
