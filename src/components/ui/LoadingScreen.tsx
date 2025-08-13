import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, HardDrive, MemoryStick } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  const [loadingText, setLoadingText] = useState('Inicializando NeuroCore...');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadingSteps = [
      { text: 'Inicializando NeuroCore...', duration: 900 },
      { text: 'Carregando módulos do sistema...', duration: 800 },
      { text: 'Conectando ao hardware...', duration: 1000 },
      { text: 'Calibrando sensores...', duration: 800 },
      { text: 'Aplicando otimizações...', duration: 900 },
      { text: 'Pronto!', duration: 400 },
    ];

    let currentStep = 0;
    const totalSteps = loadingSteps.length;

    const interval = setInterval(() => {
      if (currentStep < totalSteps) {
        setLoadingText(loadingSteps[currentStep].text);
        setProgress(((currentStep + 1) / totalSteps) * 100);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 900);

    return () => clearInterval(interval);
  }, []);

  const icons = useMemo(
    () => [
      { Icon: Brain, delay: 0 },
      { Icon: Cpu, delay: 0.2 },
      { Icon: MemoryStick, delay: 0.4 },
      { Icon: HardDrive, delay: 0.6 },
    ],
    []
  );

  const blueGridStyle = useMemo(
    () => ({
      backgroundImage:
        'linear-gradient(rgba(56, 189, 248, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.08) 1px, transparent 1px)',
      backgroundSize: '22px 22px',
    }),
    []
  );

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-900 via-dark-900 to-primary-800 flex items-center justify-center overflow-hidden">
      {/* Grade azul animada */}
      <div className="absolute inset-0 opacity-30" style={blueGridStyle} />

      {/* Linhas de varredura */}
      <motion.div
        className="absolute inset-0"
        initial={{ y: '-100%' }}
        animate={{ y: ['-100%', '100%'] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
        style={{
          background:
            'linear-gradient(180deg, rgba(14,165,233,0) 0%, rgba(14,165,233,0.08) 50%, rgba(14,165,233,0) 100%)',
        }}
      />

      {/* Partículas flutuantes em azul */}
      <div className="absolute inset-0">
        {Array.from({ length: 22 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary-400 shadow-glow-blue"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        {/* Logotipo */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-8"
        >
          <h1 className="text-6xl font-bold text-primary-300 font-display neon-text">
            NEUROCORE
          </h1>
          <p className="text-primary-400 text-lg mt-2 font-mono">
            Boot Sequence • Blue Quantum Interface
          </p>
        </motion.div>

        {/* Ícones animados */}
        <div className="flex justify-center space-x-8 mb-8">
          {icons.map(({ Icon, delay }, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay, ease: 'easeOut' }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: delay + 1 }}
              >
                <Icon className="w-12 h-12 text-primary-400" />
              </motion.div>
              <motion.div
                className="absolute inset-0 w-12 h-12 rounded-full border-2 border-primary-500"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: delay + 1 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Texto de status */}
        <motion.div
          key={loadingText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <p className="text-primary-300 text-lg font-mono">{loadingText}</p>
        </motion.div>

        {/* Barra de progresso */}
        <div className="w-80 mx-auto mb-8">
          <div className="bg-dark-700 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-300"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between text-xs text-primary-400 mt-2 font-mono">
            <span>0%</span>
            <span>{Math.round(progress)}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Anel holográfico */}
        <motion.div
          className="relative mx-auto mb-6"
          style={{ width: 96, height: 96 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 rounded-full border-2 border-primary-700" />
          <div className="absolute inset-2 rounded-full border-2 border-primary-600 opacity-70" />
          <div className="absolute inset-4 rounded-full border-2 border-primary-500 opacity-50" />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow:
                '0 0 30px rgba(56,189,248,0.25) inset, 0 0 20px rgba(56,189,248,0.25)',
            }}
          />
        </motion.div>

        {/* Indicadores */}
        <div className="flex justify-center space-x-4 mt-2">
          {['CPU', 'RAM', 'GPU', 'DISK'].map((component, index) => (
            <motion.div
              key={component}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-2"
            >
              <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
              <span className="text-primary-300 text-xs font-mono">
                {component}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Versão */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <p className="text-primary-400 text-sm font-mono">
            v1.0.0 • Inicialização
          </p>
        </motion.div>
      </div>

      {/* Decorações de canto */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary-500/70" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary-500/70" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary-500/70" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary-500/70" />
    </div>
  );
};

export default LoadingScreen;
