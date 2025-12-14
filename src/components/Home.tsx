import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center justify-center p-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Heart className="text-white w-12 h-12" fill="currentColor" />
        </div>
        <h1 className="text-6xl md:text-7xl font-extrabold text-gray-800 tracking-tight">
          EduMindCare
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-600">
          Protecting Minds, Enriching Futures
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
        className="mt-12"
      >
        <Link to="/login">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0_0_0_0.1)' }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 font-semibold text-lg px-10 py-4 rounded-full shadow-md transition-all duration-300"
          >
            Continue
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
