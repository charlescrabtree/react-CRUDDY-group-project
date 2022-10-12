import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { UserProvider } from './context/UserContext';
const { MemoryRouter } = require('react-router-dom');

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

const fakePosts = [
  { id: 1, title: 'This is a fake post #1', description: 'This is a fake description #1' },
  { id: 2, title: 'This is also a fake post #2', description: 'This is a fake description #2' },
];

test('posts display', async () => {
  authFns.getUser.mockReturnValue(mockUser);
  postFns.getPosts.mockReturnValue(fakePosts);

  render(
    <UserProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </UserProvider>
  );

  await screen.findByText(/fake post #1/i);
  await screen.findByText(/fake post #2/i);
});