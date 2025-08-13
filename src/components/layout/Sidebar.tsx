import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Zap,
  Gamepad2,
  Activity,
  Shield,
  Wrench,
  Terminal,
  Settings,
  Info,
  Brain,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { NavigationItem } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navigationItems: NavigationItem[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: LayoutDashboard,
    description: 'System overview and performance',
  },
  {
    path: '/optimization',
    name: 'Optimization',
    icon: Zap,
    description: 'System optimization tools',
  },
  {
    path: '/game-mode',
    name: 'Game Mode',
    icon: Gamepad2,
    description: 'Gaming performance optimization',
  },
  {
    path: '/monitoring',
    name: 'Monitoring',
    icon: Activity,
    description: 'Real-time system monitoring',
  },
  {
    path: '/security',
    name: 'Security',
    icon: Shield,
    description: 'Security and privacy tools',
  },
  {
    path: '/tools',
    name: 'Tools',
    icon: Wrench,
    description: 'Advanced system tools',
  },
  {
    path: '/terminal',
    name: 'Terminal',
    icon: Terminal,
    description: 'Command line interface',
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: Settings,
    description: 'Application settings',
  },
  {
    path: '/about',
    name: 'About',
    icon: Info,
    description: 'About NeuroCore Optimizer',
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { theme } = useTheme();

  const getThemeStyles = () => {
    switch (theme) {
      case 'neon':
        return 'bg-black/90 backdrop-blur-md border-neon-green/30';
      case 'terminal':
        return 'bg-black/95 backdrop-blur-md border-green-500/30';
      case 'light':
        return 'bg-white/95 backdrop-blur-md border-gray-200';
      default:
        return 'bg-dark-800/95 backdrop-blur-md border-dark-600';
    }
  };

  const getTextColor = () => {
    switch (theme) {
      case 'neon':
        return 'text-neon-green';
      case 'terminal':
        return 'text-green-500';
      case 'light':
        return 'text-gray-900';
      default:
        return 'text-gray-100';
    }
  };

  const getHoverColor = () => {
    switch (theme) {
      case 'neon':
        return 'hover:bg-neon-green/10 hover:text-neon-green';
      case 'terminal':
        return 'hover:bg-green-500/10 hover:text-green-400';
      case 'light':
        return 'hover:bg-gray-100 hover:text-gray-900';
      default:
        return 'hover:bg-dark-700 hover:text-white';
    }
  };

  const getActiveColor = () => {
    switch (theme) {
      case 'neon':
        return 'bg-neon-green/20 text-neon-green border-neon-green/50';
      case 'terminal':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'light':
        return 'bg-primary-100 text-primary-700 border-primary-300';
      default:
        return 'bg-primary-600/20 text-primary-400 border-primary-500/50';
    }
  };

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isOpen ? 256 : 0,
        opacity: isOpen ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed left-0 top-0 h-full ${getThemeStyles()} border-r shadow-xl z-40 overflow-hidden`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-inherit">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
            transition={{ delay: 0.1 }}
            className="flex items-center space-x-3"
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">NeuroCore</h1>
              <p className="text-xs text-gray-400">Optimizer</p>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.8 }}
            transition={{ delay: 0.2 }}
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-dark-700/50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  x: isOpen ? 0 : -20,
                }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${
                      isActive
                        ? getActiveColor()
                        : `${getTextColor()} ${getHoverColor()}`
                    }
                    ${
                      item.disabled
                        ? 'opacity-50 cursor-not-allowed'
                        : 'cursor-pointer'
                    }
                  `}
                  title={item.description}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium truncate">{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </motion.div>
            );
          })}
        </nav>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
          transition={{ delay: 0.3 }}
          className="p-4 border-t border-inherit"
        >
          <div className="text-center">
            <p className="text-xs text-gray-400 mb-2">NeuroCore Optimizer</p>
            <p className="text-xs text-gray-500">v1.0.0</p>
          </div>
        </motion.div>
      </div>

      {/* Toggle button when closed */}
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          onClick={onToggle}
          className="absolute top-4 left-4 p-2 rounded-lg bg-dark-800/90 backdrop-blur-md border border-dark-600 hover:bg-dark-700 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </motion.button>
      )}
    </motion.aside>
  );
};

export default Sidebar;
