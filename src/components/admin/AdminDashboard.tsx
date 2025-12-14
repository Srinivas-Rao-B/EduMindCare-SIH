import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, BarChart3, Settings, Bell, Shield, Database, UserCog, SlidersHorizontal, BellRing, HeartHandshake, GraduationCap, DatabaseZap, ShieldCheck, Save, RotateCcw } from 'lucide-react';
import Layout from '../Layout';
import StudentManagement from './StudentManagement';
import CounselorManagement from './CounselorManagement';
import AnalyticsDashboard from './AnalyticsDashboard';
import BackButton from '../common/BackButton';

type ActiveTab = 'dashboard' | 'students' | 'counselors' | 'analytics' | 'settings';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: BarChart3 },
    { id: 'students', label: 'Manage Students', icon: Users },
    { id: 'counselors', label: 'Manage Counselors', icon: UserCog },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'students':
        return <StudentManagement />;
      case 'counselors':
        return <CounselorManagement />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <Layout title="Admin Portal">
      <div className="flex gap-6">
        <div className="w-64 bg-white rounded-xl shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Admin Panel</h2>
            <p className="text-sm text-gray-600">Manage students and view analytics</p>
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

        <div className="flex-1">
          {activeTab !== 'dashboard' && <BackButton onClick={() => setActiveTab('dashboard')} />}
          {renderContent()}
        </div>
      </div>
    </Layout>
  );
};

const AdminOverview: React.FC<{ setActiveTab: (tab: ActiveTab) => void }> = ({ setActiveTab }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Admin Overview</h2>
        <p className="text-gray-600">Institution-wide wellness and academic insights</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <button onClick={() => setActiveTab('students')} className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors">
            <UserPlus className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-blue-900">Manage Students</span>
          </button>
           <button onClick={() => setActiveTab('counselors')} className="p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-center transition-colors">
            <UserCog className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-indigo-900">Manage Counselors</span>
          </button>
          <button onClick={() => setActiveTab('analytics')} className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors">
            <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-green-900">View Reports</span>
          </button>
          <button onClick={() => setActiveTab('settings')} className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-center transition-colors">
            <Settings className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-orange-900">Settings</span>
          </button>
        </div>
      </div>
      <AnalyticsDashboard />
    </div>
  );
};

const ToggleSwitch: React.FC<{ enabled: boolean; onChange: () => void }> = ({ enabled, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? 'bg-blue-600' : 'bg-gray-200'}`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
    />
  </button>
);

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    institutionName: 'Northwood University',
    stressThreshold: 7,
    attendanceThreshold: 75,
    notificationEmail: 'counseling-dept@northwood.edu',
    enableAI: true,
    enableForum: true,
    enableSOS: true,
    defaultSessionDuration: 45,
    forceAnonymous: true,
    dataRetentionDays: 90,
    require2FA: false,
  });

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: parseInt(value) }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">System Settings</h2>
        <p className="text-gray-600 mt-1">Manage platform-wide configurations and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <div className="flex items-center space-x-3 mb-2"><SlidersHorizontal className="w-6 h-6 text-gray-500" /><h3 className="text-xl font-semibold text-gray-900">General</h3></div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Institution Name</label>
            <input type="text" name="institutionName" value={settings.institutionName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Institution Logo</label>
            <button type="button" className="mt-1 text-sm text-blue-600 hover:text-blue-800">Upload new logo</button>
          </div>
        </motion.div>

        {/* Alerts & Notifications */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <div className="flex items-center space-x-3 mb-2"><BellRing className="w-6 h-6 text-gray-500" /><h3 className="text-xl font-semibold text-gray-900">Alerts & Notifications</h3></div>
          <div>
            <label className="block text-sm font-medium text-gray-700">High Stress Threshold: {settings.stressThreshold}/10</label>
            <input type="range" name="stressThreshold" min="5" max="10" value={settings.stressThreshold} onChange={handleSliderChange} className="mt-1 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
            <p className="text-xs text-gray-500 mt-1">Alerts will be triggered for students reporting stress at or above this level.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Low Attendance Threshold: {settings.attendanceThreshold}%</label>
            <input type="range" name="attendanceThreshold" min="50" max="90" value={settings.attendanceThreshold} onChange={handleSliderChange} className="mt-1 w-full h-2 bg-gray-200 rounded-lg" />
            <p className="text-xs text-gray-500 mt-1">Flag students whose attendance drops below this percentage.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Notification Email</label>
            <input type="email" name="notificationEmail" value={settings.notificationEmail} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
            <p className="text-xs text-gray-500 mt-1">Urgent alerts (e.g., SOS) will be sent to this address.</p>
          </div>
        </motion.div>

        {/* Counseling & Sessions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <div className="flex items-center space-x-3 mb-2"><HeartHandshake className="w-6 h-6 text-gray-500" /><h3 className="text-xl font-semibold text-gray-900">Counseling & Sessions</h3></div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Default Session Duration (minutes)</label>
            <input type="number" name="defaultSessionDuration" value={settings.defaultSessionDuration} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700">Force Anonymous Counseling</label>
              <p className="text-xs text-gray-500">Ensure all student details are hidden during sessions.</p>
            </div>
            <ToggleSwitch enabled={settings.forceAnonymous} onChange={() => handleToggle('forceAnonymous')} />
          </div>
        </motion.div>

        {/* Student Portal Features */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <div className="flex items-center space-x-3 mb-2"><GraduationCap className="w-6 h-6 text-gray-500" /><h3 className="text-xl font-semibold text-gray-900">Student Portal Features</h3></div>
          <div className="flex items-center justify-between"><label className="text-sm font-medium text-gray-700">Enable AI Wellness Companion</label><ToggleSwitch enabled={settings.enableAI} onChange={() => handleToggle('enableAI')} /></div>
          <div className="flex items-center justify-between"><label className="text-sm font-medium text-gray-700">Enable Peer Support Forum</label><ToggleSwitch enabled={settings.enableForum} onChange={() => handleToggle('enableForum')} /></div>
          <div className="flex items-center justify-between"><label className="text-sm font-medium text-gray-700">Enable SOS Emergency Button</label><ToggleSwitch enabled={settings.enableSOS} onChange={() => handleToggle('enableSOS')} /></div>
        </motion.div>

        {/* Data & Security */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-xl shadow-sm p-6 space-y-4 lg:col-span-2">
          <div className="flex items-center space-x-3 mb-2"><ShieldCheck className="w-6 h-6 text-gray-500" /><h3 className="text-xl font-semibold text-gray-900">Data & Security</h3></div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Data Retention (days)</label>
            <input type="number" name="dataRetentionDays" value={settings.dataRetentionDays} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
            <p className="text-xs text-gray-500 mt-1">Automatically purge anonymized session data older than this period.</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700">Require 2FA for Staff</label>
              <p className="text-xs text-gray-500">Enforce Two-Factor Authentication for all Admin and Counselor accounts.</p>
            </div>
            <ToggleSwitch enabled={settings.require2FA} onChange={() => handleToggle('require2FA')} />
          </div>
          <div className="pt-2">
            <h4 className="text-sm font-medium text-gray-700">Data Actions</h4>
            <div className="flex space-x-3 mt-2">
              <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">Export All Data</button>
              <button className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-medium">Purge Old Data</button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-medium flex items-center space-x-2">
          <RotateCcw className="w-4 h-4" />
          <span>Reset to Defaults</span>
        </motion.button>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="bg-blue-600 text-white px-8 py-2 rounded-lg font-medium flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </motion.button>
      </div>
    </div>
  );
};

export default AdminDashboard;
