import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
  "Believe you can and you're halfway there.",
  "The secret of getting ahead is getting started.",
  "It’s not whether you get knocked down, it’s whether you get up.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "The only way to do great work is to love what you do.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Don't watch the clock; do what it does. Keep going.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Dream bigger. Do bigger.",
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Success doesn’t just find you. You have to go out and get it.",
  "The expert in anything was once a beginner.",
  "Strive for progress, not perfection.",
  "You are capable of more than you know.",
  "The journey of a thousand miles begins with a single step.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Every accomplishment starts with the decision to try.",
  "Do something today that your future self will thank you for."
];

interface WelcomeModalProps {
  studentName: string;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ studentName, onClose }) => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 overflow-hidden"
    >
      {/* Decorative Shape */}
      <div className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 md:w-1/2 md:h-full bg-gradient-to-br from-blue-400/50 to-purple-500/50 rounded-full opacity-50 blur-2xl"></div>
      
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
        className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 text-center w-11/12 max-w-2xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome back, <span className="text-blue-600">{studentName}</span>!
        </h1>

        <blockquote className="mt-6">
          <p className="text-lg md:text-xl text-gray-700 italic">
            "{quote}"
          </p>
        </blockquote>

        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 bg-blue-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
        >
          Continue to Dashboard
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeModal;
