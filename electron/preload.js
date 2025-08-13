const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // System operations
  system: {
    getInfo: () => ipcRenderer.invoke('system:get-info'),
    getProcesses: () => ipcRenderer.invoke('system:get-processes'),
    killProcess: pid => ipcRenderer.invoke('system:kill-process', pid),
    getServices: () => ipcRenderer.invoke('system:get-services'),
    startService: serviceName =>
      ipcRenderer.invoke('system:start-service', serviceName),
    stopService: serviceName =>
      ipcRenderer.invoke('system:stop-service', serviceName),
    cleanTemp: () => ipcRenderer.invoke('system:clean-temp'),
    defrag: driveLetter => ipcRenderer.invoke('system:defrag', driveLetter),
    trim: driveLetter => ipcRenderer.invoke('system:trim', driveLetter),

    // New optimization functions
    createRestorePoint: description =>
      ipcRenderer.invoke('system:create-restore-point', description),
    listRestorePoints: () => ipcRenderer.invoke('system:list-restore-points'),
    removeApps: apps => ipcRenderer.invoke('system:remove-apps', apps),
    optimizeRegistry: optimizations =>
      ipcRenderer.invoke('system:optimize-registry', optimizations),
    optimizeServices: (servicesToDisable, servicesToOptimize) =>
      ipcRenderer.invoke(
        'system:optimize-services',
        servicesToDisable,
        servicesToOptimize
      ),

    // Network Optimizations
    optimizeDNSPriority: () =>
      ipcRenderer.invoke('system:optimize-dns-priority'),
    optimizeNetworkThrottling: () =>
      ipcRenderer.invoke('system:optimize-network-throttling'),
    optimizeTCPIP: () => ipcRenderer.invoke('system:optimize-tcpip'),
    optimizeMTU: () => ipcRenderer.invoke('system:optimize-mtu'),
    optimizeNaglesAlgorithm: () =>
      ipcRenderer.invoke('system:optimize-nagles-algorithm'),
    optimizeNetworkOffload: () =>
      ipcRenderer.invoke('system:optimize-network-offload'),
    manageIPv6: () => ipcRenderer.invoke('system:manage-ipv6'),
    optimizeNetworkInterfaces: () =>
      ipcRenderer.invoke('system:optimize-network-interfaces'),

    // QoS
    qosCreate: (profileName, applicationExe) =>
      ipcRenderer.invoke('system:qos-create', profileName, applicationExe),
    qosRevert: profileName =>
      ipcRenderer.invoke('system:qos-revert', profileName),
    qosList: () => ipcRenderer.invoke('system:qos-list'),

    // GPU Optimizations
    optimizeNVIDIAProfile: () =>
      ipcRenderer.invoke('system:optimize-nvidia-profile'),
    createCustomPowerPlan: () =>
      ipcRenderer.invoke('system:create-custom-power-plan'),
    optimizeGPUMemory: () => ipcRenderer.invoke('system:optimize-gpu-memory'),

    // CPU Optimizations
    optimizeCPUPowerManagement: () =>
      ipcRenderer.invoke('system:optimize-cpu-power-management'),
    optimizeCoreParking: () =>
      ipcRenderer.invoke('system:optimize-core-parking'),
    optimizeFrequencyScaling: () =>
      ipcRenderer.invoke('system:optimize-frequency-scaling'),

    // Memory Optimizations
    optimizeMemoryManagement: () =>
      ipcRenderer.invoke('system:optimize-memory-management'),
    optimizePageFile: () => ipcRenderer.invoke('system:optimize-page-file'),
    optimizeMemoryCompression: () =>
      ipcRenderer.invoke('system:optimize-memory-compression'),
    optimizeMemoryPool: () => ipcRenderer.invoke('system:optimize-memory-pool'),
    optimizeMemoryCache: () =>
      ipcRenderer.invoke('system:optimize-memory-cache'),

    // Storage Optimizations
    optimizeStoragePerformance: () =>
      ipcRenderer.invoke('system:optimize-storage-performance'),
    optimizeDiskCache: () => ipcRenderer.invoke('system:optimize-disk-cache'),
    optimizeFileSystem: () => ipcRenderer.invoke('system:optimize-file-system'),
    optimizeDiskCleanup: () =>
      ipcRenderer.invoke('system:optimize-disk-cleanup'),
    optimizeStoragePolicies: () =>
      ipcRenderer.invoke('system:optimize-storage-policies'),

    // Additional Tools
    manageAutoruns: () => ipcRenderer.invoke('system:manage-autoruns'),
    blockWindowsUpdates: () =>
      ipcRenderer.invoke('system:block-windows-updates'),
    manageUAC: () => ipcRenderer.invoke('system:manage-uac'),
    showFileExtensions: () => ipcRenderer.invoke('system:show-file-extensions'),
    toggleDarkMode: () => ipcRenderer.invoke('system:toggle-dark-mode'),
    optimizePrivacy: () => ipcRenderer.invoke('system:optimize-privacy'),

    // Monitoring and Diagnostics
    getRealPing: () => ipcRenderer.invoke('system:get-real-ping'),
    getSystemHealth: () => ipcRenderer.invoke('system:get-system-health'),
    getPerformanceMetrics: () =>
      ipcRenderer.invoke('system:get-performance-metrics'),
    runDiagnostics: () => ipcRenderer.invoke('system:run-diagnostics'),
    monitorNetwork: () => ipcRenderer.invoke('system:monitor-network'),
  },

  // Store operations
  store: {
    get: key => ipcRenderer.invoke('store:get', key),
    set: (key, value) => ipcRenderer.invoke('store:set', key, value),
    delete: key => ipcRenderer.invoke('store:delete', key),
    has: key => ipcRenderer.invoke('store:has', key),
  },

  // Window controls
  window: {
    minimize: () => ipcRenderer.invoke('window:minimize'),
    maximize: () => ipcRenderer.invoke('window:maximize'),
    close: () => ipcRenderer.invoke('window:close'),
    quit: () => ipcRenderer.invoke('window:quit'),
  },

  // Update operations
  update: {
    install: () => ipcRenderer.invoke('update:install'),
  },

  // Event listeners
  on: (channel, callback) => {
    // Whitelist channels
    const validChannels = [
      'update-available',
      'update-downloaded',
      'navigate',
      'system-info-update',
      'system-alert',
      'process-update',
      'service-update',
    ];

    if (validChannels.includes(channel)) {
      // Remove any existing listeners to prevent duplicates
      ipcRenderer.removeAllListeners(channel);
      ipcRenderer.on(channel, (event, ...args) => callback(...args));
    }
  },

  // Remove event listeners
  removeAllListeners: channel => {
    const validChannels = [
      'update-available',
      'update-downloaded',
      'navigate',
      'system-info-update',
      'system-alert',
      'process-update',
      'service-update',
    ];

    if (validChannels.includes(channel)) {
      ipcRenderer.removeAllListeners(channel);
    }
  },

  // Platform info
  platform: process.platform,

  // Version info
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  },

  // Environment
  isDev: process.env.NODE_ENV === 'development',
});

// Security: Prevent access to Node.js APIs
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});

// Prevent access to require and other Node.js globals
window.require = undefined;
window.module = undefined;
window.process = undefined;
window.global = undefined;
