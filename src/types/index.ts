// System Information Types
export interface SystemInfo {
  cpu: CPUInfo;
  mem: MemoryInfo;
  disk: DiskInfo[];
  os: OSInfo;
}

export interface CPUInfo {
  manufacturer: string;
  brand: string;
  physicalCores: number;
  cores: number;
  speed: number;
  speedMax: number;
  cache: {
    l1d: number;
    l1i: number;
    l2: number;
    l3: number;
  };
  temperature?: number;
  usage?: number;
}

export interface MemoryInfo {
  total: number;
  used: number;
  free: number;
  active: number;
  available: number;
  swaptotal: number;
  swapused: number;
  swapfree: number;
  usage?: number;
}

export interface DiskInfo {
  device: string;
  type: string;
  name: string;
  vendor: string;
  size: number;
  serial: string;
  interfaceType: string;
  smartStatus: string;
  temperature?: number;
  health?: number;
}

export interface OSInfo {
  platform: string;
  distro: string;
  release: string;
  codename: string;
  kernel: string;
  arch: string;
  hostname: string;
  fqdn: string;
  codepage: string;
  logofile: string;
  serial: string;
  build: string;
  servicepack: string;
  uefi: boolean;
}

// Process Types
export interface Process {
  pid: number;
  name: string;
  cmd: string;
  cpu: number;
  memory: number;
  ppid: number;
  uid: number;
  gid: number;
  username: string;
  vmem: number;
  pmem: number;
  pcpu: number;
  start: string;
  time: string;
  state: string;
  nice: number;
  priority: number;
}

// Service Types
export interface Service {
  name: string;
  displayName: string;
  status: 'running' | 'stopped' | 'paused' | 'start_pending' | 'stop_pending';
  startType: 'automatic' | 'manual' | 'disabled' | 'automatic_delayed_start';
  description?: string;
  pid?: number;
  dependencies?: string[];
}

// Performance Monitoring Types
export interface PerformanceMetrics {
  timestamp: number;
  cpu: {
    usage: number;
    temperature: number;
    frequency: number;
    cores: CoreMetrics[];
  };
  memory: {
    total: number;
    used: number;
    free: number;
    usage: number;
  };
  disk: DiskMetrics[];
  network: NetworkMetrics[];
  gpu?: GPUMetrics;
}

export interface CoreMetrics {
  core: number;
  usage: number;
  frequency: number;
  temperature: number;
}

export interface DiskMetrics {
  device: string;
  readBytes: number;
  writeBytes: number;
  readCount: number;
  writeCount: number;
  queueLength: number;
  responseTime: number;
  usage: number;
}

export interface NetworkMetrics {
  interface: string;
  rxBytes: number;
  txBytes: number;
  rxPackets: number;
  txPackets: number;
  rxErrors: number;
  txErrors: number;
  speed: number;
}

export interface GPUMetrics {
  name: string;
  usage: number;
  memory: {
    total: number;
    used: number;
    free: number;
    usage: number;
  };
  temperature: number;
  frequency: number;
  power: number;
}

// Optimization Types
export interface OptimizationResult {
  success: boolean;
  message: string;
  duration: number;
  timestamp: number;
  data?: any; // Optional data for monitoring and diagnostics
}

export interface CleanupResult {
  tempFiles: {
    size: number;
    count: number;
    files: string[];
  };
  cacheFiles: {
    size: number;
    count: number;
    files: string[];
  };
  logFiles: {
    size: number;
    count: number;
    files: string[];
  };
  totalSize: number;
  totalFiles: number;
}

// Game Mode Types
export interface GameModeConfig {
  enabled: boolean;
  autoEnable: boolean;
  processes: string[];
  services: string[];
  priority: 'high' | 'realtime';
  memoryCleanup: boolean;
  networkOptimization: boolean;
  gpuOptimization: boolean;
}

export interface GameModeStatus {
  active: boolean;
  startTime?: number;
  duration?: number;
  processesKilled: number;
  servicesStopped: number;
  memoryFreed: number;
  performanceGain: number;
}

// Security Types
export interface SecurityScan {
  spyware: SpywareResult[];
  suspiciousProcesses: Process[];
  openPorts: PortInfo[];
  firewallStatus: FirewallStatus;
  permissions: PermissionAudit[];
}

export interface SpywareResult {
  name: string;
  type: 'spyware' | 'adware' | 'malware' | 'suspicious';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  location: string;
  detected: boolean;
  removed: boolean;
}

export interface PortInfo {
  port: number;
  protocol: 'tcp' | 'udp';
  state: 'open' | 'closed' | 'filtered';
  service: string;
  process?: string;
  pid?: number;
}

export interface FirewallStatus {
  enabled: boolean;
  profiles: {
    domain: boolean;
    private: boolean;
    public: boolean;
  };
  rules: FirewallRule[];
}

export interface FirewallRule {
  name: string;
  enabled: boolean;
  direction: 'inbound' | 'outbound';
  action: 'allow' | 'block';
  protocol: string;
  localPort: string;
  remotePort: string;
  program: string;
}

export interface PermissionAudit {
  path: string;
  permissions: string;
  owner: string;
  group: string;
  recommendations: string[];
}

// Theme Types
export type Theme = 'dark' | 'light' | 'neon' | 'terminal';

export interface ThemeConfig {
  current: Theme;
  autoSwitch: boolean;
  customColors?: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
  };
}

// Settings Types
export interface AppSettings {
  theme: ThemeConfig;
  monitoring: {
    enabled: boolean;
    interval: number;
    historyLength: number;
    alerts: AlertConfig;
  };
  optimization: {
    autoCleanup: boolean;
    autoDefrag: boolean;
    autoTrim: boolean;
    schedule: OptimizationSchedule;
  };
  security: {
    autoScan: boolean;
    realTimeProtection: boolean;
    firewallManagement: boolean;
  };
  gameMode: GameModeConfig;
  notifications: NotificationSettings;
  logging: LoggingConfig;
}

export interface AlertConfig {
  cpuThreshold: number;
  memoryThreshold: number;
  temperatureThreshold: number;
  diskThreshold: number;
  enabled: boolean;
  sound: boolean;
  desktop: boolean;
}

export interface OptimizationSchedule {
  enabled: boolean;
  frequency: 'daily' | 'weekly' | 'monthly';
  time: string;
  day?: number;
  tasks: string[];
}

export interface NotificationSettings {
  enabled: boolean;
  types: {
    system: boolean;
    optimization: boolean;
    security: boolean;
    gameMode: boolean;
    updates: boolean;
  };
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  duration: number;
}

export interface LoggingConfig {
  level: 'error' | 'warn' | 'info' | 'debug';
  maxFiles: number;
  maxSize: number;
  console: boolean;
  file: boolean;
}

// Plugin Types
export interface Plugin {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  enabled: boolean;
  config: Record<string, any>;
  dependencies: string[];
  permissions: string[];
}

// Update Types
export interface UpdateInfo {
  version: string;
  releaseDate: string;
  description: string;
  downloadUrl: string;
  size: number;
  mandatory: boolean;
  changelog: string[];
}

// Error Types
export interface AppError {
  id: string;
  type: 'system' | 'optimization' | 'security' | 'network' | 'unknown';
  message: string;
  details?: string;
  stack?: string;
  timestamp: number;
  resolved: boolean;
}

// Navigation Types
export type Route =
  | '/'
  | '/dashboard'
  | '/optimization'
  | '/game-mode'
  | '/monitoring'
  | '/security'
  | '/tools'
  | '/terminal'
  | '/settings'
  | '/about';

import { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  path: Route;
  name: string;
  icon: LucideIcon;
  description: string;
  badge?: number;
  disabled?: boolean;
}
