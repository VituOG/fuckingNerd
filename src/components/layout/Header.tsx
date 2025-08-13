import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Menu,
  Minus,
  X,
  Maximize2,
  Minimize2,
  Settings,
  Bell,
  Cpu,
  MemoryStick,
  HardDrive,
  Wifi,
  Clock,
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useNotifications } from '@/components/providers/NotificationProvider';
import { SystemInfo } from '@/types';

interface HeaderProps {
  onMenuClick: () => void;
  systemInfo: SystemInfo | null;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, systemInfo }) => {
  const { theme, setTheme } = useTheme();
  const { addNotification } = useNotifications();
  const [isMaximized, setIsMaximized] = useState(false);

  const handleWindowControl = async (
    action: 'minimize' | 'maximize' | 'close'
  ) => {
    try {
      if (window.electronAPI) {
        switch (action) {
          case 'minimize':
            await window.electronAPI.window.minimize();
            break;
          case 'maximize':
            await window.electronAPI.window.maximize();
            setIsMaximized(!isMaximized);
            break;
          case 'close':
            await window.electronAPI.window.close();
            break;
        }
      }
    } catch (error) {
      console.error('Error controlling window:', error);
    }
  };

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

  const getSystemStatusColor = (usage: number) => {
    if (usage < 50) return 'text-green-500';
    if (usage < 80) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getThemeStyles = () => {
    switch (theme) {
      case 'neon':
        return 'bg-black/80 backdrop-blur-md border-b border-neon-green/30';
      case 'terminal':
        return 'bg-black/90 backdrop-blur-md border-b border-green-500/30';
      case 'light':
        return 'bg-white/95 backdrop-blur-md border-b border-gray-200';
      default:
        return 'bg-dark-800/95 backdrop-blur-md border-b border-dark-600';
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`h-16 ${getThemeStyles()} flex items-center justify-between px-6 shadow-lg`}
    >
      {/* Left section */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-dark-700/50 transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-400" />
        </button>

        {/* System status indicators */}
        {systemInfo && (
          <div className="flex items-center space-x-6">
            {/* CPU */}
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-gray-400" />
              <span
                className={`text-sm font-mono ${getSystemStatusColor(
                  systemInfo.cpu.usage || 0
                )}`}
              >
                {formatPercentage(systemInfo.cpu.usage || 0)}
              </span>
            </div>

            {/* Memory */}
            <div className="flex items-center space-x-2">
              <MemoryStick className="w-4 h-4 text-gray-400" />
              <span
                className={`text-sm font-mono ${getSystemStatusColor(
                  (systemInfo.mem.used / systemInfo.mem.total) * 100
                )}`}
              >
                {formatPercentage(
                  (systemInfo.mem.used / systemInfo.mem.total) * 100
                )}
              </span>
            </div>

            {/* Disk */}
            <div className="flex items-center space-x-2">
              <HardDrive className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-mono text-gray-300">
                {formatBytes(systemInfo.mem.total)}
              </span>
            </div>

            {/* Network */}
            <div className="flex items-center space-x-2">
              <Wifi className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-mono text-gray-300">Online</span>
            </div>
          </div>
        )}
      </div>

      {/* Center section - Current time */}
      <div className="flex items-center space-x-2">
        <Clock className="w-4 h-4 text-gray-400" />
        <span className="text-sm font-mono text-gray-300">
          {new Date().toLocaleTimeString()}
        </span>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-2">
        {/* Theme toggle */}
        <button
          onClick={() => {
            const themes = ['dark', 'light', 'neon', 'terminal'];
            const currentIndex = themes.indexOf(theme);
            const nextTheme = themes[(currentIndex + 1) % themes.length];
            setTheme(nextTheme as any);
            addNotification({
              type: 'info',
              title: 'Theme Changed',
              message: `Switched to ${nextTheme} theme`,
              duration: 2000,
            });
          }}
          className="p-2 rounded-lg hover:bg-dark-700/50 transition-colors"
          title="Change theme"
        >
          <Settings className="w-4 h-4 text-gray-400" />
        </button>

        {/* Notifications */}
        <button
          onClick={() => {
            addNotification({
              type: 'info',
              title: 'Notifications',
              message: 'No new notifications',
              duration: 3000,
            });
          }}
          className="p-2 rounded-lg hover:bg-dark-700/50 transition-colors relative"
          title="Notifications"
        >
          <Bell className="w-4 h-4 text-gray-400" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Window controls */}
        <div className="flex items-center space-x-1 ml-4">
          <button
            onClick={() => handleWindowControl('minimize')}
            className="p-2 rounded-lg hover:bg-dark-700/50 transition-colors"
            title="Minimize"
          >
            <Minus className="w-4 h-4 text-gray-400" />
          </button>

          <button
            onClick={() => handleWindowControl('maximize')}
            className="p-2 rounded-lg hover:bg-dark-700/50 transition-colors"
            title={isMaximized ? 'Restore' : 'Maximize'}
          >
            {isMaximized ? (
              <Minimize2 className="w-4 h-4 text-gray-400" />
            ) : (
              <Maximize2 className="w-4 h-4 text-gray-400" />
            )}
          </button>

          <button
            onClick={() => handleWindowControl('close')}
            className="p-2 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
