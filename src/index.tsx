import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';

// Declare global types for Electron API
declare global {
  interface Window {
    electronAPI: {
      system: {
        getInfo: () => Promise<any>;
        getProcesses: () => Promise<any[]>;
        killProcess: (pid: number) => Promise<boolean>;
        getServices: () => Promise<string>;
        startService: (serviceName: string) => Promise<boolean>;
        stopService: (serviceName: string) => Promise<boolean>;
        cleanTemp: () => Promise<any>;
        defrag: (driveLetter: string) => Promise<string>;
        trim: (driveLetter: string) => Promise<string>;

        // New optimization functions
        createRestorePoint: (description: string) => Promise<any>;
        listRestorePoints: () => Promise<any>;
        removeApps: (apps: string[]) => Promise<any>;
        optimizeRegistry: (optimizations: any[]) => Promise<any>;
        optimizeServices: (
          servicesToDisable: string[],
          servicesToOptimize: string[]
        ) => Promise<any>;

        // Network Optimizations
        optimizeDNSPriority: () => Promise<any>;
        optimizeNetworkThrottling: () => Promise<any>;
        optimizeTCPIP: () => Promise<any>;
        optimizeMTU: () => Promise<any>;
        optimizeNaglesAlgorithm: () => Promise<any>;
        optimizeNetworkOffload: () => Promise<any>;
        manageIPv6: () => Promise<any>;
        optimizeNetworkInterfaces: () => Promise<any>;

        // GPU Optimizations
        optimizeNVIDIAProfile: () => Promise<any>;
        createCustomPowerPlan: () => Promise<any>;
        optimizeGPUMemory: () => Promise<any>;

        // CPU Optimizations
        optimizeCPUPowerManagement: () => Promise<any>;
        optimizeCoreParking: () => Promise<any>;
        optimizeFrequencyScaling: () => Promise<any>;

        // Memory Optimizations
        optimizeMemoryManagement: () => Promise<any>;
        optimizePageFile: () => Promise<any>;
        optimizeMemoryCompression: () => Promise<any>;
        optimizeMemoryPool: () => Promise<any>;
        optimizeMemoryCache: () => Promise<any>;

        // Storage Optimizations
        optimizeStoragePerformance: () => Promise<any>;
        optimizeDiskCache: () => Promise<any>;
        optimizeFileSystem: () => Promise<any>;
        optimizeDiskCleanup: () => Promise<any>;
        optimizeStoragePolicies: () => Promise<any>;

        // Additional Tools
        manageAutoruns: () => Promise<any>;
        blockWindowsUpdates: () => Promise<any>;
        manageUAC: () => Promise<any>;
        showFileExtensions: () => Promise<any>;
        toggleDarkMode: () => Promise<any>;
        optimizePrivacy: () => Promise<any>;

        // Monitoring and Diagnostics
        getRealPing: () => Promise<any>;
        getSystemHealth: () => Promise<any>;
        getPerformanceMetrics: () => Promise<any>;
        runDiagnostics: () => Promise<any>;
        monitorNetwork: () => Promise<any>;
      };
      store: {
        get: (key: string) => Promise<any>;
        set: (key: string, value: any) => Promise<boolean>;
        delete: (key: string) => Promise<boolean>;
        has: (key: string) => Promise<boolean>;
      };
      window: {
        minimize: () => Promise<void>;
        maximize: () => Promise<void>;
        close: () => Promise<void>;
        quit: () => Promise<void>;
      };
      update: {
        install: () => Promise<void>;
      };
      on: (channel: string, callback: (...args: any[]) => void) => void;
      removeAllListeners: (channel: string) => void;
      platform: string;
      versions: {
        node: string;
        chrome: string;
        electron: string;
      };
      isDev: boolean;
    };
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
