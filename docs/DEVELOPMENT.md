# Development Guide

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm 8+
- Windows 10/11 (for full functionality)
- Administrator privileges (for system operations)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/neurocore-optimizer.git
cd neurocore-optimizer
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

## Project Structure

```
neurocore-optimizer/
├── electron/                 # Electron main process
│   ├── main.js              # Main electron process
│   ├── preload.js           # Preload scripts
│   └── modules/             # Native modules
├── src/                     # React application
│   ├── components/          # React components
│   │   ├── layout/         # Layout components
│   │   ├── providers/      # Context providers
│   │   └── ui/             # UI components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom hooks
│   ├── utils/              # Utility functions
│   ├── types/              # TypeScript types
│   └── styles/             # CSS and Tailwind config
├── public/                 # Static assets
└── docs/                   # Documentation
```

## Development Workflow

### Code Style

- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use functional components with hooks
- Implement proper error handling
- Add JSDoc comments for complex functions

### Component Guidelines

- Use PascalCase for component names
- Export components as default exports
- Use TypeScript interfaces for props
- Implement proper prop validation
- Use React.memo for performance optimization when needed

### State Management

- Use React Context for global state
- Use local state for component-specific data
- Implement proper loading and error states
- Use custom hooks for reusable logic

### Styling

- Use TailwindCSS for styling
- Follow the design system defined in tailwind.config.js
- Use CSS variables for theme colors
- Implement responsive design
- Use Framer Motion for animations

## Building

### Development Build

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Electron Build

```bash
npm run dist
```

## Testing

### Running Tests

```bash
npm test
```

### Test Coverage

```bash
npm run test:coverage
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Update documentation
6. Submit a pull request

### Commit Guidelines

- Use conventional commits
- Write clear commit messages
- Reference issues when applicable

## Architecture

### Electron Architecture

- Main process handles system operations
- Renderer process handles UI
- IPC for communication between processes
- Preload scripts for security

### React Architecture

- Component-based architecture
- Context for state management
- Custom hooks for reusable logic
- TypeScript for type safety

### System Integration

- Native modules for system access
- WMI for Windows management
- Registry access for configuration
- Service management for optimization

## Security Considerations

- Validate all user inputs
- Sanitize data before system operations
- Implement proper error handling
- Use secure IPC communication
- Follow principle of least privilege

## Performance Optimization

- Implement lazy loading
- Use React.memo for expensive components
- Optimize bundle size
- Implement proper caching
- Monitor memory usage

## Troubleshooting

### Common Issues

1. **Build fails**: Check Node.js version and dependencies
2. **Electron not working**: Ensure proper permissions
3. **System operations fail**: Run as administrator
4. **Performance issues**: Check for memory leaks

### Debug Mode

```bash
npm run dev:debug
```

## Deployment

### Windows Installer

```bash
npm run dist
```

The installer will be created in the `dist/` folder.

### Auto-updater

The app includes auto-update functionality using electron-updater.

## License

MIT License - see LICENSE file for details. 