import { useState, useEffect } from 'react';
import { SystemInfo, PerformanceMetrics } from '@/types';

export const useSystemInfo = () => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [performanceMetrics, setPerformanceMetrics] =
    useState<PerformanceMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial system info
  useEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        setLoading(true);
        setError(null);

        if (window.electronAPI) {
          const info = await window.electronAPI.system.getInfo();
          setSystemInfo(info);
        }
      } catch (err) {
        console.error('Error fetching system info:', err);
        setError('Failed to load system information');
      } finally {
        setLoading(false);
      }
    };

    fetchSystemInfo();
  }, []);

  // Real-time performance monitoring
  useEffect(() => {
    if (!window.electronAPI) return;

    let intervalId: number | null = null;

    const startMonitoring = () => {
      intervalId = window.setInterval(async () => {
        try {
          // Get real-time metrics
          const metrics = await getPerformanceMetrics();
          setPerformanceMetrics(metrics);
        } catch (err) {
          console.error('Error fetching performance metrics:', err);
        }
      }, 1000); // Update every second
    };

    // Subscribe to system info updates from Electron (if provided)
    try {
      window.electronAPI.on(
        'system-info-update',
        (info: SystemInfo, metrics?: PerformanceMetrics) => {
          if (info) setSystemInfo(info);
          if (metrics) setPerformanceMetrics(metrics);
        }
      );
    } catch (err) {
      console.debug(
        'electronAPI bridge not available for system-info-update listener'
      );
    }

    startMonitoring();

    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
      try {
        window.electronAPI.removeAllListeners('system-info-update');
      } catch (err) {
        console.debug('electronAPI bridge not available to remove listeners');
      }
    };
  }, []);

  const getPerformanceMetrics = async (): Promise<PerformanceMetrics> => {
    const timestamp = Date.now();

    try {
      // Get CPU usage
      const cpuUsage = await getCPUUsage();

      // Get memory usage
      const memoryUsage = await getMemoryUsage();

      // Get disk metrics
      const diskMetrics = await getDiskMetrics();

      // Get network metrics
      const networkMetrics = await getNetworkMetrics();

      // Get GPU metrics (if available)
      const gpuMetrics = await getGPUMetrics();

      return {
        timestamp,
        cpu: cpuUsage,
        memory: memoryUsage,
        disk: diskMetrics,
        network: networkMetrics,
        gpu: gpuMetrics,
      };
    } catch (error) {
      console.error('Error getting performance metrics:', error);
      throw error;
    }
  };

  const getCPUUsage = async () => {
    // This would typically use systeminformation or similar
    // For now, return mock data
    return {
      usage: Math.random() * 100,
      temperature: 45 + Math.random() * 30,
      frequency: 2000 + Math.random() * 2000,
      cores: systemInfo?.cpu.cores
        ? Array.from({ length: systemInfo.cpu.cores }, (_, i) => ({
            core: i,
            usage: Math.random() * 100,
            frequency: 2000 + Math.random() * 2000,
            temperature: 45 + Math.random() * 30,
          }))
        : [],
    };
  };

  const getMemoryUsage = async () => {
    if (!systemInfo?.mem) {
      return {
        total: 0,
        used: 0,
        free: 0,
        usage: 0,
      };
    }

    const { total, used, free } = systemInfo.mem;
    const usage = (used / total) * 100;

    return {
      total,
      used,
      free,
      usage,
    };
  };

  const getDiskMetrics = async () => {
    if (!systemInfo?.disk) {
      return [];
    }

    // Mock disk metrics for now
    return systemInfo.disk.map(disk => ({
      device: disk.device,
      readBytes: Math.random() * 1000000,
      writeBytes: Math.random() * 1000000,
      readCount: Math.floor(Math.random() * 1000),
      writeCount: Math.floor(Math.random() * 1000),
      queueLength: Math.random() * 10,
      responseTime: Math.random() * 100,
      usage: Math.random() * 100,
    }));
  };

  const getNetworkMetrics = async () => {
    // Mock network metrics for now
    return [
      {
        interface: 'Ethernet',
        rxBytes: Math.random() * 1000000,
        txBytes: Math.random() * 1000000,
        rxPackets: Math.floor(Math.random() * 10000),
        txPackets: Math.floor(Math.random() * 10000),
        rxErrors: Math.floor(Math.random() * 10),
        txErrors: Math.floor(Math.random() * 10),
        speed: 1000,
      },
      {
        interface: 'Wi-Fi',
        rxBytes: Math.random() * 500000,
        txBytes: Math.random() * 500000,
        rxPackets: Math.floor(Math.random() * 5000),
        txPackets: Math.floor(Math.random() * 5000),
        rxErrors: Math.floor(Math.random() * 5),
        txErrors: Math.floor(Math.random() * 5),
        speed: 500,
      },
    ];
  };

  const getGPUMetrics = async () => {
    // Mock GPU metrics for now
    // In a real implementation, this would use GPU monitoring libraries
    return {
      name: 'NVIDIA GeForce RTX 3080',
      usage: Math.random() * 100,
      memory: {
        total: 10240,
        used: Math.random() * 10240,
        free: Math.random() * 10240,
        usage: Math.random() * 100,
      },
      temperature: 50 + Math.random() * 40,
      frequency: 1500 + Math.random() * 500,
      power: 200 + Math.random() * 100,
    };
  };

  const refreshSystemInfo = async () => {
    try {
      setLoading(true);
      setError(null);

      if (window.electronAPI) {
        const info = await window.electronAPI.system.getInfo();
        setSystemInfo(info);
      }
    } catch (err) {
      console.error('Error refreshing system info:', err);
      setError('Failed to refresh system information');
    } finally {
      setLoading(false);
    }
  };

  return {
    systemInfo,
    performanceMetrics,
    loading,
    error,
    refreshSystemInfo,
  };
};
