import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          About NeuroCore Optimizer
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Advanced PC optimization tool for power users
        </p>
      </motion.div>

      <div className="mt-6 text-center">
        <Brain className="w-16 h-16 text-primary-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Version 1.0.0
        </h2>
        <p className="text-gray-500 mt-2">
          Built for power users who demand the best performance from their
          systems
        </p>
      </div>
    </div>
  );
};

export default About;
