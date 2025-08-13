# NeuroCore Optimizer

Advanced PC optimization tool for power users with deep system access and nerd-focused features.

## 🚀 Features

### 🎯 Core Features
- **Real-time System Monitoring**: CPU, GPU, RAM, Disk, Network with temperature alerts
- **Advanced System Optimization**: Smart defragmentation, TRIM, cache cleaning, registry optimization
- **Game Mode**: Extreme performance mode with service management and latency monitoring
- **Advanced Diagnostics**: SMART health checks, stress testing, benchmark tools
- **Security & Privacy**: Spyware detection, firewall management, privacy cleanup

### 🧩 Nerd Features
- **Terminal Mode**: Built-in CLI for advanced users
- **Plugin System**: Extensible architecture for community contributions
- **System Tweaks**: Advanced Windows configuration editor
- **Network Optimization**: TCP/IP tweaks for reduced latency
- **Overlay Monitoring**: Customizable floating performance overlay

## 🛠️ Tech Stack

- **Frontend**: Electron + React.js + TypeScript + TailwindCSS
- **Backend**: Node.js + Rust (for low-level system access)
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **System Access**: systeminformation, node-windows, WMI

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- npm 8+
- Windows 10/11 (primary target)
- Administrator privileges (for full functionality)

### Development Setup
```bash
# Clone the repository
git clone https://github.com/your-username/neurocore-optimizer.git
cd neurocore-optimizer

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
# Build for production
npm run dist

# The installer will be in the dist/ folder
```

## 🏗️ Project Structure

```
neurocore-optimizer/
├── electron/                 # Electron main process
│   ├── main.js              # Main electron process
│   ├── preload.js           # Preload scripts
│   └── modules/             # Native modules
├── src/                     # React application
│   ├── components/          # React components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom hooks
│   ├── utils/              # Utility functions
│   ├── types/              # TypeScript types
│   └── styles/             # CSS and Tailwind config
├── rust/                   # Rust modules for system access
├── assets/                 # Icons, images, etc.
└── docs/                   # Documentation
```

## 🔧 Configuration

The app uses `electron-store` for persistent configuration. Key settings:

- **Theme**: Dark/Light/Neon/Terminal
- **Modules**: Enable/disable specific features
- **Monitoring**: Customize update intervals
- **Security**: Permission levels and access control

## 🚨 Security

- Requires administrator privileges for full functionality
- All system modifications create automatic restore points
- Comprehensive logging of all operations
- Fail-safe mechanisms prevent critical system damage

## 📊 Performance

- Multi-threaded operations for heavy tasks
- Efficient memory management
- Real-time monitoring with minimal overhead
- Optimized for gaming scenarios

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Plugin Development

The app supports custom plugins. See `docs/plugin-development.md` for details.

## 📝 License

MIT License - see LICENSE file for details

## ⚠️ Disclaimer

This tool performs deep system modifications. Use at your own risk and always create restore points before major operations.

## 🆘 Support

- GitHub Issues: For bug reports and feature requests
- Documentation: See `docs/` folder
- Community: Discord server (link TBD)

---

**NeuroCore Optimizer** - Optimize like a nerd! 🧠⚡ 