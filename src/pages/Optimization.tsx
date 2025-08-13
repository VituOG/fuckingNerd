import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import OptimizationCard from '../components/optimization/OptimizationCard';
import {
  systemOptimization,
  OptimizationResult,
} from '../services/systemOptimization';

interface OptimizationStatus {
  id: string;
  status: 'pending' | 'completed' | 'failed' | 'running';
  lastRun?: number;
  result?: OptimizationResult;
}

const Optimization: React.FC = () => {
  const [optimizationStatus, setOptimizationStatus] = useState<
    Record<string, OptimizationStatus>
  >({});
  // Removed unused local loading state to satisfy linter

  // Initialize optimization status
  useEffect(() => {
    const initialStatus: Record<string, OptimizationStatus> = {
      'restore-point': { id: 'restore-point', status: 'pending' },
      debloat: { id: 'debloat', status: 'pending' },
      registry: { id: 'registry', status: 'pending' },
      services: { id: 'services', status: 'pending' },
      'temp-cleanup': { id: 'temp-cleanup', status: 'pending' },
      'disk-optimization': { id: 'disk-optimization', status: 'pending' },
      'trim-ssd': { id: 'trim-ssd', status: 'pending' },
    };
    setOptimizationStatus(initialStatus);
  }, []);

  const updateStatus = (
    id: string,
    status: OptimizationStatus['status'],
    result?: OptimizationResult
  ) => {
    setOptimizationStatus(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        status,
        lastRun: Date.now(),
        result,
      },
    }));
  };

  const optimizationCards = [
    {
      id: 'restore-point',
      title: 'Criar Restore Point',
      description:
        'Cria um ponto de restauração do sistema antes de aplicar otimizações. Recomendado para segurança.',
      category: 'Sistema',
      estimatedTime: 30,
      warning: 'Requer privilégios de administrador',
      onOptimize: async () => {
        updateStatus('restore-point', 'running');
        try {
          const result = await systemOptimization.createRestorePoint();
          updateStatus(
            'restore-point',
            result.success ? 'completed' : 'failed',
            result
          );
        } catch (error) {
          updateStatus('restore-point', 'failed');
        }
      },
    },
    {
      id: 'debloat',
      title: 'Remover Apps Pré-instalados',
      description:
        'Remove aplicativos desnecessários do Windows como Bing Weather, Get Help, 3D Viewer, etc.',
      category: 'Debloat',
      estimatedTime: 45,
      warning: 'Alguns apps podem ser úteis. Revise antes de remover.',
      onOptimize: async () => {
        updateStatus('debloat', 'running');
        try {
          const result = await systemOptimization.removePreinstalledApps();
          updateStatus(
            'debloat',
            result.success ? 'completed' : 'failed',
            result
          );
        } catch (error) {
          updateStatus('debloat', 'failed');
        }
      },
    },
    {
      id: 'registry',
      title: 'Otimizar Registro',
      description:
        'Aplica otimizações no registro do Windows para melhorar performance e desabilitar telemetria.',
      category: 'Sistema',
      estimatedTime: 25,
      warning: 'Modifica configurações do sistema. Use com cuidado.',
      onOptimize: async () => {
        updateStatus('registry', 'running');
        try {
          const result = await systemOptimization.optimizeRegistry();
          updateStatus(
            'registry',
            result.success ? 'completed' : 'failed',
            result
          );
        } catch (error) {
          updateStatus('registry', 'failed');
        }
      },
    },
    {
      id: 'services',
      title: 'Otimizar Serviços',
      description:
        'Desabilita serviços desnecessários e otimiza serviços críticos para melhor performance.',
      category: 'Sistema',
      estimatedTime: 35,
      warning: 'Alguns serviços são essenciais. Não desabilite se não souber.',
      onOptimize: async () => {
        updateStatus('services', 'running');
        try {
          const result = await systemOptimization.optimizeServices();
          updateStatus(
            'services',
            result.success ? 'completed' : 'failed',
            result
          );
        } catch (error) {
          updateStatus('services', 'failed');
        }
      },
    },
    {
      id: 'temp-cleanup',
      title: 'Limpar Arquivos Temporários',
      description:
        'Remove arquivos temporários, cache e logs desnecessários para liberar espaço em disco.',
      category: 'Limpeza',
      estimatedTime: 20,
      onOptimize: async () => {
        updateStatus('temp-cleanup', 'running');
        try {
          const result = await systemOptimization.cleanTempFiles();
          updateStatus(
            'temp-cleanup',
            result.success ? 'completed' : 'failed',
            result
          );
        } catch (error) {
          updateStatus('temp-cleanup', 'failed');
        }
      },
    },
    {
      id: 'disk-optimization',
      title: 'Otimizar Disco',
      description:
        'Executa desfragmentação e otimização do disco para melhorar performance de leitura/escrita.',
      category: 'Armazenamento',
      estimatedTime: 120,
      warning: 'Pode demorar dependendo do tamanho do disco.',
      onOptimize: async () => {
        updateStatus('disk-optimization', 'running');
        try {
          const result = await systemOptimization.optimizeDisk('C');
          updateStatus(
            'disk-optimization',
            result.success ? 'completed' : 'failed',
            result
          );
        } catch (error) {
          updateStatus('disk-optimization', 'failed');
        }
      },
    },
    {
      id: 'trim-ssd',
      title: 'Executar TRIM (SSD)',
      description:
        'Executa operação TRIM em SSDs para manter performance e longevidade do dispositivo.',
      category: 'Armazenamento',
      estimatedTime: 15,
      warning: 'Apenas para SSDs. Não execute em HDs tradicionais.',
      onOptimize: async () => {
        updateStatus('trim-ssd', 'running');
        try {
          const result = await systemOptimization.trimSSD('C');
          updateStatus(
            'trim-ssd',
            result.success ? 'completed' : 'failed',
            result
          );
        } catch (error) {
          updateStatus('trim-ssd', 'failed');
        }
      },
    },

    // Network Optimizations (Muito Avançadas!)
    {
      id: 'optimize-dns-priority',
      title: 'DNS Priority Settings',
      description:
        'Otimiza as configurações de prioridade DNS para melhorar a resolução de nomes e reduzir latência de rede.',
      category: 'Rede',
      estimatedTime: 15,
      onOptimize: () => systemOptimization.optimizeDNSPriority(),
      warning: 'Requer reinicialização da rede',
    },
    {
      id: 'optimize-network-throttling',
      title: 'Network Throttling Index',
      description:
        'Remove limitações de throttling de rede para melhorar a velocidade de conexão e reduzir latência.',
      category: 'Rede',
      estimatedTime: 20,
      onOptimize: () => systemOptimization.optimizeNetworkThrottling(),
      warning: 'Pode afetar outras aplicações',
    },
    {
      id: 'optimize-tcpip',
      title: 'TCP/IP Optimizations',
      description:
        'Otimiza parâmetros TCP/IP para gaming, incluindo TcpTimedWaitDelay, MaxUserPort e outros.',
      category: 'Rede',
      estimatedTime: 25,
      onOptimize: () => systemOptimization.optimizeTCPIP(),
      warning: 'Requer reinicialização da rede',
    },
    {
      id: 'optimize-mtu',
      title: 'MTU Optimization',
      description:
        'Ajusta o MTU para melhor throughput e performance de rede, otimizado para gaming.',
      category: 'Rede',
      estimatedTime: 18,
      onOptimize: () => systemOptimization.optimizeMTU(),
      warning: 'Pode causar problemas em algumas redes',
    },
    {
      id: 'optimize-nagles-algorithm',
      title: "Nagle's Algorithm",
      description:
        'Desabilita o algoritmo de Nagle para reduzir latência em jogos online e aplicações em tempo real.',
      category: 'Rede',
      estimatedTime: 12,
      onOptimize: () => systemOptimization.optimizeNaglesAlgorithm(),
      warning: 'Aumenta o uso de banda',
    },
    {
      id: 'optimize-network-offload',
      title: 'Network Offload Settings',
      description:
        'Desabilita recursos de offload de rede que podem causar latência em jogos competitivos.',
      category: 'Rede',
      estimatedTime: 22,
      onOptimize: () => systemOptimization.optimizeNetworkOffload(),
      warning: 'Pode aumentar uso de CPU',
    },
    {
      id: 'manage-ipv6',
      title: 'IPv6 Management',
      description:
        'Gerencia configurações IPv6 para otimizar performance de rede e reduzir overhead.',
      category: 'Rede',
      estimatedTime: 16,
      onOptimize: () => systemOptimization.manageIPv6(),
      warning: 'Desabilita IPv6 temporariamente',
    },
    {
      id: 'optimize-network-interfaces',
      title: 'Network Interface Optimizations',
      description:
        'Otimiza configurações avançadas das interfaces de rede para melhor performance.',
      category: 'Rede',
      estimatedTime: 30,
      onOptimize: () => systemOptimization.optimizeNetworkInterfaces(),
      warning: 'Requer reinicialização da rede',
    },

    // GPU Optimizations
    {
      id: 'optimize-nvidia-profile',
      title: 'NVIDIA Profile Inspector',
      description:
        'Otimiza configurações avançadas do driver NVIDIA para melhor performance em jogos.',
      category: 'GPU',
      estimatedTime: 35,
      onOptimize: () => systemOptimization.optimizeNVIDIAProfile(),
      warning: 'Requer reinicialização do driver',
    },
    {
      id: 'create-custom-power-plan',
      title: 'Power Plan Customizado',
      description:
        'Cria um plano de energia otimizado para gaming com configurações de CPU e GPU.',
      category: 'GPU',
      estimatedTime: 40,
      onOptimize: () => systemOptimization.createCustomPowerPlan(),
      warning: 'Substitui o plano atual',
    },
    {
      id: 'optimize-gpu-memory',
      title: 'GPU Memory Management',
      description:
        'Otimiza o gerenciamento de memória da GPU para melhor performance e estabilidade.',
      category: 'GPU',
      estimatedTime: 28,
      onOptimize: () => systemOptimization.optimizeGPUMemory(),
      warning: 'Pode afetar outras aplicações',
    },

    // CPU Optimizations
    {
      id: 'cpu-power-management',
      title: 'Gerenciamento de Energia da CPU',
      description:
        'Otimiza as configurações de energia da CPU para melhor performance em jogos.',
      category: 'CPU',
      estimatedTime: 3,
      onOptimize: () => systemOptimization.optimizeCPUPowerManagement(),
      warning: 'Requer reinicialização para aplicar todas as mudanças.',
    },
    {
      id: 'core-parking',
      title: 'Core Parking',
      description:
        'Desabilita o Core Parking para manter todos os cores ativos durante jogos.',
      category: 'CPU',
      estimatedTime: 2,
      onOptimize: () => systemOptimization.optimizeCoreParking(),
    },
    {
      id: 'frequency-scaling',
      title: 'Frequency Scaling',
      description:
        'Otimiza o escalonamento de frequência da CPU para performance máxima.',
      category: 'CPU',
      estimatedTime: 3,
      onOptimize: () => systemOptimization.optimizeFrequencyScaling(),
    },

    // Memory Optimizations
    {
      id: 'memory-management',
      title: 'Gerenciamento de Memória',
      description:
        'Otimiza as configurações de gerenciamento de memória do sistema.',
      category: 'Memória',
      estimatedTime: 3,
      onOptimize: () => systemOptimization.optimizeMemoryManagement(),
      warning: 'Algumas configurações podem requerer reinicialização.',
    },
    {
      id: 'page-file',
      title: 'Arquivo de Paginação',
      description:
        'Otimiza o arquivo de paginação para melhor performance de memória.',
      category: 'Memória',
      estimatedTime: 4,
      onOptimize: () => systemOptimization.optimizePageFile(),
      warning:
        'Requer reinicialização para aplicar mudanças no arquivo de paginação.',
    },
    {
      id: 'memory-compression',
      title: 'Compressão de Memória',
      description:
        'Desabilita a compressão de memória para melhor performance em jogos.',
      category: 'Memória',
      estimatedTime: 2,
      onOptimize: () => systemOptimization.optimizeMemoryCompression(),
    },
    {
      id: 'memory-pool',
      title: 'Pool de Memória',
      description: 'Otimiza os pools de memória paginada e não-paginada.',
      category: 'Memória',
      estimatedTime: 3,
      onOptimize: () => systemOptimization.optimizeMemoryPool(),
    },
    {
      id: 'memory-cache',
      title: 'Cache de Memória',
      description: 'Otimiza as configurações de cache de memória do sistema.',
      category: 'Memória',
      estimatedTime: 3,
      onOptimize: () => systemOptimization.optimizeMemoryCache(),
    },

    // Storage Optimizations
    {
      id: 'storage-performance',
      title: 'Performance de Armazenamento',
      description:
        'Otimiza as configurações de performance do sistema de armazenamento.',
      category: 'Armazenamento',
      estimatedTime: 4,
      onOptimize: () => systemOptimization.optimizeStoragePerformance(),
      warning: 'Requer reinicialização para aplicar todas as mudanças.',
    },
    {
      id: 'disk-cache',
      title: 'Cache de Disco',
      description:
        'Otimiza as configurações de cache de disco para melhor performance.',
      category: 'Armazenamento',
      estimatedTime: 4,
      onOptimize: () => systemOptimization.optimizeDiskCache(),
    },
    {
      id: 'file-system',
      title: 'Sistema de Arquivos',
      description: 'Otimiza as configurações do sistema de arquivos NTFS.',
      category: 'Armazenamento',
      estimatedTime: 4,
      onOptimize: () => systemOptimization.optimizeFileSystem(),
      warning:
        'Requer reinicialização para aplicar mudanças no sistema de arquivos.',
    },
    {
      id: 'disk-cleanup',
      title: 'Limpeza de Disco',
      description: 'Executa limpeza automática de arquivos temporários e logs.',
      category: 'Armazenamento',
      estimatedTime: 5,
      onOptimize: () => systemOptimization.optimizeDiskCleanup(),
      warning: 'Remove arquivos temporários e logs do sistema.',
    },
    {
      id: 'storage-policies',
      title: 'Políticas de Armazenamento',
      description: 'Otimiza as políticas de armazenamento do sistema.',
      category: 'Armazenamento',
      estimatedTime: 3,
      onOptimize: () => systemOptimization.optimizeStoragePolicies(),
    },

    // Additional Tools
    {
      id: 'autoruns',
      title: 'Gerenciamento de Inicialização',
      description:
        'Remove programas desnecessários da inicialização do sistema.',
      category: 'Ferramentas',
      estimatedTime: 3,
      onOptimize: () => systemOptimization.manageAutoruns(),
      warning: 'Remove todos os programas da inicialização automática.',
    },
    {
      id: 'windows-updates',
      title: 'Bloqueio de Atualizações',
      description:
        'Desabilita serviços de atualização do Windows para melhor performance.',
      category: 'Ferramentas',
      estimatedTime: 3,
      onOptimize: () => systemOptimization.blockWindowsUpdates(),
      warning: 'Desabilita atualizações automáticas do Windows.',
    },
    {
      id: 'uac',
      title: 'Gerenciamento UAC',
      description: 'Otimiza as configurações do Controle de Conta de Usuário.',
      category: 'Ferramentas',
      estimatedTime: 2,
      onOptimize: () => systemOptimization.manageUAC(),
      warning: 'Reduz prompts de UAC - use com cuidado.',
    },
    {
      id: 'file-extensions',
      title: 'Mostrar Extensões',
      description: 'Exibe extensões de arquivo e arquivos ocultos no Explorer.',
      category: 'Ferramentas',
      estimatedTime: 2,
      onOptimize: () => systemOptimization.showFileExtensions(),
    },
    {
      id: 'dark-mode',
      title: 'Modo Escuro',
      description:
        'Ativa o modo escuro do Windows e desabilita efeitos visuais.',
      category: 'Ferramentas',
      estimatedTime: 2,
      onOptimize: () => systemOptimization.toggleDarkMode(),
    },
    {
      id: 'privacy',
      title: 'Otimização de Privacidade',
      description: 'Desabilita telemetria e coleta de dados do Windows.',
      category: 'Ferramentas',
      estimatedTime: 4,
      onOptimize: () => systemOptimization.optimizePrivacy(),
      warning: 'Desabilita recursos de telemetria do Windows.',
    },

    // Monitoring and Diagnostics
    {
      id: 'real-ping',
      title: 'Ping Real Fortnite',
      description: 'Mede o ping real para os servidores do Fortnite.',
      category: 'Monitoramento',
      estimatedTime: 2,
      onOptimize: () => systemOptimization.getRealPing(),
    },
    {
      id: 'system-health',
      title: 'Saúde do Sistema',
      description: 'Verifica o status geral do sistema e recursos.',
      category: 'Monitoramento',
      estimatedTime: 3,
      onOptimize: () => systemOptimization.getSystemHealth(),
    },
    {
      id: 'performance-metrics',
      title: 'Métricas de Performance',
      description: 'Coleta métricas detalhadas de performance do sistema.',
      category: 'Monitoramento',
      estimatedTime: 3,
      onOptimize: () => systemOptimization.getPerformanceMetrics(),
    },
    {
      id: 'diagnostics',
      title: 'Diagnóstico Completo',
      description: 'Executa diagnóstico completo do sistema.',
      category: 'Monitoramento',
      estimatedTime: 5,
      onOptimize: () => systemOptimization.runDiagnostics(),
      warning: 'Pode levar alguns minutos para completar.',
    },
    {
      id: 'network-monitor',
      title: 'Monitor de Rede',
      description: 'Monitora performance e estabilidade da rede.',
      category: 'Monitoramento',
      estimatedTime: 3,
      onOptimize: () => systemOptimization.monitorNetwork(),
    },
  ];

  const getCompletedCount = () => {
    return Object.values(optimizationStatus).filter(
      status => status.status === 'completed'
    ).length;
  };

  const getTotalCount = () => {
    return optimizationCards.length;
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Otimizações do Sistema</h1>
              <p className="text-gray-400">
                Baseado no EXM Free Tweaking Utility V9.3
              </p>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="bg-dark-800 rounded-xl p-6 border border-dark-600">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Progresso Geral</h2>
              <span className="text-sm text-gray-400">
                {getCompletedCount()} de {getTotalCount()} concluídas
              </span>
            </div>
            <div className="w-full bg-dark-700 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${(getCompletedCount() / getTotalCount()) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex items-center space-x-6 mt-4 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-gray-300">
                  Concluídas: {getCompletedCount()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-gray-300">
                  Pendentes: {getTotalCount() - getCompletedCount()}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Optimization Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {optimizationCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <OptimizationCard
                id={card.id}
                title={card.title}
                description={card.description}
                category={card.category}
                status={optimizationStatus[card.id]?.status || 'pending'}
                estimatedTime={card.estimatedTime}
                warning={card.warning}
                onOptimize={card.onOptimize}
              />
            </motion.div>
          ))}
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-dark-800 rounded-xl p-6 border border-dark-600"
        >
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold mb-2">
                ⚠️ Avisos Importantes
              </h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>
                  • Sempre crie um restore point antes de aplicar otimizações
                </li>
                <li>
                  • Algumas otimizações requerem privilégios de administrador
                </li>
                <li>• Não desabilite serviços se não souber sua função</li>
                <li>
                  • O TRIM só deve ser usado em SSDs, nunca em HDs tradicionais
                </li>
                <li>
                  • Reinicie o sistema após aplicar otimizações para melhor
                  efeito
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Optimization;
