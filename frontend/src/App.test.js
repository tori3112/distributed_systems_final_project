import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the react-router-dom components
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ children, element }) => <div>{element}</div>
}));

test('renders the app without crashing', () => {
  render(<App />);
  // Just check if it renders without errors
  expect(document.body).toBeTruthy();
});