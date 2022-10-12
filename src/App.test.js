import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './context/UserContext';

import * as authFns from './services/auth';
import * as postFns from './services/posts';

jest.mock('./services/auth');
jest.mock('./services/posts');

const mockUser = {
  id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'random@example.com',
};

test('user can log in', async () => {
  authFns.getUser.mockReturnValue(null);
  authFns.authUser.mockReturnValue(mockUser);

  render(
    <UserProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </UserProvider>
  );
  // const headerElem = screen.getByText(/welcome/i);
  // expect(headerElem).toBeInTheDocument();

  const emailInput = screen.getByLabelText('Email:');
  fireEvent.change(emailInput, { target: { value: 'random@example.com' } });
  expect(emailInput.value).toBe('random@example.com');

  const passwordInput = screen.getByLabelText('Password:');
  fireEvent.change(passwordInput, { target: { value: '123456' } });

  const button = screen.getByRole('button');
  fireEvent.click(button);

  // const headerText = await screen.findByText('Hi, welcome to Chilis!');
  // expect(headerText).toBeInTheDocument();
});
