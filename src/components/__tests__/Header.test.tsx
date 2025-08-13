import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../layout/Header';

// Mock do contexto de tema
const mockThemeContext = {
  theme: 'dark',
  toggleTheme: jest.fn(),
};

jest.mock('../../hooks/useTheme', () => ({
  useTheme: () => mockThemeContext,
}));

describe('Header Component', () => {
  const renderHeader = () => {
    return render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders header with title', () => {
    renderHeader();
    expect(screen.getByText(/NeuroCore Optimizer/i)).toBeInTheDocument();
  });

  test('renders theme toggle button', () => {
    renderHeader();
    const themeButton = screen.getByRole('button', { name: /toggle theme/i });
    expect(themeButton).toBeInTheDocument();
  });

  test('calls toggleTheme when theme button is clicked', () => {
    renderHeader();
    const themeButton = screen.getByRole('button', { name: /toggle theme/i });
    
    themeButton.click();
    expect(mockThemeContext.toggleTheme).toHaveBeenCalledTimes(1);
  });

  test('renders window control buttons', () => {
    renderHeader();
    
    expect(screen.getByRole('button', { name: /minimize/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /maximize/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });
}); 