import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import NotificationProvider from './components/providers/NotificationProvider';
import ThemeProvider from './components/providers/ThemeProvider';
import LoadingScreen from './components/ui/LoadingScreen';

// Pages
import Dashboard from './pages/Dashboard';
import Optimization from './pages/Optimization';
import GameMode from './pages/GameMode';
import Monitoring from './pages/Monitoring';
import Security from './pages/Security';
import Tools from './pages/Tools';
import Terminal from './pages/Terminal';
import Settings from './pages/Settings';
import About from './pages/About';

// Hooks
import { useSystemInfo } from './hooks/useSystemInfo';
import { useTheme } from './hooks/useTheme';

// Types

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { theme } = useTheme();
  const { systemInfo, loading: systemLoading } = useSystemInfo();

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Set theme on document
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Show loading screen while system info is loading
  if (isLoading || systemLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <NotificationProvider>
        <div className="flex h-screen bg-gray-50 dark:bg-dark-900 overflow-hidden">
          {/* Sidebar */}
          <Sidebar
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
          />

          {/* Main Content */}
          <div
            className={`flex-1 flex flex-col transition-all duration-300 ${
              sidebarOpen ? 'ml-64' : 'ml-0'
            }`}
          >
            {/* Header */}
            <Header
              onMenuClick={() => setSidebarOpen(!sidebarOpen)}
              systemInfo={systemInfo}
            />

            {/* Page Content */}
            <main className="flex-1 overflow-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/optimization" element={<Optimization />} />
                    <Route path="/game-mode" element={<GameMode />} />
                    <Route path="/monitoring" element={<Monitoring />} />
                    <Route path="/security" element={<Security />} />
                    <Route path="/tools" element={<Tools />} />
                    <Route path="/terminal" element={<Terminal />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/about" element={<About />} />
                  </Routes>
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
