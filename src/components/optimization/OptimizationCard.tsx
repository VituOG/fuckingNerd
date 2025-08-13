import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Play, AlertCircle } from 'lucide-react';

export interface OptimizationCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'completed' | 'failed' | 'running';
  estimatedTime?: number; // in seconds
  onOptimize: () => Promise<any>;
  isEnabled?: boolean;
  warning?: string;
}

const OptimizationCard: React.FC<OptimizationCardProps> = ({
  id: _id,
  title,
  description,
  category,
  status,
  estimatedTime,
  onOptimize,
  isEnabled = true,
  warning,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleOptimize = async () => {
    if (!isEnabled || isLoading) return;

    setIsLoading(true);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      await onOptimize();
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 500);
    } catch (error) {
      console.error('Optimization failed:', error);
      setIsLoading(false);
      setProgress(0);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'running':
        return <Clock className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return <Play className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'border-green-500/20 bg-green-500/5';
      case 'failed':
        return 'border-red-500/20 bg-red-500/5';
      case 'running':
        return 'border-blue-500/20 bg-blue-500/5';
      default:
        return 'border-gray-500/20 bg-gray-500/5';
    }
  };

  const getButtonText = () => {
    if (isLoading) return 'Otimizando...';
    if (status === 'completed') return 'Concluído';
    if (status === 'failed') return 'Tentar Novamente';
    return 'Otimizar';
  };

  const getButtonColor = () => {
    if (isLoading) return 'bg-blue-500 hover:bg-blue-600';
    if (status === 'completed') return 'bg-green-500 hover:bg-green-600';
    if (status === 'failed') return 'bg-red-500 hover:bg-red-600';
    return 'bg-primary-600 hover:bg-primary-700';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-xl border-2 ${getStatusColor()} transition-all duration-300 hover:shadow-lg`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            {getStatusIcon()}
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
          {warning && (
            <div className="flex items-center space-x-2 mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <AlertCircle className="w-4 h-4 text-yellow-500" />
              <span className="text-yellow-400 text-sm">{warning}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full">
            {category}
          </span>
          {estimatedTime && (
            <span className="text-xs text-gray-400">~{estimatedTime}s</span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {isLoading && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Progresso</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleOptimize}
        disabled={!isEnabled || isLoading}
        className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${getButtonColor()} disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {getButtonText()}
      </button>
    </motion.div>
  );
};

export default OptimizationCard;
