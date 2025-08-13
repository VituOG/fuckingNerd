import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Play,
  Pause,
  Monitor,
  Cpu,
  MemoryStick,
  Network,
  TrendingUp,
} from 'lucide-react';
import { useNotifications } from '@/components/providers/NotificationProvider';

const GameMode: React.FC = () => {
  const { addNotification } = useNotifications();
  const [isGameModeActive, setIsGameModeActive] = useState(false);
  const [gameModeConfig, setGameModeConfig] = useState({
    autoEnable: false,
    memoryCleanup: true,
    networkOptimization: true,
    gpuOptimization: true,
    priority: 'high' as 'high' | 'realtime',
  });

  const handleToggleGameMode = () => {
    setIsGameModeActive(!isGameModeActive);

    if (!isGameModeActive) {
      addNotification({
        type: 'success',
        title: 'Game Mode Activated',
        message: 'System optimized for gaming performance',
        duration: 3000,
      });
    } else {
      addNotification({
        type: 'info',
        title: 'Game Mode Deactivated',
        message: 'System restored to normal operation',
        duration: 3000,
      });
    }
  };

  const performanceMetrics = {
    cpu: { usage: 45, temperature: 65 },
    memory: { usage: 60, available: 8.2 },
    gpu: { usage: 30, temperature: 55, memory: 4.1 },
    network: { latency: 12, bandwidth: 950 },
  };

  const optimizationFeatures = [
    {
      name: 'Memory Cleanup',
      description: 'Free up RAM for better gaming performance',
      icon: MemoryStick,
      enabled: gameModeConfig.memoryCleanup,
      toggle: () =>
        setGameModeConfig(prev => ({
          ...prev,
          memoryCleanup: !prev.memoryCleanup,
        })),
    },
    {
      name: 'Network Optimization',
      description: 'Reduce latency and optimize network settings',
      icon: Network,
      enabled: gameModeConfig.networkOptimization,
      toggle: () =>
        setGameModeConfig(prev => ({
          ...prev,
          networkOptimization: !prev.networkOptimization,
        })),
    },
    {
      name: 'GPU Optimization',
      description: 'Optimize graphics settings for gaming',
      icon: Monitor,
      enabled: gameModeConfig.gpuOptimization,
      toggle: () =>
        setGameModeConfig(prev => ({
          ...prev,
          gpuOptimization: !prev.gpuOptimization,
        })),
    },
    {
      name: 'Process Priority',
      description: 'Set high priority for gaming processes',
      icon: Cpu,
      enabled: true,
      toggle: undefined,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Game Mode
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Optimize your system for maximum gaming performance
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Status</p>
            <p
              className={`text-sm font-mono ${
                isGameModeActive ? 'text-green-500' : 'text-gray-500'
              }`}
            >
              {isGameModeActive ? 'ACTIVE' : 'INACTIVE'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Game Mode Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Game Mode Control
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {isGameModeActive
                ? 'Game mode is currently active and optimizing your system'
                : 'Activate game mode to optimize your system for gaming'}
            </p>
          </div>
          <button
            onClick={handleToggleGameMode}
            className={`btn flex items-center space-x-2 ${
              isGameModeActive ? 'btn-secondary' : 'btn-primary'
            }`}
          >
            {isGameModeActive ? (
              <>
                <Pause className="w-5 h-5" />
                <span>Deactivate</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span>Activate</span>
              </>
            )}
          </button>
        </div>

        {isGameModeActive && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center space-x-2 text-green-700 dark:text-green-400">
              <Zap className="w-5 h-5" />
              <span className="font-medium">Performance Boost Active</span>
            </div>
            <p className="text-sm text-green-600 dark:text-green-300 mt-1">
              System optimized for gaming. Background processes minimized.
            </p>
          </div>
        )}
      </motion.div>

      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* CPU */}
        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Cpu className="w-6 h-6 text-blue-500" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                CPU
              </h3>
              <p className="text-sm text-gray-500">Usage & Temperature</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Usage</span>
              <span className="text-sm font-mono text-gray-900 dark:text-white">
                {performanceMetrics.cpu.usage}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Temperature</span>
              <span className="text-sm font-mono text-gray-900 dark:text-white">
                {performanceMetrics.cpu.temperature}°C
              </span>
            </div>
          </div>
        </div>

        {/* Memory */}
        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <MemoryStick className="w-6 h-6 text-green-500" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Memory
              </h3>
              <p className="text-sm text-gray-500">Usage & Available</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Usage</span>
              <span className="text-sm font-mono text-gray-900 dark:text-white">
                {performanceMetrics.memory.usage}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Available</span>
              <span className="text-sm font-mono text-gray-900 dark:text-white">
                {performanceMetrics.memory.available} GB
              </span>
            </div>
          </div>
        </div>

        {/* GPU */}
        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Monitor className="w-6 h-6 text-purple-500" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                GPU
              </h3>
              <p className="text-sm text-gray-500">Usage & Memory</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Usage</span>
              <span className="text-sm font-mono text-gray-900 dark:text-white">
                {performanceMetrics.gpu.usage}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Memory</span>
              <span className="text-sm font-mono text-gray-900 dark:text-white">
                {performanceMetrics.gpu.memory} GB
              </span>
            </div>
          </div>
        </div>

        {/* Network */}
        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Network className="w-6 h-6 text-orange-500" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Network
              </h3>
              <p className="text-sm text-gray-500">Latency & Bandwidth</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Latency</span>
              <span className="text-sm font-mono text-gray-900 dark:text-white">
                {performanceMetrics.network.latency} ms
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Bandwidth</span>
              <span className="text-sm font-mono text-gray-900 dark:text-white">
                {performanceMetrics.network.bandwidth} Mbps
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Optimization Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Features List */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Optimization Features
          </h3>
          <div className="space-y-4">
            {optimizationFeatures.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-gray-500" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {feature.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={feature.toggle}
                    disabled={!feature.toggle}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      feature.enabled
                        ? 'bg-primary-600'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        feature.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Settings */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Game Mode Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={gameModeConfig.autoEnable}
                  onChange={e =>
                    setGameModeConfig(prev => ({
                      ...prev,
                      autoEnable: e.target.checked,
                    }))
                  }
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Auto-enable for games
                </span>
              </label>
              <p className="text-sm text-gray-500 mt-1">
                Automatically activate game mode when launching games
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Process Priority
              </label>
              <select
                value={gameModeConfig.priority}
                onChange={e =>
                  setGameModeConfig(prev => ({
                    ...prev,
                    priority: e.target.value as 'high' | 'realtime',
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              >
                <option value="high">High Priority</option>
                <option value="realtime">Real-time Priority</option>
              </select>
              <p className="text-sm text-gray-500 mt-1">
                Set CPU priority for gaming processes
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Performance Impact
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">FPS Improvement</span>
                  <span className="text-green-600 font-medium">+15-25%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Latency Reduction</span>
                  <span className="text-green-600 font-medium">-20-30ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Memory Usage</span>
                  <span className="text-blue-600 font-medium">-10-15%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() =>
              addNotification({
                type: 'info',
                title: 'Memory Cleanup',
                message: 'Cleaning up memory for better performance...',
                duration: 3000,
              })
            }
            className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <MemoryStick className="w-6 h-6 text-green-500" />
            <div className="text-left">
              <h4 className="font-medium text-gray-900 dark:text-white">
                Clean Memory
              </h4>
              <p className="text-sm text-gray-500">Free up RAM</p>
            </div>
          </button>

          <button
            onClick={() =>
              addNotification({
                type: 'info',
                title: 'Network Test',
                message: 'Testing network latency and bandwidth...',
                duration: 3000,
              })
            }
            className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Network className="w-6 h-6 text-blue-500" />
            <div className="text-left">
              <h4 className="font-medium text-gray-900 dark:text-white">
                Test Network
              </h4>
              <p className="text-sm text-gray-500">Check latency</p>
            </div>
          </button>

          <button
            onClick={() =>
              addNotification({
                type: 'info',
                title: 'Performance Boost',
                message: 'Applying performance optimizations...',
                duration: 3000,
              })
            }
            className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <TrendingUp className="w-6 h-6 text-purple-500" />
            <div className="text-left">
              <h4 className="font-medium text-gray-900 dark:text-white">
                Boost Performance
              </h4>
              <p className="text-sm text-gray-500">Optimize system</p>
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default GameMode;
