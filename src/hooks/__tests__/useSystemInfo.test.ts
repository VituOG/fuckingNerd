import { renderHook, waitFor } from '@testing-library/react';
import { useSystemInfo } from '../useSystemInfo';

// Mock da Electron API
const mockElectronAPI = {
  system: {
    getInfo: jest.fn(),
  },
  on: jest.fn(),
  removeAllListeners: jest.fn(),
};

// Mock global window.electronAPI
Object.defineProperty(window, 'electronAPI', {
  value: mockElectronAPI,
  writable: true,
});

describe('useSystemInfo Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return initial state', () => {
    const { result } = renderHook(() => useSystemInfo());

    expect(result.current.systemInfo).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  test('should fetch system info on mount', async () => {
    const mockSystemInfo = {
      cpu: { model: 'Intel i7-10700K', cores: 8 },
      memory: { total: 16384, used: 8192 },
      disk: { total: 1000000, used: 500000 },
    };

    mockElectronAPI.system.getInfo.mockResolvedValue(mockSystemInfo);

    const { result } = renderHook(() => useSystemInfo());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.systemInfo).toEqual(mockSystemInfo);
    expect(result.current.error).toBeNull();
    expect(mockElectronAPI.system.getInfo).toHaveBeenCalledTimes(1);
  });

  test('should handle error when system info fetch fails', async () => {
    const mockError = new Error('Failed to fetch system info');
    mockElectronAPI.system.getInfo.mockRejectedValue(mockError);

    const { result } = renderHook(() => useSystemInfo());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.systemInfo).toBeNull();
    expect(result.current.error).toBe(mockError.message);
  });

  test('should set up event listeners on mount', () => {
    renderHook(() => useSystemInfo());

    expect(mockElectronAPI.on).toHaveBeenCalledWith('system-info-update', expect.any(Function));
  });

  test('should clean up event listeners on unmount', () => {
    const { unmount } = renderHook(() => useSystemInfo());

    unmount();

    expect(mockElectronAPI.removeAllListeners).toHaveBeenCalledWith('system-info-update');
  });
}); 