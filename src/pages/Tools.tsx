import React from 'react';
import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';

const Tools: React.FC = () => {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Advanced Tools
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Advanced system tools and configuration utilities
        </p>
      </motion.div>

      <div className="mt-6 text-center">
        <Wrench className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          System Tools
        </h2>
        <p className="text-gray-500 mt-2">
          Registry editor, service manager, and advanced configuration tools
        </p>
      </div>
    </div>
  );
};

export default Tools;
