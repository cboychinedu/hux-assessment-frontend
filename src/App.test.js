import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthContext } from './Auth/AuthContext';
import Home from './Components/Register/Register';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';

// Mock the necessary components
jest.mock('./Components/Register/Register', () => jest.fn(() => <div>Home Component</div>));
jest.mock('./Components/Login/Login', () => jest.fn(() => <div>Login Component</div>));
jest.mock('./Components/Dashboard/Dashboard', () => jest.fn(() => <div>Dashboard Component</div>));

// Mock localStorage
const localStorageMock = (() => {
  let store = {
    'x-auth-token': 'test-token',
  };
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key) {
      delete store[key];
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const mockAuthContextValue = {
  isLoggedIn: true,
  xAuthToken: 'test-token',
  setToken: jest.fn(),
};

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: Router });
  };

  it('renders Home component on the root path', () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <App />
      </AuthContext.Provider>
    );

    expect(screen.getByText(/Home Component/i)).toBeInTheDocument();
  });

  it('renders Login component on the /login path', () => {
    renderWithRouter(
      <AuthContext.Provider value={mockAuthContextValue}>
        <App />
      </AuthContext.Provider>,
      { route: '/login' }
    );

    expect(screen.getByText(/Login Component/i)).toBeInTheDocument();
  });

  it('renders Dashboard component on the /dashboard path if logged in', () => {
    renderWithRouter(
      <AuthContext.Provider value={mockAuthContextValue}>
        <App />
      </AuthContext.Provider>,
      { route: '/dashboard' }
    );

    expect(screen.getByText(/Dashboard Component/i)).toBeInTheDocument();
  });

  it('redirects to Login component on an unknown path', () => {
    renderWithRouter(
      <AuthContext.Provider value={mockAuthContextValue}>
        <App />
      </AuthContext.Provider>,
      { route: '/unknown' }
    );

    expect(screen.getByText(/Login Component/i)).toBeInTheDocument();
  });

  it('sets the token on context when App mounts', () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <App />
      </AuthContext.Provider>
    );

    expect(mockAuthContextValue.setToken).toHaveBeenCalledWith('test-token');
  });
});
