import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, PhoneOff, BarChart3, MessageCircle, X, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useSession } from '../../context/SessionContext';

const AnonymousSession: React.FC = () => {
  const { activeSession, sendMessage, endSession } = useSession();
  const [inputText, setInputText] = useState('');
  const [showStudentData, setShowStudentData] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock student performance data (anonymized)
  const studentData = {
    anonymousId: 'ANON-A1B2C3',
    academicPerformance: [
      { subject: 'Sub A', score: 85 }, { subject: 'Sub B', score: 78 },
      { subject: 'Sub C', score: 92 }, { subject: 'Sub D', score: 88 }
    ],
    attendanceData: [
      { subject: 'Sub A', attendance: 95 }, { subject: 'Sub B', attendance: 88 },
      { subject: 'Sub C', attendance: 92 }, { subject: 'Sub D', attendance: 90 }
    ],
    wellnessMetrics: { avgMood: 6.8, stressLevel: 6.2 },
    recentInputs: [
      { date: '20-Jan', mood: 'Anxious', stress: 7, notes: 'Overwhelmed with exams' },
      { date: '19-Jan', mood: 'Tired', stress: 6, notes: 'Trouble sleeping' }
    ],
    moodTrend: [
      { date: '15-Jan', mood: 6 }, { date: '16-Jan', mood: 5 }, { date: '17-Jan', mood: 7 },
      { date: '18-Jan', mood: 6 }, { date: '19-Jan', mood: 4 }, { date: '20-Jan', mood: 5 }
    ]
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages]);

  const handleSendMessage = () => {
    if (!inputText.trim() || !activeSession) return;
    sendMessage({ text: inputText, sender: 'counselor' });
    setInputText('');

    // Simulate student response
    setTimeout(() => {
      const responses = [
        "I've been feeling quite stressed about my exams lately.", "It's been hard to focus on my studies.",
        "I appreciate you taking the time to talk with me.", "That's really helpful advice, thank you."
      ];
      sendMessage({ text: responses[Math.floor(Math.random() * responses.length)], sender: 'student' });
    }, 1000 + Math.random() * 1500);
  };

  const handleEndSession = () => {
    setShowFeedbackForm(true);
  };

  const handleSubmitFeedback = () => {
    console.log('Session feedback:', feedback);
    endSession();
  };

  if (!activeSession) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Session has ended.</p>
      </div>
    );
  }

  if (showFeedbackForm) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Session Complete</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Notes (For your records)
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Key discussion points, recommendations, etc."
              />
            </div>
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmitFeedback}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save & End Session
              </motion.button>
              <button
                onClick={endSession}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                End Without Saving
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg w-8 h-8 flex items-center justify-center">
                <MessageCircle className="text-white text-sm" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Anonymous Session</h1>
                <p className="text-xs text-gray-500">ID: {studentData.anonymousId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowStudentData(!showStudentData)}
                className={`p-2 rounded-lg transition-colors ${
                  showStudentData ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Active</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEndSession}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                End Session
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6 h-[calc(100vh-200px)]">
          {showStudentData && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="w-80 bg-white rounded-xl shadow-sm p-6 overflow-y-auto"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{studentData.wellnessMetrics.avgMood}</div>
                      <div className="text-xs text-blue-800">Avg Mood</div>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{studentData.wellnessMetrics.stressLevel}</div>
                      <div className="text-xs text-red-800">Stress Level</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Academic Performance</h4>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={studentData.academicPerformance} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                        <XAxis dataKey="subject" fontSize={10} />
                        <YAxis fontSize={10} />
                        <Bar dataKey="score" fill="#3B82F6" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Mood Trend</h4>
                  <div className="h-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={studentData.moodTrend} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                        <XAxis dataKey="date" fontSize={8} />
                        <YAxis fontSize={8} domain={[0, 10]} />
                        <Line type="monotone" dataKey="mood" stroke="#10B981" strokeWidth={2} dot={{ r: 2 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Recent Entries</h4>
                  <div className="space-y-3">
                    {studentData.recentInputs.map((entry, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-900">{entry.mood}</span>
                          <span className="text-xs text-gray-500">{entry.date}</span>
                        </div>
                        <p className="text-xs text-gray-600 truncate">{entry.notes}</p>
                        <div className="text-xs text-red-600 mt-1">Stress: {entry.stress}/10</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div className="flex-1 bg-white rounded-xl shadow-sm flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeSession.messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'counselor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'counselor' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 opacity-70`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnonymousSession;
