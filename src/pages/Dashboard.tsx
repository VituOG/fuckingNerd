import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  MemoryStick,
  HardDrive,
  Activity,
  Zap,
  Shield,
  TrendingUp,
  Thermometer,
  Gauge,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useSystemInfo } from '@/hooks/useSystemInfo';
import { useNotifications } from '@/components/providers/NotificationProvider';

const Dashboard: React.FC = () => {
  type AlertItem = {
    type: 'warning' | 'error';
    message: string;
    icon: LucideIcon;
  };

  const { systemInfo, performanceMetrics } = useSystemInfo();
  const { addNotification } = useNotifications();
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [optimizationStatus] = useState({
    lastOptimized: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
    nextOptimization: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
    optimizationScore: 85,
  });

  // Mock performance history data
  const performanceHistory = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    cpu: Math.random() * 100,
    memory: Math.random() * 100,
    disk: Math.random() * 100,
    network: Math.random() * 100,
  }));

  const diskUsageData =
    systemInfo?.disk.map(disk => ({
      name: disk.device,
      value: Math.random() * 100,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    })) || [];

  useEffect(() => {
    // Check for system alerts
    if (performanceMetrics) {
      const newAlerts: AlertItem[] = [];

      if (performanceMetrics.cpu.usage > 90) {
        newAlerts.push({
          type: 'warning',
          message: 'High CPU usage detected',
          icon: Cpu,
        });
      }

      if (performanceMetrics.memory.usage > 85) {
        newAlerts.push({
          type: 'warning',
          message: 'High memory usage detected',
          icon: MemoryStick,
        });
      }

      if (performanceMetrics.cpu.temperature > 80) {
        newAlerts.push({
          type: 'error',
          message: 'High CPU temperature detected',
          icon: Thermometer,
        });
      }

      setAlerts(newAlerts);
    }
  }, [performanceMetrics]);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatPercentage = (value: number) => {
    return `${Math.round(value)}%`;
  };

  const getStatusColor = (usage: number) => {
    if (usage < 50) return 'text-green-500';
    if (usage < 80) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStatusBgColor = (usage: number) => {
    if (usage < 50) return 'bg-green-500';
    if (usage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const quickActions = [
    {
      name: 'Quick Clean',
      icon: Zap,
      action: () => {
        addNotification({
          type: 'info',
          title: 'Quick Clean',
          message: 'Starting system cleanup...',
          duration: 3000,
        });
      },
    },
    {
      name: 'Security Scan',
      icon: Shield,
      action: () => {
        addNotification({
          type: 'info',
          title: 'Security Scan',
          message: 'Starting security scan...',
          duration: 3000,
        });
      },
    },
    {
      name: 'Performance Boost',
      icon: TrendingUp,
      action: () => {
        addNotification({
          type: 'info',
          title: 'Performance Boost',
          message: 'Applying performance optimizations...',
          duration: 3000,
        });
      },
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
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            System overview and performance monitoring
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Last updated</p>
            <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
              {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid gap-4"
        >
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                alert.type === 'error'
                  ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                  : 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <alert.icon
                  className={`w-5 h-5 ${
                    alert.type === 'error' ? 'text-red-500' : 'text-yellow-500'
                  }`}
                />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {alert.message}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* System Overview Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* CPU Card */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                <Cpu className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  CPU
                </h3>
                <p className="text-sm text-gray-500">
                  {systemInfo?.cpu.brand || 'Unknown'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`text-2xl font-bold ${getStatusColor(
                  performanceMetrics?.cpu.usage || 0
                )}`}
              >
                {formatPercentage(performanceMetrics?.cpu.usage || 0)}
              </p>
              <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getStatusBgColor(
                    performanceMetrics?.cpu.usage || 0
                  )} transition-all duration-300`}
                  style={{ width: `${performanceMetrics?.cpu.usage || 0}%` }}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Temperature</p>
              <p className="font-mono text-gray-900 dark:text-white">
                {performanceMetrics?.cpu.temperature
                  ? `${Math.round(performanceMetrics.cpu.temperature)}°C`
                  : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Frequency</p>
              <p className="font-mono text-gray-900 dark:text-white">
                {performanceMetrics?.cpu.frequency
                  ? `${Math.round(performanceMetrics.cpu.frequency)} MHz`
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Memory Card */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                <MemoryStick className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Memory
                </h3>
                <p className="text-sm text-gray-500">
                  {formatBytes(systemInfo?.mem.total || 0)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`text-2xl font-bold ${getStatusColor(
                  performanceMetrics?.memory.usage || 0
                )}`}
              >
                {formatPercentage(performanceMetrics?.memory.usage || 0)}
              </p>
              <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getStatusBgColor(
                    performanceMetrics?.memory.usage || 0
                  )} transition-all duration-300`}
                  style={{ width: `${performanceMetrics?.memory.usage || 0}%` }}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Used</p>
              <p className="font-mono text-gray-900 dark:text-white">
                {formatBytes(performanceMetrics?.memory.used || 0)}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Available</p>
              <p className="font-mono text-gray-900 dark:text-white">
                {formatBytes(performanceMetrics?.memory.free || 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Disk Card */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                <HardDrive className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Storage
                </h3>
                <p className="text-sm text-gray-500">
                  {systemInfo?.disk.length || 0} drives
                </p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`text-2xl font-bold ${getStatusColor(
                  performanceMetrics?.disk[0]?.usage || 0
                )}`}
              >
                {formatPercentage(performanceMetrics?.disk[0]?.usage || 0)}
              </p>
              <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getStatusBgColor(
                    performanceMetrics?.disk[0]?.usage || 0
                  )} transition-all duration-300`}
                  style={{
                    width: `${performanceMetrics?.disk[0]?.usage || 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Read</p>
              <p className="font-mono text-gray-900 dark:text-white">
                {performanceMetrics?.disk[0]
                  ? formatBytes(performanceMetrics.disk[0].readBytes)
                  : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Write</p>
              <p className="font-mono text-gray-900 dark:text-white">
                {performanceMetrics?.disk[0]
                  ? formatBytes(performanceMetrics.disk[0].writeBytes)
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Network Card */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/20">
                <Activity className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Network
                </h3>
                <p className="text-sm text-gray-500">
                  {performanceMetrics?.network.length || 0} interfaces
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-500">Online</p>
              <div className="w-16 h-2 bg-green-200 dark:bg-green-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-full" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Download</p>
              <p className="font-mono text-gray-900 dark:text-white">
                {performanceMetrics?.network[0]
                  ? formatBytes(performanceMetrics.network[0].rxBytes)
                  : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Upload</p>
              <p className="font-mono text-gray-900 dark:text-white">
                {performanceMetrics?.network[0]
                  ? formatBytes(performanceMetrics.network[0].txBytes)
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Performance History Chart */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Performance History (24h)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
              />
              <Area
                type="monotone"
                dataKey="cpu"
                stackId="1"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="memory"
                stackId="1"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Disk Usage Chart */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Disk Usage
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={diskUsageData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {diskUsageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {diskUsageData.map((disk, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: disk.color }}
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    {disk.name}
                  </span>
                </div>
                <span className="font-mono text-gray-900 dark:text-white">
                  {Math.round(disk.value)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Quick Actions and Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Quick Actions */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <action.icon className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  {action.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Optimization Status */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Optimization Status
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                System Score
              </span>
              <div className="flex items-center space-x-2">
                <Gauge className="w-5 h-5 text-green-500" />
                <span className="font-bold text-green-500">
                  {optimizationStatus.optimizationScore}/100
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${optimizationStatus.optimizationScore}%` }}
              />
            </div>
            <div className="text-sm text-gray-500">
              <p>
                Last optimized:{' '}
                {optimizationStatus.lastOptimized.toLocaleDateString()}
              </p>
              <p>
                Next optimization:{' '}
                {optimizationStatus.nextOptimization.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            System Information
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">OS</span>
              <span className="text-gray-900 dark:text-white">
                {systemInfo?.os.platform} {systemInfo?.os.release}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Architecture
              </span>
              <span className="text-gray-900 dark:text-white">
                {systemInfo?.os.arch}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Hostname</span>
              <span className="text-gray-900 dark:text-white">
                {systemInfo?.os.hostname}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Uptime</span>
              <span className="text-gray-900 dark:text-white">
                {Math.floor(Math.random() * 24)}h{' '}
                {Math.floor(Math.random() * 60)}m
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
