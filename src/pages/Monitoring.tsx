import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const Monitoring: React.FC = () => {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          System Monitoring
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Real-time system monitoring and performance tracking
        </p>
      </motion.div>

      <div className="mt-6 text-center">
        <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Advanced Monitoring Features
        </h2>
        <p className="text-gray-500 mt-2">
          Detailed system monitoring with historical data and performance
          analytics
        </p>
      </div>
    </div>
  );
};

export default Monitoring;
