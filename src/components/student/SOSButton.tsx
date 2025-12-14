import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Send } from 'lucide-react';
import { useAlerts } from '../../context/AlertContext';
import { useAuth } from '../../context/AuthContext';

const SOSButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addAlert } = useAlerts();
  const { user } = useAuth();

  const reasons = [
    'Suicidal thoughts',
    'Severe anxiety / Panic attack',
    'Feeling overwhelmed and need immediate help',
    'Other urgent crisis'
  ];

  const handleSubmit = () => {
    if (!selectedReason || !user) return;

    addAlert({
      studentId: user.id,
      studentName: user.name,
      reason: selectedReason,
    });
    
    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setSelectedReason('');
    }, 3000);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-red-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center z-50"
        aria-label="Emergency SOS"
      >
        <AlertTriangle className="w-8 h-8" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Send className="w-8 h-8" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Alert Sent</h2>
                  <p className="text-gray-600">Help is on the way. A counselor has been notified and will reach out to you shortly.</p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                    <h2 className="text-2xl font-bold text-gray-900">Immediate Help Needed?</h2>
                    <p className="text-gray-600 mt-1">This will send an urgent alert to a counselor.</p>
                    <p className="text-sm text-gray-500 mt-2">If this is a life-threatening emergency, please call your local emergency number immediately.</p>
                  </div>

                  <div className="space-y-3">
                    {reasons.map(reason => (
                      <button
                        key={reason}
                        onClick={() => setSelectedReason(reason)}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                          selectedReason === reason
                            ? 'bg-red-50 border-red-400 text-red-800'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <span className="font-medium">{reason}</span>
                      </button>
                    ))}
                  </div>

                  <motion.button
                    onClick={handleSubmit}
                    disabled={!selectedReason}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 bg-red-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Send Urgent Alert
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SOSButton;
