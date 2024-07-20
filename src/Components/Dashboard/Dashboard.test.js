import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from './Dashboard';
import { AuthContext } from '../../Auth/AuthContext';
import axios from 'axios';

// Mock the necessary modules and functions
jest.mock('axios');
jest.mock('./FlashMessage', () => ({
  flashMessageFunction: jest.fn(),
}));
jest.mock('./menuFlashMessage', () => ({
  menuflashMessageFunction: jest.fn(),
}));

// Mock AuthContext value
const mockAuthContextValue = {
  isLoggedIn: true,
  xAuthToken: 'test-token',
  setToken: jest.fn(),
};

describe('Dashboard Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Mock localStorage
    global.localStorage.setItem('x-auth-token', 'test-token');
  });

  it('renders Dashboard component', () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <Dashboard />
      </AuthContext.Provider>
    );

    expect(screen.getByText(/Create Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/Firstname/i)).toBeInTheDocument();
    expect(screen.getByText(/Lastname/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone Number/i)).toBeInTheDocument();
  });

  it('handles create contact validation', () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <Dashboard />
      </AuthContext.Provider>
    );

    const createContactButton = screen.getByText(/Create Contact/i);
    fireEvent.click(createContactButton);

    expect(screen.getByText(/Firstname is required/i)).toBeInTheDocument();
  });

  it('handles modify contact', async () => {
    axios.post.mockResolvedValueOnce({ data: { status: 'success' } });

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <Dashboard />
      </AuthContext.Provider>
    );

    const modifyButtons = screen.getAllByText(/Modify Contact/i);
    fireEvent.click(modifyButtons[0]);

    expect(screen.getByText(/Modify Contacts/i)).toBeInTheDocument();

    const modifyContactButton = screen.getByText(/Modify Contact/i);
    fireEvent.click(modifyContactButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:3001/contact/update/undefined',
        '{"firstname":"","lastname":"","phoneNumber":""}',
        expect.any(Object)
      );
    });
  });

  it('handles delete contact', async () => {
    axios.post.mockResolvedValueOnce({ data: { status: 'success' } });

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <Dashboard />
      </AuthContext.Provider>
    );

    const deleteButtons = screen.getAllByText(/Delete Contact/i);
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:3001/contact/delete/undefined',
        '{"firstname":""}',
        expect.any(Object)
      );
    });
  });

  it('filters contacts by firstname', async () => {
    axios.get.mockResolvedValueOnce({ data: { contactData: [{ _id: '1', firstname: 'John', lastname: 'Doe', phoneNumber: '1234567890' }] } });

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <Dashboard />
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/John/i)).toBeInTheDocument();
    });

    const filterInput = screen.getByPlaceholderText(/Firstname/i);
    fireEvent.change(filterInput, { target: { value: 'john' } });

    const filterButton = screen.getByText(/Filter/i);
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(screen.getByText(/Contact not found/i)).not.toBeInTheDocument();
      expect(screen.getByText(/John/i)).toBeInTheDocument();
    });
  });

  it('fetches contacts on mount', async () => {
    axios.get.mockResolvedValueOnce({ data: { contactData: [{ _id: '1', firstname: 'John', lastname: 'Doe', phoneNumber: '1234567890' }] } });

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <Dashboard />
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:3001/contact/',
        expect.any(Object)
      );
      expect(screen.getByText(/John/i)).toBeInTheDocument();
    });
  });
});
