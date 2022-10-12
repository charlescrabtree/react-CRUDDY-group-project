import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { UserProvider } from './context/UserContext';
const { MemoryRouter } = require('react-router-dom');

import * as authFns from './services/auth';

jest.mock('./services/auth');

const mockUser = {
  id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'random@example.com',
};

test('renders header', () => {

  render(
    <UserProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </UserProvider>
  );

  const headerElement = screen.getByText(/welcome/i);
  expect(headerElement).toBeInTheDocument();

});

test('user can sign in', async () => {
  authFns.getUser.mockReturnValue(null);
  authFns.authUser.mockReturnValue(mockUser);

  render(
    <UserProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </UserProvider>
  );

  const emailInput = screen.getByLabelText('Email:');
  fireEvent.change(emailInput, { target: { value: 'random@example.com' } });
  
  const passwordInput = screen.getByLabelText('Password:');
  fireEvent.change(passwordInput, { target: { value: '123456' } });
  
  const button = screen.getByRole('button');
  fireEvent.click(button);

});